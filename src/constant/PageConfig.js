const NAV_LIST = [
  {
    name: "博客",
    path: "/blog",
    icon: "el-icon-user",
    children: [
      {
        name: "文章",
        path: "blog/article",
      }
    ]
  },
  {
    name: "分类",
    path: "/sort",
    icon: "el-icon-tickets",
  },
  {
    name: "文件",
    path: "/file",
    icon: "el-icon-cloudy",
    children: []
  },
]

const ARTICLE_STATE = 1
const ARTICLE_LIMIT = 5

export default {
  NAV_LIST,
  ARTICLE_LIMIT,
  ARTICLE_STATE
}
