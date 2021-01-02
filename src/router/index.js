import Vue from 'vue'
import Router from 'vue-router'
import Article from "../page/Article";
import File from "../page/File";
import SidebarItem from "../page/SidebarItem";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SidebarItem',
      component: SidebarItem,
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
