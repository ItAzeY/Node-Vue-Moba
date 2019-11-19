import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

import CategoriesEdit from '../views/CategoriesEdit.vue'
import CategoriesList from '../views/CategoriesList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    } 
  }, 
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path: '/categories/create', component:CategoriesEdit },
      {path: '/categories/edit/:id', component:CategoriesEdit,props:true },
      {path: '/categories/list', component:CategoriesList },

      {path: '/items/create', component:ItemEdit },
      {path: '/items/edit/:id', component:ItemEdit,props:true },
      {path: '/items/list', component:ItemList },

      {path: '/heroes/create', component:HeroEdit },
      {path: '/heroes/edit/:id', component:HeroEdit,props:true },
      {path: '/heroes/list', component:HeroList },

      {path: '/articles/create', component:ArticleEdit },
      {path: '/articles/edit/:id', component:ArticleEdit,props:true },
      {path: '/articles/list', component:ArticleList },

      {path: '/ads/create', component:AdEdit },
      {path: '/ads/edit/:id', component:AdEdit,props:true },
      {path: '/ads/list', component:AdList },
 
      {path: '/admin_user/create', component:AdminUserEdit },
      {path: '/admin_user/edit/:id', component:AdminUserEdit,props:true },
      {path: '/admin_user/list', component:AdminUserList },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局导航钩子(每次切换路由之前的操作)
router.beforeEach((to, form, next) => {
  if(!to.meta.isPublic &&  !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
