import comp from "D:/docLog/docs/.vuepress/.temp/pages/blog/hello.html.vue"
const data = JSON.parse("{\"path\":\"/blog/hello.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"blog/hello.md\",\"excerpt\":\"\"}")
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
