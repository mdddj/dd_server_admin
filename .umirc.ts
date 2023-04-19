import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'demo',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      access: 'canSeeAdmin'
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      layout: false
    },
    {
      name: '用户管理',
      path: '/users',
      component: './Users'
    }
  ],
  npmClient: 'pnpm',
});

