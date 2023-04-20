import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '皮里斯AI',
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
        },
        {
            name: '企业管理',
            path: '/enterprise',
            routes: [
                {
                    name: '企业列表',
                    path: '/enterprise/list',
                    component: './Enterprise/list'
                },
                {
                    name: '创建企业',
                    path: '/enterprise/create',
                    component: './Enterprise/create'
                }
            ]
        }
    ],
    npmClient: 'pnpm',
});

