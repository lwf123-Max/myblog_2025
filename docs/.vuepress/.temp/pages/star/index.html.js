import comp from "D:/docLog/docs/.vuepress/.temp/pages/star/index.html.vue"
const data = JSON.parse("{\"path\":\"/star/\",\"title\":\"Star\",\"lang\":\"en-US\",\"frontmatter\":{\"dir\":{\"index\":false},\"index\":false,\"feed\":false,\"sitemap\":false,\"title\":\"Star\",\"blog\":{\"type\":\"type\",\"key\":\"star\"},\"layout\":\"Blog\"},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
