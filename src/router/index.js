import Vue from 'vue'
import Router from 'vue-router'
import File from "../page/File";
import MainPage from "../page/MainPage";
import Blog from "../page/Blog";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      redirect: '/blog',
      children:[
        {
          path: '/blog',
          name: 'Blog',
          component: Blog
        },
        {
          path: '/file',
          name: 'File',
          component: File
        }
      ]
    },
  ]
})
