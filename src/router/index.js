import Vue from 'vue'
import Router from 'vue-router'
import MainPage from "../page/MainPage";
import Article from "../page/Article";
import File from "../page/File";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      redirect: '/article',
      children:[
        {
          path: '/article',
          name: 'Article',
          component: Article
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
