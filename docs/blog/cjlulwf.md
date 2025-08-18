---
title: 博客插入图片的方法
date: 2025-08-17
categories:
  - 技术报告
tags:
  - 随笔
  - 学习
---

# 如何插入图片到blog中

在我简单粗暴的复制粘贴图片到***markdown***并**push**上去时，工作流在`Build site`出现了报错:

```
error [vite:asset] Could not load /home/runner/work/myblog_2025/myblog_2025/docs/blog/C:/Users/33279/AppData/Roaming/Typora/typora-user-images/image-20250817215553414.png (imported by docs/.vuepress/.temp/pages/blog/hello.html.vue): ENOENT: no such file or directory, open '/home/runner/work/myblog_2025/myblog_2025/docs/blog/C:/Users/33279/AppData/Roaming/Typora/typora-user-images/image-20250817215553414.png'
```

#### 对于插入本地图片出现的问题作出的解决方法：

### 📂 推荐目录结构调整

```
D:.
├─.vuepress
│  └─public
│     └─images       <- 所有静态资源入口
│        ├─blog      <- 博客图片 (优先使用)
│        ├─posts     <- 分类文章图片
│        └─global   <- 全局图片(logo等)
│
├─blog               <- 博客文章目录
│  ├─hello.md        # 示例文章
│  └─xxx.md
│
└─tag               <- 标签目录（自动生成）
```

```
# 创建存放图片的目录
mkdir -p docs\.vuepress\public\images\blog
```

### 配置优化（防止再次出现）：

**修改 Typora 设置避免绝对路径**

- •

  打开 Typora > 偏好设置 > 图像

- •

  勾选 **"复制图片到./${filename}.assets 文件夹"**

- •

  选择 **"优先使用相对路径"**

- •

  取消勾选 "允许上传图片"

按照上述设置完，将所需图片放入`\images\blog`，就可以在你的markdown文档中插入图片。git后，自动部署也不会报错啦！