---
title: 渡众ROS2-foxy的尝试 
date: 2025-08-17
categories:
  - ROS2渡众
tags:
  - 学习
  - 失败经历

---

# 调车日志

## 2025.5.7
### Ctrl+C关闭bringup的时候无法让小车停止运动
问题出在dzactuator.cpp的析构函数中

原来的析构函数
```cpp
turn_on_robot::~turn_on_robot()
{
  // Sends the stop motion command to the lower machine before the turn_on_robot object ends
  // 对象turn_on_robot结束前向下位机发送停止运动命令
  Send_Data.tx[0] = FRAME_HEADER;
  Send_Data.tx[1] = 0;
  Send_Data.tx[2] = 0;

  // The target velocity of the X-axis of the robot //机器人X轴的目标线速度
  Send_Data.tx[4] = 0;
  Send_Data.tx[3] = 0;

  // The target velocity of the Y-axis of the robot //机器人Y轴的目标线速度
  Send_Data.tx[6] = 0;
  Send_Data.tx[5] = 0;

  // The target velocity of the Z-axis of the robot //机器人Z轴的目标角速度
  Send_Data.tx[8] = 0;
  Send_Data.tx[7] = 0;
  Send_Data.tx[9] = Check_Sum(9, SEND_DATA_CHECK); // Check the bits for the Check_Sum function //校验位，规则参见Check_Sum函数
  Send_Data.tx[10] = FRAME_TAIL;
  try
  {
    Stm32_Serial.write(Send_Data.tx, sizeof(Send_Data.tx)); // Send data to the serial port //向串口发数据
  }
  catch (serial::IOException &e)
  {
    RCLCPP_ERROR_STREAM(this->get_logger(), "Unable to send data through serial port"); // If sending data fails, an error message is printed //如果发送数据失败,打印错误信息
  }
  Stm32_Serial.close();                                    // Close the serial port //关闭串口
  RCLCPP_INFO_STREAM(this->get_logger(), "Shutting down"); // Prompt message //提示信息
}
```
根据dzactuator.h可以知道这个函数向串口发送的数据长度为11，而实际需要向串口发送的数据长度为23(参考turn_on_robot::sendCarInfoKernel()),所以将其修改为以下代码后，问题解决
```cpp
turn_on_robot::~turn_on_robot()
{
    unsigned char buf[23] = {0};
    buf[0] = 0xa5; // hdr1
    buf[1] = 0x5a; // hdr2
    buf[2] = 20;   // len - 数据长度 22 - 3 = 19字节
    // 角度 TargetAngle 转换成整形后放入 buf[3] 和 buf[4]
    int16_t angle = static_cast<int16_t>(moveBaseControl.TargetAngle * 10); // 假设角度以0.1度为单位
    buf[3] = (angle >> 8) & 0xFF;                                           // 高字节
    buf[4] = angle & 0xFF;                                                  // 低字节
    // 速度符号 SpeedDirection 放入 buf[5],这里设置成0x00
    buf[5] = 0x00;
    // printf("moveBaseControl.TargetSpeed = %d\n",moveBaseControl.TargetSpeed);
    // 目标速度 TargetSpeed 放入 buf[6]（占1字节）
    buf[6] = 0x00;
    // 备用
    buf[7] = 0x00;
    // 云台电机0位置 Position_O 放入 buf[8] 和 buf[9]
    // buf是1个字节，moveBaseControl.Position_0是两个字节，使用了小端模式，
    // buf[8] = 0x00 buf[9] = 0x00 
    // 假设moveBaseControl.Position_0是0x03E8，那么buf[8]是0x03，buf[9]是0xE8
    buf[8] = (moveBaseControl.Position_0 >> 8) & 0xFF; // 高字节
    buf[9] = moveBaseControl.Position_0 & 0xFF;        // 低字节
    // 云台电机1位置 Position_1 放入 buf[10] 和 buf[11]
    buf[10] = (moveBaseControl.Position_1 >> 8) & 0xFF; // 高字节
    buf[11] = moveBaseControl.Position_1 & 0xFF;        // 低字节
    // 云台电机0速度 Speed_0 放入 buf[12] 和 buf[13]
    buf[12] = (moveBaseControl.Speed_0 >> 8) & 0xFF; // 高字节
    buf[13] = moveBaseControl.Speed_0 & 0xFF;        // 低字节
    // 云台电机1速度 Speed_1 放入 buf[14] 和 buf[15]
    buf[14] = (moveBaseControl.Speed_1 >> 8) & 0xFF; // 高字节
    buf[15] = moveBaseControl.Speed_1 & 0xFF;        // 低字节
    // 云台电机0时间 Time_0 放入 buf[16]
    buf[16] = static_cast<unsigned char>(moveBaseControl.Time_0);
    // 云台电机1时间 Time_1 放入 buf[17]
    buf[17] = static_cast<unsigned char>(moveBaseControl.Time_1);
    // 功能模式
    buf[18] = static_cast<unsigned char>(moveBaseControl.Fun);
    // 使用ID
    buf[19] = static_cast<unsigned char>(moveBaseControl.Orin_ID);
    // 重置ID
    buf[20] = static_cast<unsigned char>(moveBaseControl.Set_ID_Num);

    // 预留位 Reservel
    buf[21] = static_cast<unsigned char>(moveBaseControl.VoiceSwitch);
    // 校验和
    unsigned char sum = 0;
    for (int i = 2; i < 22; ++i) // 从 buf[2] 到 buf[18] 计算校验和
        sum += buf[i];
    buf[22] = sum;
    try
    {
        Stm32_Serial.write(buf, 23); // Send data to the serial port //向串口发数据
    }
    catch (serial::IOException &e)
    {
        RCLCPP_ERROR_STREAM(this->get_logger(), "Unable to send data through serial port"); // If sending data fails, an error message is printed //如果发送数据失败,打印错误信息
    }
    Stm32_Serial.close();                                    // Close the serial port //关闭串口
    RCLCPP_INFO_STREAM(this->get_logger(), "Shutting down"); // Prompt message //提示信息
}
```


## 2025.5.5
### 在实际智能车应用中，/odom 话题提供的里程计数据通常基于编码器或 IMU 等传感器，存在漂移和误差，导致坐标不稳定，无法准确反映小车的真实位置。为了提升定位精度，通常会使用 AMCL（Adaptive Monte Carlo Localization） 提供的 map 到 odom 的变换来间接获取更可靠的小车位置。
推荐做法：通过 AMCL 获取更稳定的小车位置
1. 订阅 /amcl_pose 获取 map 坐标系下的精确位姿
```cpp
amcl_subscriber_ = this->create_subscription<geometry_msgs::msg::PoseWithCovarianceStamped>(
      "/amcl_pose", 10, std::bind(&WaypointNavigator::amcl_callback, this, std::placeholders::_1));
```

## 2025.5.4
### 里程计标定
参照官方文档：将启动文件bringup.launch.py中的参数“calibrate_lineSpeed”更改为“1”，终端会输出一些调试信息

其中前方的“left”“right”为一组分别代表当前后轮电机左右轮反馈瞬时编码器值；“x”“y”“z”为一组，“x”代表 SmartMaster 在右手坐标系下 x 方
向的移动速度积分量，即距离(m)，“y”代表 SmartMaster 在右手坐标系下 y 方向的移动速度积分量，即距离(m)，“z”代表 SmartMaster 在右手坐标系下 z 方向的旋转速度积分量，即角度(rad)；linear_Speed 代表当前 SmartMaster 的矢量速度，即速度(m/s)；“leftDistance”“rightDistance”为一组分别代表当前后轮电机左右轮反馈编码器积分量，即总编码器值；“Power_voltage”为当前电池电量的电压值，即电压(V)。

```shell
[dzactuator_node-3] [INFO] [1746348308.390607520] [dzactuator]: left=0.00, right=0.00, x=1.05, y=-0.04, th=-0.05, linear_Speed=0.000000, leftDistance=1459.00, rightDistance=1449.00, Power_voltage=10.44

[dzactuator_node-3] [INFO] [1746348432.835823214] [dzactuator]: left=0.00, right=0.00, x=1.07, y=-0.03, th=-0.03, linear_Speed=0.000000, leftDistance=1481.00, rightDistance=1475.00, Power_voltage=10.42

[dzactuator_node-3] [INFO] [1746348482.484423792] [dzactuator]: left=0.00, right=0.00, x=1.06, y=-0.01, th=-0.06, linear_Speed=0.000000, leftDistance=1467.00, rightDistance=1455.00, Power_voltage=10.39
```

| leftDistance | rightDistance | 实际距离(m) | 1 米标定值 |
| --- | --- | --- | --- |
| 1459.00 | 1449.00 | 1 | 1454 |
| 1481.00 | 1475.00 | 1 | 1478 |
| 1467.00 | 1455.00 | 1 | 1461 |

最终标定值为1464

## 2025.5.2
### amcl定位仍不准(相较于4月30号好一些)
tf_tree预期效果：map -> odom -> base_footprint -> base_link
       现在效果：map -> odom -> base_link
具体表现：小车跑图第一遍定位准确，但是要回starPose时迷失了自己的方向
可能原因：可视化插件rviz2显示odom位于base_link的z轴下方
```terminal
ros2 run tf2_ros tf2_echo odom base_link
At time 1746178122.788257517
- Translation: [0.000, 0.000, 0.200]
- Rotation: in Quaternion [0.000, 0.000, 0.000, 1.000]
```
表明odom和base_link在进行动态坐标变换时，odom 和 base_link 之间存在 Z 轴偏移（0.2 米），这表明 odom 坐标系相对于 base_link 坐标系在 Z 轴方向上有 0.2 米的位移。

解决方法：
map->odom的动态坐标变换本身由amcl来发布，而odom->base_link的动态坐标变换需要自己写，代码位于tf_static_dz/src/dz_odom_base_link.cpp:
```cpp
    void odom_callback(const nav_msgs::msg::Odometry::SharedPtr msg) 
    {
        geometry_msgs::msg::TransformStamped transform_stamped;
        transform_stamped.header.stamp = msg->header.stamp;
        transform_stamped.header.frame_id = "odom";
        transform_stamped.child_frame_id = "base_link";
        transform_stamped.transform.translation.x = msg->pose.pose.position.x;
        transform_stamped.transform.translation.y = msg->pose.pose.position.y;
        transform_stamped.transform.translation.z = msg->pose.pose.position.z-0.2; //此处为修改的地方
        transform_stamped.transform.rotation = msg->pose.pose.orientation;
        tf_broadcaster_->sendTransform(transform_stamped);
    }
```
bringup.launch.py启动时把dz_odom_base_link.cpp也同时启动;
localization.launch.py无需手动去发布map->odom的坐标变换.

**Tips：** 硬编码补偿不具备鲁棒性，应当继续修改

鉴于上述问题，使用xacro文件，在xacro中实现base_footprint -> base_link的静态坐标变换

## 2025.5.1
### amcl定位不准，小车位置乱飘
原因是imu数据不准（具体表现在将imu数据的四元数结算成欧拉角后，发现就算小车不动，yaw也一直在增加），导致amcl在使用ekf融合imu数据时会出错，所以需要让ekf_node不使用imu数据,直接注释掉yaml文件中有关imu的数据，由于odom的数据也是由imu算来的，所以odom也要注释掉

## 2025.4.26
### rviz中无法显示map_server加载的地图
原因是rviz中在设置话题QOS的Durability Policy(持久性策略)时设置错误

* 关于QOS

当前的基本QoS配置文件包括以下策略设置：

History (历史):

    Keep last (仅保留最新): 仅存储最多N个样本，可通过队列深度选项进行配置。
    Keep all (全部保留): 存储所有样本，受底层中间件的资源限制配置的影响。
    Depth (深度):
    Queue size (队列大小): 仅在"history"策略设置为"keep last"时生效。

Reliability (可靠性):

    Best effort (尽力而为): 尝试传递样本，但如果网络不稳定可能会丢失。
    Reliable (可靠传递): 保证样本被传递，可能会多次重试。

Durability (持久性):

    Transient local (瞬态本地): 发布者负责为"后续加入"的订阅保留样本。
    Volatile (易失性): 不尝试保留样本。

Deadline (截止时间):

    Duration (持续时间): 期望的两个连续消息发布到主题之间的最长时间。

Lifespan (寿命):

    Duration (持续时间): 发布和接收消息之间的最长时间，而不会被视为陈旧或过期（过期消息会被悄悄丢弃，实际上永远不会被接收）。

Liveliness (活跃度):

    Automatic (自动): 当节点的任何一个发布者发布消息时，系统将考虑所有发布者仍然存活另一个"租约持续时间"。
    Manual by topic (按主题手动): 如果发布者通过调用发布者API手动声明自己仍然存活，系统将考虑发布者仍然存活另一个"租约持续时间"。

Lease Duration (租约持续时间):

    Duration (持续时间): 发布者在系统认为其失去活跃性之前必须指示自己仍然存活的最长时间段（失去活跃性可能是故障的指示）。
对于每个不是持续时间的策略，还有"系统默认"选项，它使用底层中间件的默认设置。对于每个持续时间的策略，还存在一个"默认"选项，表示持续时间未指定，底层中间件通常会将其解释为一个无限长的持续时间。
QoS配置文件的兼容性是基于"请求与提供"模型确定的。订阅者请求一个QoS配置文件，表示它愿意接受的"最低质量"，而发布者提供一个QoS配置文件，表示它能够提供的"最高质量"。只有在所请求的QoS配置文件的每个策略都不比提供的QoS配置文件更严格的情况下，才会建立连接。即使所请求的QoS配置文件不同，多个订阅者也可以同时连接到单个发布者。发布者和订阅者之间的兼容性不受其他发布者和订阅者的影响。

而rviz中无法显示map_server加载的地图,是因为rviz作为订阅者,map_server作为发布者,它们之间的策略不兼容,所以无法正常建立连接?(存疑)
                        
原文链接：https://blog.csdn.net/qq_27865227/article/details/139294006



```yaml
# odom0: odom
# odom0_config: [true,  true,  false,
#                false, false, true,
#                true, true, false,
#                false, false, true,
#                false, false, false]
# odom0_queue_size: 1
# odom0_nodelay: false
# odom0_differential: true
# odom0_relative: false
# odom0_pose_rejection_threshold: 5.0
# odom0_twist_rejection_threshold: 5.0

# imu0: imu_data
# imu0_config: [false, false, false,
#               false,  false, false,
#               true, true, false,
#               false,  false,  true,
#               true, true,  false]
# imu0_nodelay: false
# imu0_differential: false
# imu0_relative: true
# imu0_queue_size: 1
# imu0_pose_rejection_threshold: 2.8                 # Note the difference in parameter names
# imu0_twist_rejection_threshold: 2.8                #
# imu0_linear_acceleration_rejection_threshold: 0.8  #
```





