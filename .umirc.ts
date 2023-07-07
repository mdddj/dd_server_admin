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
            name: "初始化管理员账号",
            path: '/init',
            component: './Login/CreateAdminPage',
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
        },
        {
            name: "权限管理",
            path: "/role",
            routes: [
                {
                    name: "权限列表",
                    path: "/role/list",
                    component: "./Role/list"
                }
            ]
        },
        {
            name: "文件管理",
            path: "/file",
            routes: [
                {
                    name: "上传文件",
                    path: "/file/upload",
                    component: "./File/upload"
                },
                {
                    name: "文件列表",
                    path: "/file/list",
                    component: "./File/list"
                }
            ]
        },
        {
            name: "文章管理",
            path: "/blog",
            routes: [
                {
                    name: "文章列表",
                    path: "/blog/list",
                    component: "./Blog/list"
                },
                {
                    name: "发布文章",
                    path: "/blog/add",
                    component: "./Blog/add"
                }
            ]
        },
        {
            name: "资源管理",
            path: "/resource",
            routes: [
                {
                    name: "分类列表",
                    path: "/resource/category",
                    component: "./Resource/CategoryList"
                },
            ]
        }
    ],
    npmClient: 'pnpm',
});

