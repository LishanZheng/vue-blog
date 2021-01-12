const NAV1_NAME = "博客"
const NAV1_URL = "/blog"
const NAV1_1_NAME = "文章"
const NAV1_1_URL = NAV1_URL + "/article"
const NAV2_NAME = "文件"
const NAV2_URL = "/file"
const NAV_LIST = [
  {
    name: "博客",
    url: "/blog",
    icon: "el-icon-user",
    children: [
      {
        name: "文章",
        url: "blog/article",
      }
    ]
  },
  {
    name: "文件",
    url: "/file",
    icon: "el-icon-cloudy",
    children: []
  }
]

export default {
  NAV_LIST,
  NAV1_NAME,
  NAV1_URL,
  NAV2_NAME,
  NAV2_URL,
  NAV1_1_NAME,
  NAV1_1_URL,
}
