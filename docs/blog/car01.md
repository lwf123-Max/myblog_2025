---
title: ROS小车
date: 2025-08-17
categories:
  - 所见所想
tags:
  - 比赛
  - 随笔
---

# ROS入门

## NO.1 学习C语言、C++：

1. 学c语言就看浙大温恺c语言:【浙江大学翁恺教你C语言程序设计！C语言基础入门！】 https://www.bilibili.com/video/BV1dr4y1n7vA/?share_source=copy_web&vd_source=7c149f1c6707f644bfee88536c3310c6
2. 学c++看黑马：【黑马程序员匠心之作|C++教程从0到1入门编程,学习编程不再难】 https://www.bilibili.com/video/BV1et411b73Z/?p=203&share_source=copy_web&vd_source=7c149f1c6707f644bfee88536c3310c6 (学到vector容器就 ojbk 了，可以再去学学C++多线程)
3. C++ Vector教程： https://blog.csdn.net/qq_40713201/article/details/126740586?fromshare=blogdetail&sharetype=blogdetail&sharerId=126740586&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link

## NO.2.0 安装双系统/配置虚拟机/配置WSL2

1. 安装双系统教程：https://blog.csdn.net/qq_40713201/article/details/126740586?fromshare=blogdetail&sharetype=blogdetail&sharerId=126740586&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link
2. 配置虚拟机：自己找教程哦，著名的csdn上面有很多教程，建议找最新的看
3. WSL：全网最全Win10/11系统下WSL2+Ubuntu20.04的全流程安装指南（两种支持安装至 D 盘方式）_win10安装wsl2-CSDN博客](https://blog.csdn.net/Natsuago/article/details/145594631?spm=1001.2014.3001.5506)

ps: 一键安装ros，这就不得不提到我们伟大无私的小鱼了，在安装好的ubuntu系统中，ctrl + alt + T打开终端，键入`wget http://fishros.com/install -O fishros && . fishros` 这样按着默认操作来就OK啦！

## NO.2 学习ROS1-noetic

教程放这里：【【Autolabor初级教程】ROS机器人入门】 https://www.bilibili.com/video/BV1Ci4y1L7ZZ/?share_source=copy_web&vd_source=7c149f1c6707f644bfee88536c3310c6

跟着赵虚左老师学准没错！视频配套文档看这里 --> [Introduction · Autolabor-ROS机器人入门课程《ROS理论与实践》零基础教程](http://www.autolabor.com.cn/book/ROSTutorials/index.html)  (tips: 第2/4/5/7/10这五章是重点，要重点学习)

学习的时候记得把代码跟着敲一遍理解一遍，学习完可以开始做做相关项目，可以自己试着用blender给自己搭一个仿真环境，自己用gmapping/hector学习一下建图，建完图可以开始调试teb，调teb之前请先搞清楚自己的仿真小车是阿克曼小车还是麦克纳姆轮小车，teb调参教程放下面tips了，学习一下[代价地图](https://blog.csdn.net/JDWell/article/details/88359098?fromshare=blogdetail&sharetype=blogdetail&sharerId=88359098&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link)，可以多去看看关于move_base的教程，例如[ROS：move_base路径规划介绍、更换全局路径规划算法](https://blog.csdn.net/weixin_44190648/article/details/131113449?fromshare=blogdetail&sharetype=blogdetail&sharerId=131113449&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link)。

tips: [在GAZEBO仿真中用Blender搭建属于你自己的模型](https://www.bilibili.com/video/BV1rT4y1P7HN/?share_source=copy_web&vd_source=7c149f1c6707f644bfee88536c3310c6)，**[激光雷达建图之hector_mapping 建图](https://blog.csdn.net/qq_40713201/article/details/126740586?fromshare=blogdetail&sharetype=blogdetail&sharerId=126740586&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link)**，**[GMAPPING的参数设置](https://blog.csdn.net/bufengzj/article/details/99079017?fromshare=blogdetail&sharetype=blogdetail&sharerId=99079017&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link)**，[ROS teb_local_planner使用](https://blog.csdn.net/weixin_62456310/article/details/123373746?fromshare=blogdetail&sharetype=blogdetail&sharerId=123373746&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link)，[move base参数及global planner，local planner设置](https://yaked19.blog.csdn.net/article/details/125503202?fromshare=blogdetail&sharetype=blogdetail&sharerId=125503202&sharerefer=PC&sharesource=2301_79844835&sharefrom=from_link)，[TEB所有参数含义](https://blog.csdn.net/weixin_43667077/article/details/135867519?spm=1001.2014.3001.5506)

**另请参考:**

- http://wiki.ros.org/move_base

## NO.3 有需要再继续学习ROS2

***humble教程***