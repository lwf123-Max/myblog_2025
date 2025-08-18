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
        },
        {
          text: "✨ 智能车",
          collapsible: true,
          children: ["car01.md", "ROS2的日志dz.md", "互斥锁小文本.md", "屠学长的渡众有感.md"],
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