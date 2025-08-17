# 你好大千世界

## 搭建个人blog



### node安装

1. 先得下载node.js,去官网[[Node.js — Download Node.js®](https://nodejs.org/zh-cn/download)](https://nodejs.org/en/blog/release/v22.18.0)下载msi文件，按步骤安装就行，然后重点！

   ![img](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/12948571.webp)

2. 进行环境变量配置 找到安装的目录，在安装目录下新建两个文件夹【node_global】和【node_cache】 创建完毕后，使用管理员身份打开cmd命令窗口，输入 npm config set prefix “你的路径\node_global” npm config set cache “你的路径\node_cache”

3. 环境变量的系统变量新建

   变量名：NODE_PATH

   变量值："你node的安装目录"\nodejs\node_global\node_modules

4. 将用户变量的path进行一个编辑 将默认的C换成node_global的路径

5. 系统变量的path也新建一个%NODE_PATH%

   ### [#](https://loyuner.github.io/blogs/blog/hello.html#开始安装vuepress)开始安装vuepress

   1. 创建项目文件夹，然后cd到那个文件夹

   2. npm init -y 会生成`package.json` 文件

   3. npm install -D vuepress，但是国内好慢 npm install -D vuepress --registry https://registry.npmmirror.com

   4. 目录结构如下 可以用一下命令

      ```text
      mkdir docs
      mkdir docs\.vuepress
      type nul > docs\.vuepress\config.js
      type nul > docs\README.md
      ```

   5. 编写 `config.js`

      ```text
      // docs/.vuepress/config.js
      
      module.exports = {
        title: '我的个人博客',
        description: '记录学习与生活的点滴',
        base: '/myblog_2025/', // 部署到 https://lwf123-Max.github.io/myblog_2025/
      
        theme: 'reco',
      
        themeConfig: {
          type: 'blog', // 🔥 必须开启博客模式
      
          // 导航栏
          nav: [
            { text: '🏠 首页', link: '/' },
            { text: '📚 文章', link: '/blog/' },
            { text: 'GitHub', link: 'https://github.com/lwf123-Max/myblog_2025' },
          ],
      
          // ✅ 左侧导航：手动配置文章结构（用于上下篇和左侧菜单）
          sidebar: {
            '/blog/': [
              '',
              {
                title: '✨ 初始文章',
                children: [
                  'hello.md',   // 对应 docs/blog/hello.md
                  'cjlulwf.md'    // 对应 docs/blog/higuy.md
                ]
              }
              // 后续添加文章可继续扩展
            ]
          },
      
          // ✅ 重要：开启右侧文章目录（TOC）
          subSidebar: 'auto', // 显示当前文章的标题结构（h2/h3...）
      
          sidebarDepth: 3, // 支持解析到 h3 标题
      
          // 博客功能配置
          blogConfig: {
            category: {
              location: 2,
              text: '分类'
            },
            tag: {
              location: 3,
              text: '标签'
            },
            archive: {
              location: 4,
              text: '归档'
            },
            perPagePosts: 10
          },
      
          // 其他功能
          lastUpdated: '最后更新时间',
          docsRepo: 'lwf123-Max/myblog_2025',
          repo: 'lwf123-Max/myblog_2025',
          branch: 'main',
          docsDir: 'docs',
          docsBranch: 'main',
          repoLabel: '查看源码',
          editLinks: true,
          editLinkText: '在 GitHub 上编辑此页',
          editLink: ({ filePath }) => {
            return `https://github.com/lwf123-Max/myblog_2025/edit/main/docs/${filePath}`
          },
          search: true,
          searchMaxSuggestions: 10,
          smoothScroll: true,
      
          // 可选：Valine 评论系统（需要 LeanCloud）
          // valineConfig: {
          //   appId: '你的 LeanCloud AppID',
          //   appKey: '你的 LeanCloud AppKey',
          //   placeholder: '欢迎留言交流...',
          //   visitor: true,
          //   recordIP: true,
          //   enableQQ: true
          // }
        },
      
        // 插件
        plugins: [
          '@vuepress/plugin-back-to-top',
          '@vuepress/plugin-nprogress',
          // '@vuepress/plugin-medium-zoom' // 图片放大功能（可选）
        ],
      
        // Markdown 增强
        markdown: {
          lineNumbers: true // 显示代码行号
        }
      }
      ```

   6. `docs/posts/index.md`（文章列表页）

      ```text
      ---
      title: 所有文章
      ---
      
      ## 📚 欢迎来到文章列表
      
      这里列出我所有的博客文章，点击左侧边栏或下方链接阅读：
      
      - [我的第一篇文章](/blog/hello)
      - [我的第二篇文章](/blog/second)
      ```

   7. `package.json`这个很重要

      ```text
      {
        "scripts": {
          "dev": "vuepress dev docs",
          "build": "vuepress build docs"
        },
        "devDependencies": {
          "vuepress": "^1.9.9"
        }
      }
      ```

   8. npm run dev启动！！！！！

   但是报错：

   ```
   D:\docLog>npm run dev 
   > doclog@1.0.0 dev 
   > vuepress dev docs 
   
   wait Extracting site metadata... Error: Cannot resolve theme: reco.    at resolveTheme (D:\docLog\node_modules\@vuepress\core\lib\node\loadTheme.js:111:13)    at loadTheme (D:\docLog\node_modules\@vuepress\core\lib\node\loadTheme.js:36:17)    at App.process (D:\docLog\node_modules\@vuepress\core\lib\node\App.js:105:21)    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)    at async dev (D:\docLog\node_modules\@vuepress\core\lib\index.js:17:3)
   ```

   解决：

   - •

     **问题原因**：`vuepress-theme-reco`主题未安装或安装失败。

   - •

     **解决方法**：

     ```
     npm install vuepress-theme-reco@1.x --save-dev
     ```

     确保安装的版本与你的 VuePress 版本兼容（VuePress 1.x 对应 `vuepress-theme-reco@1.x`）

     先在github中创建自己的仓库

     在你创建的项目doclog中继续执行

     ```
     git init
     git add .
     git remote add origin https://github.com/你的用户名/你的仓库名.git
     git commit -m "Initial commit"
     git push -u origin master
     ```

     但是我push的时候一直有问题：

     ```
     D:\docLog>git push origin main --force
     fatal: unable to access 'https://github.com/lwf123-Max/myblog_2025.git/': Failed to connect to github.com port 443 after 21090 ms: Could not connect to server
     ```

     所以我是这样解决的：

     ### **切换 HTTPS 到 SSH 协议**

     既然 SSH 认证成功，直接改用 SSH 协议推送可绕过 HTTPS 连接问题：

     ```
     git remote set-url origin git@github.com:lwf123-Max/myblog_2025.git
     git push -u origin main
     ```

     **优势**：SSH 协议通常更稳定，且已通过验证

     ```
     D:\docLog>git push -u origin main
     Enumerating objects: 27698, done.
     Counting objects: 100% (27698/27698), done.
     Delta compression using up to 12 threads
     Compressing objects: 100% (19570/19570), done.
     Writing objects: 100% (27698/27698), 39.26 MiB | 836.00 KiB/s, done.
     Total 27698 (delta 7080), reused 27698 (delta 7080), pack-reused 0 (from 0)
     remote: Resolving deltas: 100% (7080/7080), done.
     To github.com:lwf123-Max/myblog_2025.git
      * [new branch]        main -> main
     branch 'main' set up to track 'origin/main'.
     ```

     ***成功！***

     **重新启动**：npm run dev
