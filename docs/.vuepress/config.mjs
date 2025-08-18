// docs/.vuepress/config.mjs
import { viteBundler } from '@vuepress/bundler-vite';
import { hopeTheme } from 'vuepress-theme-hope';
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  title: '🤖 My Blog',
  description: 'Record my learning and life',
  base: '/myblog_2025/',
  // 添加 bundler 配置
  bundler: viteBundler(),
  plugins: [
    slimsearchPlugin({  // 使用 slimsearchPlugin 替代 searchProPlugin
      indexContent: true,    // ✅ 保留全文搜索功能
      searchFields: [        // ✅ 替换 customFields
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类: $content" // 分类字段的格式化文本
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签: $content" // 标签字段的格式化文本
        }
      ],
      // 可选：添加中文分词支持（需额外安装）
      // indexOptions: { tokenize: "segment" } 
    })
  ],
  theme: hopeTheme({
    navbar: [
      { text: '🏠 首页', link: '/' },
      { text: "💫 分类", link: "/category/" },  // 指向分类索引页
      { text: "🎠 标签", link: "/tag/" },  
      { text: '📚 文章', link: '/blog/' },
      { 
        text: '💻 GitHub', 
        link: 'https://github.com/lwf123-Max/myblog_2025',
        icon: "github" 
      },
    ],
    
    sidebar: {
      "/blog/": [
        {
          text: "✨ 初始文章",
          collapsible: true,
          children: ["hello.md", "cjlulwf.md", "customBg.md"],
        },
        {
          text: "✨ 智能车",
          collapsible: true,
          children: ["car01.md", "渡众ROS2-foxy的尝试.md", "互斥锁小文本.md", "屠学长的渡众有感.md"],
        }
      ]
    },
    
    blog: {
      name: "🐒 我的博客",
      description: "大学学习生活的日志记录"
    },
    
    plugins: {
      blog: true,
      mdEnhance: {
        lineNumbers: true,
      },
    },

        // 添加深色模式配置（可选）
    darkmode: 'toggle', // 开启深色模式切换按钮
    
    // 添加自定义主题变量
    themeColor: {
      yellow: '#fbd82b',
      red: '#f44336',
      green: '#4caf50',
      blue: '#2196f3',
    }
  }),
  
  markdown: {
    toc: {
      level: [2, 3]
    }
  }
};