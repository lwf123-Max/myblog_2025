export const themeData = JSON.parse("{\"encrypt\":{},\"blog\":{\"name\":\"我的博客\",\"description\":\"记录学习与生活的点滴\"},\"locales\":{\"/\":{\"lang\":\"en-US\",\"navbarLocales\":{\"langName\":\"English\",\"selectLangAriaLabel\":\"Select language\"},\"metaLocales\":{\"author\":\"Author\",\"date\":\"Writing Date\",\"origin\":\"Original\",\"views\":\"Page views\",\"category\":\"Category\",\"tag\":\"Tag\",\"readingTime\":\"Reading Time\",\"words\":\"Words\",\"toc\":\"On This Page\",\"prev\":\"Prev\",\"next\":\"Next\",\"contributors\":\"Contributors\",\"editLink\":\"Edit this page\",\"print\":\"Print\"},\"blogLocales\":{\"article\":\"Articles\",\"articleList\":\"Article List\",\"category\":\"Category\",\"tag\":\"Tag\",\"timeline\":\"Timeline\",\"timelineTitle\":\"Yesterday Once More!\",\"all\":\"All\",\"intro\":\"Personal Intro\",\"star\":\"Star\",\"empty\":\"No $text\"},\"paginationLocales\":{\"prev\":\"Prev\",\"next\":\"Next\",\"navigate\":\"Jump to\",\"action\":\"Go\",\"errorText\":\"Please enter a number between 1 and $page !\"},\"outlookLocales\":{\"themeColor\":\"Theme Color\",\"darkmode\":\"Theme Mode\",\"fullscreen\":\"Full Screen\"},\"routerLocales\":{\"skipToContent\":\"Skip to main content\",\"notFoundTitle\":\"Page not found\",\"notFoundMsg\":[\"There’s nothing here.\",\"How did we get here?\",\"That’s a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"back\":\"Go back\",\"home\":\"Take me home\"},\"navbar\":[{\"text\":\"🏠 首页\",\"link\":\"/\"},{\"text\":\"📚 文章\",\"link\":\"/blog/\"},{\"text\":\"GitHub\",\"link\":\"https://github.com/lwf123-Max/myblog_2025\",\"icon\":\"github\"}],\"sidebar\":{\"/blog/\":[{\"text\":\"✨ 初始文章\",\"collapsible\":true,\"children\":[\"hello.md\",\"cjlulwf.md\"]}]}}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
