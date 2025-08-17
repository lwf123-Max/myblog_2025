import comp from "D:/docLog/docs/.vuepress/.temp/pages/blog/index.html.vue"
const data = JSON.parse("{\"path\":\"/blog/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.12,\"words\":35},\"filePathRelative\":\"blog/README.md\",\"excerpt\":\"<p># 📚 所有文章</p>\\n<p>这里是您所有博客文章的集合：</p>\\n<p>- [Hello 世界](hello)</p>\\n<p>- [关于 cjlulwf](cjlulwf)</p>\\n<blockquote>\\n<p>更多文章正在创作中...</p>\\n</blockquote>\\n\"}")
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
