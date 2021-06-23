import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

// constantRoutes是必然会被加载的 - 就是说任何用户都会享有这个功能
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        // path: '/redirect/:path(.*)',
        path: '/redirect/:path*', // 为了携带参数
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

// 将我们自己定义的组件放在asyncRoutes当中
export const asyncRoutes = [
  {
    path: '/user-manager',
    name: '用户管理',
    component: Layout,
    // redirect:
    meta: { title: '用户管理', icon: 'user', roles: ['admin'] },
    children: [
      {
        path: '/user-manager/create',
        component: () => import('@/views/user-manager/create'),
        meta: { title: '新增用户', icon: 'edit' }
      },
      {
        path: '/user-manager/edit',
        component: () => import('@/views/user-manager/edit'),
        hidden: true,
        meta: { title: '编辑用户', icon: 'list' }
      },
      {
        path: '/user-manager/list',
        component: () => import('@/views/user-manager/list'),
        meta: { title: '用户列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/flow-manager',
    name: '流程管理',
    component: Layout,
    // redirect:
    meta: { title: '流程管理', icon: 'guide' },
    children: [
      {
        path: '/flow-manager/create',
        component: () => import('@/views/flow-manager/create'),
        meta: { title: '创建流程', icon: 'edit' }
      },
      {
        path: '/flow-manager/list',
        component: () => import('@/views/flow-manager/list'),
        meta: { title: '流程列表', icon: 'list' }
      },
      {
        path: '/flow-manager/detail/:id',
        component: () => import('@/views/flow-manager/components/FlowDetail'),
        hidden: true,
        meta: { title: '详细流程', icon: 'edit' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
