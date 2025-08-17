export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/docLog/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"","type":"article"} }],
  ["/blog/cjlulwf.html", { loader: () => import(/* webpackChunkName: "blog_cjlulwf.html" */"D:/docLog/docs/.vuepress/.temp/pages/blog/cjlulwf.html.js"), meta: {"title":"","type":"article"} }],
  ["/blog/hello.html", { loader: () => import(/* webpackChunkName: "blog_hello.html" */"D:/docLog/docs/.vuepress/.temp/pages/blog/hello.html.js"), meta: {"title":"","type":"article"} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/blog/index.html.js"), meta: {"excerpt":"<p># 📚 所有文章</p>\n<p>这里是您所有博客文章的集合：</p>\n<p>- [Hello 世界](hello)</p>\n<p>- [关于 cjlulwf](cjlulwf)</p>\n<blockquote>\n<p>更多文章正在创作中...</p>\n</blockquote>\n","readingTime":{"minutes":0.12,"words":35},"title":"","type":"article"} }],
  ["/posts/", { loader: () => import(/* webpackChunkName: "posts_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/posts/index.html.js"), meta: {"excerpt":"<h2>📚 欢迎来到文章列表</h2>\n<p>这里列出我所有的博客文章，点击左侧边栏或下方链接阅读：</p>\n<ul>\n<li><a href=\"/blog/hello\" target=\"_blank\" rel=\"noopener noreferrer\">我的第一篇文章</a></li>\n<li><a href=\"/blog/smartcar\" target=\"_blank\" rel=\"noopener noreferrer\">我的第二篇文章</a></li>\n</ul>\n","readingTime":{"minutes":0.18,"words":54},"title":"所有文章","type":"article"} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "tag_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/tag/index.html.js"), meta: {"title":"Tag","index":false} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/docLog/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "category_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/category/index.html.js"), meta: {"title":"Category","index":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "article_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/article/index.html.js"), meta: {"title":"Articles","index":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "star_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/star/index.html.js"), meta: {"title":"Star","index":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "timeline_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"title":"Timeline","index":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "tag_index.html" */"D:/docLog/docs/.vuepress/.temp/pages/tag/index.html.js"), meta: {"title":"Tag","index":false} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
