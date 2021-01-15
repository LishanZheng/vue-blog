import Vue from 'vue'
import Router from 'vue-router'
import File from "../page/file";
import MainPage from "../page/mainPage";
import Blog from "../page/article/blog";
import Login from "../page/login";
import ResponseCode from "../constant/ResponseCode"
import blog from "./blog";

Vue.use(Router)
Vue.prototype.RESPONCE_CODE = ResponseCode

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      redirect: '/blog',
      children:[
        ...blog,
        {
          path: '/file',
          name: 'File',
          component: File
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    },
  ]
})
