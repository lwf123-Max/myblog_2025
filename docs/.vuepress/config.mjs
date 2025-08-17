// docs/.vuepress/config.mjs
import { viteBundler } from '@vuepress/bundler-vite';
import { hopeTheme } from 'vuepress-theme-hope';

export default {
  title: '我的个人博客',
  description: '记录学习与生活的点滴',
  base: '/myblog_2025/',
  
  // 添加 bundler 配置
  bundler: viteBundler(),
  
  theme: hopeTheme({
    navbar: [
      { text: '🏠 首页', link: '/' },
      { text: '📚 文章', link: '/blog/' },
      { 
        text: 'GitHub', 
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
        }
      ]
    },
    
    blog: {
      name: "我的博客",
      description: "记录学习与生活的点滴",
    },
    
    plugins: {
      blog: true,
      mdEnhance: {
        lineNumbers: true,
      },
    },
  }),
  
  markdown: {
    toc: {
      level: [2, 3]
    }
  }
};