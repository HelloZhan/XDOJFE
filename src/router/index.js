// 该文件专门用于创建路由器
import {createRouter , createWebHashHistory} from 'vue-router'
// router/index.ts
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// router/index.ts
 
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载 icon
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

import HomePage from '../pages/HomePage.vue'
import ProblemList from '../pages/ProblemList.vue'
import Problem from '../pages/Problem.vue'
import StatusRecord from '../pages/StatusRecord.vue'
import DiscussList from '../pages/DiscussList.vue'
import UserRank from '../pages/UserRank.vue'
import UserHome from '../pages/UserHome.vue'
import UserSetting from '../pages/UserSetting.vue'
import Admin from '../pages/Admin.vue'
import ProblemEditor from '../pages/Editor/ProblemEditor.vue'
import Announcement from '../pages/Announcement.vue'
import SolutionList from '../pages/SolutionList.vue'
import Solution from '../pages/Solution.vue'
import Discuss from '../pages/Discuss.vue'

import AdminDiscuss from '../components/Admin/AdminDiscuss.vue'
import AdminProblem from '../components/Admin/AdminProblem.vue'
import AdminUser from '../components/Admin/AdminUser.vue'
import AdminAnnouncement from '../components/Admin/AdminAnnouncement.vue'
import AdminSolution from '../components/Admin/AdminSolution.vue'

import AnnouncementEditor from '../pages/Editor/AnnouncementEditor.vue'
import SolutionEditor from '../pages/Editor/SolutionEditor.vue'
import DiscussEditor from '../pages/Editor/DiscussEditor.vue'

import Test from '../pages/Test.vue'

const routes = [
    {
        path:'/',
        name:'HomePage',
        component:HomePage
    },
    {
        path:'/problemlist',
        name:'ProblemList',
        component:ProblemList
    },
    {
        path:'/problem',
        name:'Problem',
        component:Problem
    },
    {
        path:'/statusrecord',
        name:'StatusRecord',
        component:StatusRecord
    },
    {
        path:'/discusslist',
        name:'DiscussList',
        component:DiscussList
    },
    {
        path:'/userrank',
        name:'UserRank',
        component:UserRank
    },
    {
        path:'/userhome',
        name:'UserHome',
        component:UserHome
    },
    {
        path:'/usersetting',
        name:'UserSetting',
        component:UserSetting
    },
    {
        path:'/admin',
        name:'Admin',
        component:Admin,
        children:[
            {
                path:'admindiscuss',
                component: AdminDiscuss
            },
            {
                path:'adminproblem',
                component: AdminProblem
            },
            {
                path:'adminuser',
                component: AdminUser
            },
            {
                path:'adminannouncement',
                component: AdminAnnouncement
            },
            {
                path:'adminsolution',
                component: AdminSolution
            } 
        ]
    },
    {
        path:'/problemeditor',
        name:'ProblemEditor',
        component:ProblemEditor
    },
    {
        path:'/announcement',
        name:'Announcement',
        component:Announcement
    },
    {
        path:'/solution',
        name:'Solution',
        component:Solution
    },
    {
        path:'/discuss',
        name:'Discuss',
        component:Discuss
    },
    {
        path:'/solutionlist',
        name:'SolutionList',
        component:SolutionList
    },
    {
        path:'/announcementeditor',
        name:'AnnouncementEditor',
        component:AnnouncementEditor
    },
    {
        path:'/solutioneditor',
        name:'SolutionEditor',
        component:SolutionEditor
    },
    {
        path:'/discusseditor',
        name:'DiscussEditor',
        component:DiscussEditor
    },
    {
        path:'/test',
        name:'Test',
        component:Test
    },
    
]
//创建并暴露一个路由器
const router = createRouter({
    history:createWebHashHistory(),
	routes:routes
})

router.beforeEach((to, from, next) => {
    NProgress.start() // 进度条开始
    next()
})

router.afterEach(() => {
    NProgress.done() // 进度条结束
})
   
export default router