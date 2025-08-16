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
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    docsRepo: 'lwf123-Max/myblog_2025',
    docsDir: 'docs',
    repo: 'lwf123-Max/myblog_2025',
    repoLabel: '查看源码',

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