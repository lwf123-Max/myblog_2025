import comp from "D:/docLog/docs/.vuepress/.temp/pages/posts/index.html.vue"
const data = JSON.parse("{\"path\":\"/posts/\",\"title\":\"所有文章\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"所有文章\"},\"readingTime\":{\"minutes\":0.18,\"words\":54},\"filePathRelative\":\"posts/index.md\",\"excerpt\":\"<h2>📚 欢迎来到文章列表</h2>\\n<p>这里列出我所有的博客文章，点击左侧边栏或下方链接阅读：</p>\\n<ul>\\n<li><a href=\\\"/blog/hello\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">我的第一篇文章</a></li>\\n<li><a href=\\\"/blog/smartcar\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">我的第二篇文章</a></li>\\n</ul>\\n\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
