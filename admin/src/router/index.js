import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesEdit from '../views/CategoriesEdit.vue'
import CategoriesList from '../views/CategoriesList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

Vue.use(VueRouter)

const routes = [
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
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
