/* eslint-disable */
// 工具
import UtilIce from '@/libs/util-ice.js'; // 页面和布局
import Blank from './layout/Blank';
import HeaderAside from './layout/HeaderAside';
// 变量名 routerConfig 为 iceworks 检测关键字
import Index from './pages/Index';
import Login from './pages/Login';
import Error401 from './pages/Error401';
import Error404 from './pages/Error404';

// report working hour
import DailyReport from './pages/DailyReport'
import AllReportController from './pages/DailyReport/AllReportController/AllReportController'
import AllReportMembers from './pages/DailyReport/AllReportMembers/AllReportMembers'
import CreateTask from './pages/CreateTask'
import TaskDetailPage from './pages/CreateTask/TaskDetailPage/TaskDetailPage'
import dailyDashboard from './pages/daily/Dashboard'
import TeamOKR from './pages/TeamOKR'

//okr map
import BoardMap from './pages/OkrMap/BoardMap'


// ice 会自动在这个变量下添加路由数据
// 请不要修改名称
// 备注 ice 自动添加的路由记录是以下格式
// {
//   path: '/page4',
//   layout: d2LayoutMain,
//   component: 4
// }
// 如果不指定 name 字段，会根据 path 生成 name = page-demo1
// 转换规则见 UtilIce.recursiveRouterConfig 中 path2name 方法
// meta 字段会和默认值使用 Object.assign 合并
// 如果不指定 meta.name 的话，name 字段会使用和上面路由 name 一样的取值逻辑
// 下面两个页面就是对比 你可以分别观察两个页面上显示的路由数据差异
const routerConfig = [{
        path: '/BoardMap',
        name: 'BoardMap',
        layout: Blank,
        component: BoardMap
    },
    {
        path: '/TeamOKR',
        name: 'TeamOKR',
        layout: Blank,
        component: TeamOKR
    },
    {
        path: '/CreateTask.vhtml',
        name: 'CreateTask',
        layout: Blank,
        component: CreateTask,
        meta: {
            title: '创建任务',
        }
    },
    {
        path: '/TaskDetailPage/:id',
        name: 'TaskDetailPage',
        layout: Blank,
        component: TaskDetailPage,
        meta: {
            title: '我的任务',
        }
    },
    {
        path: '/dailyReport.vhtml',
        name: 'DailyReport',
        layout: Blank,
        component: DailyReport,
        meta: {
            title: '今日报工',
        }
    },
    {
        path: '/AllReportMembers.vhtml',
        name: 'AllReportMembers',
        layout: Blank,
        component: AllReportMembers,
        meta: {
            title: '普通用户历史报工',
        }
    },
    {
        path: '/AllReportController.vhtml',
        name: 'AllReportController',
        layout: Blank,
        component: AllReportController,
        meta: {
            title: '管理者历史报工',
        }
    },
    {
        path: '/daily/dashboard.vhtml',
        name: 'dailyDashboard',
        layout: Blank,
        component: dailyDashboard,
        meta: {
            title: '周报统计',
        }
    },
    {
        path: '/',
        name: 'index',
        layout: Blank,
        component: Index,
    },
];

// 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig
const routerConfigMenuOut = [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/401',
        name: 'Unauthorized',
        component: Error401,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '*',
        component: Error404,
    },
];

// 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default UtilIce.recursiveRouterConfig([
    ...routerConfig,
    ...routerConfigMenuOut,
]);

// 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = UtilIce.recursiveRouterConfig(routerConfig).map(
    e => {
        const route = e.children ? e.children[0] : e;
        return {
            path: e.path,
            name: route.name,
            meta: route.meta,
        };
    }
);