/**
 * 一些基本配置
 *
 * nav_list: 侧边导航栏设置
 * article_settings: 文章展示的设置
 * file_settings: 文件下载上传相关设置
 *
 */
const nav_list = [
  {
    // 侧边导航栏第一位置
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
    // 侧边导航栏第二位置
    name: "分类",
    path: "/sort",
    icon: "el-icon-tickets",
    children: []
  },
  {
    // 侧边导航栏第三位置
    name: "文件",
    path: "/file",
    icon: "el-icon-cloudy",
    children: []
  },
]

const article_settings = {
  state: 1,
  limit: 5
}

const file_settings = {
  limit: 20,
  size: 50,
}

export default {
  nav_list,
  article_settings,
  file_settings
}
