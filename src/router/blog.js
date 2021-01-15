import Blog from "../page/article/blog";
import Article from "../page/article/article";
import Sort from "../page/article/sort";

export default [
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: 'blog/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/sort',
    name: 'Sort',
    component: Sort
  }
]
