import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '../views/Layout/Layout.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'/goodmanage',
    meta:{
      islogin:true
    },
    children: [
      {
        path: '/goodmanage',
        name: 'GoodManage',
        component: ()=>import('../views/GoodsManage/GoodsManage.vue'),
      },{
        path: '/guige',
        name: 'GuiGe',
        component: ()=>import('../views/guige/GuiGe.vue'),
      },{
        path: '/guanggao',
        name: 'GuangGao',
        component: ()=>import('../views/GuangGao/GuangGao.vue'),
      },{
        path: '/user',
        name: 'User',
        component: ()=>import('../views/User/User.vue'),
      },{
        path: '/dingdanlist',
        name: 'DingDanList',
        component: ()=>import('../views/DingDan/DingList/DingList.vue'),
      },{
        path: '/tuihuo',
        name: 'TuiHuo',
        component: ()=>import('../views/DingDan/TuiHuo/TuiHuo.vue'),
      },{
        path: 'shengchanlist',
        name: 'ShengChanList',
        component: ()=>import('../views/DingDan/ShengChan/ShengChanList/ShengChanList.vue'),
      },{
        path: '/shenhe',
        name: 'ShenHe',
        component: ()=>import('../views/DingDan/ShengChan/ShenHe/ShenHe.vue'),
      }
    ]
  },
  {
    path:'/login',
    name: 'Login',
    component: ()=>import('../views/Login/Login.vue'),
  }
]

const router = new VueRouter({
  routes
})

// 全局守卫
router.beforeEach((to,from,next)=>{
  //判断是否需要登录
  if (to.matched.some(ele=>ele.meta.islogin)) {
    // 判断是否登录
    let token=store.state.loginModul.userinfo.token
    if(token){//已经登录
      next()
    }else{
      next('/login')
    }
  }else{//不需要登录
    next()
  }
})

export default router
