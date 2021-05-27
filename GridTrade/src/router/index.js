import Vue from 'vue'
import Router from 'vue-router'
import Setting from "@/components/Setting/Setting";
import Record from "../components/Record/Record";
import Profit from "../components/Profit/Profit";
import Log from "../components/Log/Log";
import Task from "@/components/Task/Task";
import Login from "@/components/Login/Login";
import CommonPage from '@/components/CommonPage/CommonPage'
Vue.use(Router)

 const router= new Router({
  routes: [
    {
      path:'/',
      name: 'CommonPage',
      component: CommonPage,
      children:[{
        path: '/task',
        name: 'task',
        component: Task
      },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        },
        {
          path: '/record',
          name: 'record',
          component: Record
        },
        {
          path: '/profit',
          name: 'profit',
          component: Profit
        },
        {
          path: '/log',
          name: 'log',
          component: Log
        }]
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{requireAuth:true}
    }

  ]
})

router.beforeEach(function (to, from, next) {
  const while_router = ['login']
  const isLogin = sessionStorage.getItem('isLogin') === 'true';
  if (!isLogin && !while_router.includes(to.name)) {
    next({name: 'login'})
  }else {
    next();
  }
});

export  default  router;
