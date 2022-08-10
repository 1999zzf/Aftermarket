import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta:{
      islogin:false,
      title:'登录页面'
    },
    component: () => import('../components/login.vue')
  },
  {
    path:'/components/adminpages/index',
    // name:'/index',
    meta:{
      islogin:true,
      title:'主页'
    },
    component:()=>import('../components/adminpages/index.vue'),
    children:[ 
      {path:'',name:'informationManagement',meta:{islogin:true,title:'当前用户'},component:()=>import('@/components/adminpages/informationManagement')},
      {path:'userList',name:'userList',meta:{islogin:true,title:'用户编辑'},component:()=>import('@/components/adminpages/userList')},
      {path:'authorityManagement',name:'authorityManagement',meta:{islogin:true,title:'权限管理'},component:()=>import('@/components/adminpages/authorityManagement')},
      {path:'questionLibrary',name:'questionLibrary',meta:{islogin:true,title:'问答库'},component:()=>import('@/components/adminpages/questionLibrary')},
      {path:'testConfig',name:'testConfig',meta:{islogin:true,title:'题型管理'},component:()=>import('@/components/adminpages/testConfig')},
      {path:'problemRecord',name:'problemRecord',meta:{islogin:true,title:'问题记录'},component:()=>import('@/components/adminpages/problemRecord')},
      {path:'traveRecords',name:'traveRecords',meta:{islogin:true,title:'出差记录'},component:()=>import('@/components/adminpages/traveRecords')},
      {path:'spareParts',name:'spareParts',meta:{islogin:true,title:'备件记录'},component:()=>import('@/components/adminpages/spareParts')},
      {path:'projectRecord',name:'projectRecord',meta:{islogin:true,title:'项目信息'},component:()=>import('@/components/adminpages/projectRecord')},
      {path:'testPaper',name:'testPaper',meta:{islogin:true,title:'题目生成'},component:()=>import('@/components/adminpages/testPaper')}
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
