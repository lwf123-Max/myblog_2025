ros2 pkg create 包名 --build-type 构建类型 --dependencies 依赖列表 --node-name 可执行程序名称

--build-type:是指功能包的构建类型有cmake、ament_cmake、ament_python三种类型可选；
--dependencies：所依赖的功能包列表；
--node-name：可执行程序的名称，会自动生成对应的源文件并生成配置文件。

在ros2 pkg命令下包含了多个查询功能包相关信息的参数:
ros2 pkg executables [包名] # 输出所有功能包或指定功能包下的可执行程序。
ros2 pkg list # 列出所有功能包
ros2 pkg prefix 包名 # 列出功能包路径
ros2 pkg xml # 输出功能包的package.xml内容


source : .install/setup.bash
source install/setup.bash
