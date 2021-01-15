import Blog from "../page/article/Blog";
import Article from "../page/article/Article";
import Sort from "../page/article/Sort";

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
