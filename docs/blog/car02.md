---
title: 渡众调车log
date: 2025-08-21
categories:
  - 日志
tags:
  - 比赛
  - 学习

---

# 渡众车车对抗调车日志

## 比赛注意事项(永久顶置)

1. 激光发射器要检查,小心被掰弯(休息区，场外)
2. 树记得换好
3. 摄像头对焦调好,小心被人动手脚

## 2025-07-23

小车撞车恢复机制:

### 1. 整体思路:

如果是走到了代价地图的障碍物上,那么无
法规划出路径,通过判断代价值,在安全半径内找到无障碍位置,把新的位置发布到/initialpose话题上,重置当前小车位置,即可重新规划路径

### 2. 遇到的问题:

#### a) 

    global_costmap = new costmap_2d::Costmap2DROS("global_costmap", tf_buffer);
    通过#include <costmap_2d/costmap_2d_ros.h> 库拿到的代价值恒为0
    解决:
    直接订阅/OccupancyGrid,转换坐标得到代价值

#### b) 

    每个物资方框内以及代价地图外,订阅global_costmap拿到的代价值为0
    解决:
    修改参数为 track_unknown_space: true

## 2025-07-15

rknn_pt_fifteen roslaunch不了:

### 1. 代码:

    // 启动识别launch文件（后台运行）
    std::string launch_cmd = "bash -c 'source /opt/ros/noetic/setup.bash; "
                            "source /home/duzhong/dzacs/devel/setup.bash; "
                            "roslaunch dzactuator dzrknnpt_fifteen.launch &'";

### 2. 报错:

    RLException: Unable to launch [rknn_pt_fifteen-1].
    If it is a script, you may be missing a '#!' declaration at the top.
    The traceback for the exception was written to the log file

### 3. 解决办法:

    删掉build和devel,重新编译

## 2025-07-14

解决rknn推理节点运行时提示:

```bash
duzhong@duzhong:~/dzacs$ rosrun rknn_pt_fifteen det_fifteen 
Loading model...
sdk version: 1.5.2 (c6b7b351a@2023-08-23T15:28:22) driver version: 0.9.6
Loading model...
sdk version: 1.5.2 (c6b7b351a@2023-08-23T15:28:22) driver version: 0.9.6
Loading model...
sdk version: 1.5.2 (c6b7b351a@2023-08-23T15:28:22) driver version: 0.9.6
Loading model...
sdk version: 1.5.2 (c6b7b351a@2023-08-23T15:28:22) driver version: 0.9.6
Loading model...
sdk version: 1.5.2 (c6b7b351a@2023-08-23T15:28:22) driver version: 0.9.6
Loading model...
sdk version: 1.5.2 (c6b7b351a@2023-08-23T15:28:22) driver version: 0.9.6
rga_api version 1.10.0_[2]
E RKNN: [13:49:52.175] failed to submit!, op id: 1, op name: Conv:input.14_Conv, flags: 0x5, task start: 0, task number: 197, run task counter: 0, int status: 0, please try updating to the latest version of the toolkit2 and runtime from: https://eyun.baidu.com/s/3eTDMk6Y (PWD: rknn)
```

这是在运行INT8量化的模型时报的错误,原因是版本太旧了,有一些特性旧版本不支持.

使用rknn的时候需要考虑三个版本:1.模型转换时的SDK版本 2.模型推理时程序连接的runtime库的版本(librknnrt.so) 3.NPU驱动版本

### 查看NPU驱动版本

```bash
duzhong@duzhong:~/dzacs$ sudo cat /sys/kernel/debug/rknpu/version
RKNPU driver: v0.9.6
```

### 查看模型推理时程序连接的runtime库的版本

```bash
# 查看可执行文件链接库的路径
ldd <你ROS可执行文件的名字(可以在工作空间中的devel目录中找到)> | grep rknn
# 查看librknnrt.so的版本
stings librknnrt.so | grep version
```

关于这三个版本的配合可以在官方仓库的文档中找到https://github.com/airockchip/rknn-toolkit2/tree/v2.1.0

在文档中可以看到建议将NPU内核驱动升级到0.9.2或之后的版本(RKNN 模型版本即转换模型用的SDK的版本),

| RKNN 模型版本 | Runtime 版本要求   |
| ------------- | ------------------ |
| 1.2.0         | ≥ 1.2.0 且 ≤ 1.5.0 |
| 1.3.0         | ≥ 1.3.0 且 ≤ 1.5.0 |
| 1.4.0         | ≥ 1.4.0 且 ≤ 1.5.0 |
| 1.5.0         | 1.5.0              |
| 1.5.2         | ≥ 1.5.2            |
| 1.6.0         | ≥ 1.5.2            |
| 2.0.0         | ≥ 2.0.0            |
| 2.1.0         | ≥ 2.0.0            |

我们选择使用RKNN模型版本是2.1.0,Runtime版本是2.1.0

## 2025-07-06

解决git提交合并冲突问题,可以直接拉取远程分支到本地并解决冲突,然后再提交
在执行 `git pull origin main` 后遇到了冲突。以下是解决冲突的步骤：

### 1. 打开冲突文件

冲突发生在以下文件中：

- `src/dz_bt/xml/test_fuzzy.xml`
- `src/dz_bt/param/params.yaml`

打开这些文件，找到冲突标记。

### 2. 解决冲突

冲突标记的格式如下：

```
远程分支的更改
```

你需要手动编辑文件，决定保留哪些更改。例如：

```xml
<<<<<<< HEAD
<your-local-changes>
=======
<remote-changes>
>>>>>>> origin/main
```

编辑后，删除冲突标记，保留你需要的内容。

### 3. 标记冲突已解决

解决完所有冲突后，使用以下命令标记冲突已解决：

```bash
git add src/dz_bt/xml/test_fuzzy.xml
git add src/dz_bt/param/params.yaml
```

### 4. 提交更改

提交合并后的更改：

```bash
git commit -m "解决合并冲突"
```

### 5. 推送到云端

将更改推送到云端：

```bash
git push origin main
```

## 2025-07-05

在 fuzzylite 中定义复杂规则时，您可以使用多种逻辑运算符和条件组合来创建精细的决策逻辑。以下是定义复杂规则的方法和示例：

### 1. **基本语法结构**

```cpp
ruleBlock->addRule(Rule::parse("if [条件] then [结论]", engine));
```

### 2. **复杂规则构建技巧**

#### a) 逻辑运算符组合

```cpp
// AND 组合
ruleBlock->addRule(Rule::parse("if distance2Target is near and distance2Enemy is far then attackTarget is yes", engine));

// OR 组合
ruleBlock->addRule(Rule::parse("if (distance2Enemy is near or distance2Enemy is medium) then attackEnemy is no", engine));

// 混合 AND/OR（使用括号明确优先级）
ruleBlock->addRule(Rule::parse("if (distance2Resource is near and distance2Enemy is far) or (distance2Resource is medium and distance2Enemy is medium) then collectResource is yes", engine));
```

#### b) NOT 运算符

```cpp
// NOT 条件
ruleBlock->addRule(Rule::parse("if not distance2Enemy is near then attackTarget is yes", engine));

// 组合使用
ruleBlock->addRule(Rule::parse("if distance2Resource is near and not distance2Enemy is near then collectResource is yes", engine));
```

#### c) 多结论规则

```cpp
// 单条规则设置多个输出
ruleBlock->addRule(Rule::parse("if distance2Enemy is near then attackEnemy is yes and attackTarget is no and collectResource is no", engine));
```

#### d) 带权重的规则

```cpp
// 添加规则权重（0.0-1.0）
ruleBlock->addRule(Rule::parse("if distance2Target is far then attackTarget is no with 0.8", engine));
```

### 3. **复杂规则完整示例**

```cpp
// 复杂决策规则
ruleBlock->addRule(Rule::parse(
    "if (distance2Enemy is near) "  // 条件1: 敌人很近
    "then " 
    "attackEnemy is yes "           // 结论1: 攻击敌人
    "and attackTarget is no "       // 结论2: 不攻击靶子
    "and collectResource is no",    // 结论3: 不收集物资
    engine
));

ruleBlock->addRule(Rule::parse(
    "if (distance2Enemy is far and "       // 条件1: 敌人很远
    "(distance2Target is near or "         // 条件2: 靶子很近
    "distance2Resource is near)) "         // 或物资很近
    "then "
    "attackEnemy is no "                   // 结论1: 不攻击敌人
    "and (attackTarget is yes "            // 结论2: 攻击靶子
    "or collectResource is yes) "          // 或收集物资
    "with 0.9",                           // 规则权重
    engine
));

ruleBlock->addRule(Rule::parse(
    "if not (distance2Enemy is near) and "  // 条件1: 敌人不在附近
    "distance2Target is medium and "       // 条件2: 靶子中等距离
    "distance2Resource is medium "         // 条件3: 物资中等距离
    "then "
    "attackTarget is 0.5 "                 // 模糊值输出
    "and collectResource is 0.5",          // 模糊值输出
    engine
));
```

### 4. **高级技巧**

#### a) 模糊值直接使用

```cpp
// 使用数值作为结论
ruleBlock->addRule(Rule::parse("if distance2Target is near then attackTarget is 0.8", engine));
```

#### b) 规则分组

```cpp
// 使用注释组织规则
ruleBlock->addRule(Rule::parse("// ----- 敌人处理规则 -----", engine));
ruleBlock->addRule(Rule::parse("if distance2Enemy is near then attackEnemy is yes", engine));
ruleBlock->addRule(Rule::parse("if distance2Enemy is far then attackEnemy is no", engine));

ruleBlock->addRule(Rule::parse("// ----- 目标处理规则 -----", engine));
ruleBlock->addRule(Rule::parse("if distance2Target is near and not distance2Enemy is near then attackTarget is yes", engine));
```

#### c) 复杂条件嵌套

```cpp
ruleBlock->addRule(Rule::parse(
    "if ((distance2Resource is near and distance2Enemy is far) or "
    "(distance2Resource is medium and distance2Enemy is very_far)) "
    "then collectResource is yes",
    engine
));
```

### 5. **最佳实践**

1. **括号使用**：

   - 始终用括号明确逻辑优先级
   - 即使引擎默认优先级正确，括号也能提高可读性

2. **规则复杂度控制**：

   - 单条规则不超过3-4个条件组合
   - 复杂逻辑拆分为多条规则

3. **测试验证**：

   ```cpp
   // 测试复杂规则
   distance2Enemy->setValue(1.0);  // near
   distance2Target->setValue(2.0); // near
   engine->process();
   std::cout << "Complex rule output: " << attackEnemy->getValue() << std::endl;
   ```

4. **规则文档化**：

   ```cpp
   // 优先级1: 安全第一
   ruleBlock->addRule(Rule::parse("// P1: 敌人靠近时优先应对", engine));
   ruleBlock->addRule(Rule::parse("if distance2Enemy is near then attackEnemy is yes", engine));
   ```

### 6. **复杂规则完整示例**

```cpp
// 综合决策系统
ruleBlock->addRule(Rule::parse(
    "if distance2Enemy is near "  // 最高优先级条件
    "then "
    "attackEnemy is yes "         // 强制攻击敌人
    "and attackTarget is no "     // 取消其他行动
    "and collectResource is no",
    engine
));

ruleBlock->addRule(Rule::parse(
    "if not distance2Enemy is near and "  // 安全条件下
    "(distance2Target is near or "       // 靶子优先
    "(distance2Resource is near and "    // 或急需资源
    "distance2Target is far)) "          // 且靶子不近
    "then "
    "collectResource is yes "            // 收集资源
    "and attackTarget is no",            // 不攻击靶子
    engine
));

ruleBlock->addRule(Rule::parse(
    "if (distance2Enemy is far or distance2Enemy is medium) and "
    "distance2Target is near and "
    "distance2Resource is far "
    "then "
    "attackTarget is yes "               // 攻击靶子
    "and collectResource is no",         // 不收集资源
    engine
));

// 默认规则（当其他规则不适用时）
ruleBlock->addRule(Rule::parse(
    "if none of the above then "
    "attackEnemy is no "
    "and attackTarget is no "
    "and collectResource is no",
    engine
));
```

这些技巧允许您在 fuzzylite 中创建精细、复杂的决策逻辑系统。关键点是：

1. 合理使用括号确保逻辑正确性
2. 将复杂规则分解为可管理的部分
3. 使用注释提高可维护性
4. 通过权重控制规则重要性
5. 充分测试各种输入组合的输出结果


## 2025-05-31

### 1. 雷达误判自己为障碍物的问题

​	通常，雷达比如激光雷达（LiDAR）用来扫描周围环境，生成点云数据，然后构建地图或者进行避障。如果雷达装在前面，那么当它旋转扫描的时候，后方可能会有部分区域被机器人的身体挡住，导致激光束打到自己的身体，这样传感器就会误认为这些点是障碍物。这时候，代价地图（costmap）可能会将这些区域标记为有障碍，并进行膨胀处理，从而影响路径规划，导致机器人避开自己，可能绕路或者无法移动。

scan_msg.range_min = 0.15;  // plidar_ros下的node.cpp文件84行内容                                                                                                      日志消息: 理论来说最小扫描范围大于机器人半径（0.14），雷达不应该在rviz中显示出机器人自身的点云，插入图片：

发现原因：雷达并非在智能车几何中心点，所以它与小车末端的距离也不止是15厘米，应该设置为25厘米（根据小车实际建模估测），但是同样小车在导航过程中也看不到小车前方25厘米内的障碍物（远视眼）。显然只调整range_min参数，是不可取的。

所以我们询问了某语言问答大模型，它提出了以下方案：

#### 解决方案（AI）

1. **传感器数据过滤**：也就是在处理雷达数据的时候，把机器人自身的部分从点云中去掉。比如，知道机器人本体的几何形状，把属于自己身体部分的点云数据滤除。例如，设定一个区域，比如雷达安装的位置，后方一定范围内的点都忽略掉。这种方法需要预先知道机器人本体的尺寸和雷达的位置，然后通过坐标变换确定哪些点属于自身。

   ①**配置激光过滤器**：

   ```
   <!-- 在launch文件中加载过滤器 -->
   <node pkg="laser_filters" type="scan_to_scan_filter_chain" name="laser_filter">
     <rosparam command="load" file="$(find robot_nav)/config/laser_filters.yaml" />
   </node>
   ```

   ②**定义过滤规则（laser_filters.yaml）**：

   ```
   scan_filter_chain:
   - name: angle_filter
     type: laser_filters/LaserScanAngularBoundsFilter
     params:
       lower_angle: -1.57  # -90度（屏蔽左侧后方）
       upper_angle: 1.57   # +90度（屏蔽右侧后方）
   - name: box_filter
     type: laser_filters/LaserScanBoxFilter
     params:
       box_frame: base_link     # 机器人基坐标系
       min_x: -0.5             # 根据本体尺寸调整区域
       max_x: 0.5
       min_y: -0.3
       max_y: 0.3
   ```

   

2. **使用静态的遮蔽区域（mask）**：在软件层面，设置一个固定的遮蔽区域，比如在雷达的坐标系中，机器人后面的区域是永远被自身挡住的，所以在这个区域内的任何扫描数据都被忽略或者标记为无效。这可能通过设置一个角度范围或者距离范围来实现。例如，雷达扫描时，后面一定角度内的数据直接过滤掉或标定为无限远（障碍物无限远及可视为后方无障碍物）。

​	对功能包rplidar_ros下的node.cpp文件中的函数**publish_scan**进行修改。

```cpp
    double min_filter_angle = DEG2RAD(130.0);
    double max_filter_angle = DEG2RAD(230.0);
    for(size_t i = 0; i < scan_msg.ranges.size(); i++)
    {
        double angle = scan_msg.angle_increment * i; 
        
        if(angle >= min_filter_angle && angle <= max_filter_angle)  //角度内的数据标定为无限远
        {
            scan_msg.ranges[i] = std::numeric_limits<float>::infinity();
        }
    }
    pub->publish(scan_msg);
```

雷达旋转方向逆时针，由此推断出，要使得雷达不识别到后方障碍物（自身），则要把[130°, 230°]范围所有点的距离值设为无穷大（表示无效）,即过滤掉激光雷达在 130° 到 230° 范围内的扫描数据。

**问题迎刃而解！**


### 2. g++编译版本问题

```bash
/usr/include/pcl-1.10/pcl/pcl_config.h:7:4: error: #error PCL requires C++14 or above
    7 |   #error PCL requires C++14 or above
      |    ^~~~~
```

set(CMAKE_CXX_FLAGS "-std=c++14") CMakeLists.txt 文件里的这一行进行修改,修改为14

### 3. 编译顺序问题的解决

问题:由于编译时ai_msgs和builtin_interfaces这两个功能包需要先编译,因为
在工作空间中，如果你是通过 CMake 构建系统（例如在 ROS 等框架下）来编译 `src` 下的功能包，可以通过以下方法指定编译顺序：

1. **原理**

* `add_dependencies` 命令用于指定一个目标依赖于其他目标。在工作空间中，每个功能包可以看作是一个构建目标（如一个库或可执行文件）。

* 例如，在工作空间的顶层 CMakeLists.txt（如果有的话）或者在各个功能包的 CMakeLists.txt 中（根据构建系统的组织方式），你可以这样指定:

  ```cmake
  add_dependencies(target1 target2)
  ```

这表示`target1`（可以是一个功能包相关的构建目标，如库或可执行文件）依赖于`target2`，那么在编译时，`target2`会先于`target1`进行编译。

2. **详细步骤**
   功能包dz_bt的CMakeLists.txt中添加依赖关系：

   ```cmake
   add_executable(main src/main.cpp) # 可执行文件设置
   add_dependencies(main ai_msgs_generate_messages_cpp)  # 我们添加的依赖关系
   ```

   这样，当使用 Catkin 构建工具（如`catkin_make`）进行工作空间构建时，会先编译`ai_msgs`再编译`dz_bt`.
   以此类推,每一个功能包(rknn_pt和rknn_pt_fifteen)都需要添加依赖关系

### 4. 行为树程序在运行时，ld报错，无法找到链接库

在使用源码安装行为树时，行为树被安装到了以下路径：

```bash
库文件：
/usr/local/lib
头文件：
/usr/local/include/
cmake配置文件：
/usr/local/lib/cmake
```

这些目录不属于标准目录，所以在运行时，ld不会在这些目录下寻找库文件，因此需要添加以下环境变量：

```bash
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
```

这些环境变量可以直接在.bashrc中添加，也可以在CMakeLists.txt中添加：

```bash
set(ENV{LD_LIBRARY_PATH} "/usr/local/lib:$ENV{LD_LIBRARY_PATH}")
```

### 5. Ctrl+C关闭bringup的时候无法让小车停止运动

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



by —— 罗哥 & me