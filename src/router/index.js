// 该文件专门用于创建路由器
import {createRouter , createWebHashHistory} from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import ProblemSet from '../pages/ProblemSet.vue'
import Problem from '../pages/Problem.vue'
import StatusRecord from '../pages/StatusRecord.vue'
import DiscussSet from '../pages/DiscussSet.vue'
import Discuss from '../pages/Discuss.vue'
import UserRank from '../pages/UserRank.vue'
import UserHome from '../pages/UserHome.vue'
import TextEditor from '../pages/TextEditor.vue'
import UserSetting from '../pages/UserSetting.vue'
import Admin from '../pages/Admin.vue'
import ProblemEditor from '../pages/ProblemEditor.vue'

import AdminDiscuss from '../components/Admin/AdminDiscuss.vue'
import AdminProblem from '../components/Admin/AdminProblem.vue'
import AdminUser from '../components/Admin/AdminUser.vue'

import Test from '../pages/Test.vue'

const routes = [
    {
        path:'/homepage',
        name:'HomePage',
        component:HomePage
    },
    {
        path:'/problemset',
        name:'ProblemSet',
        component:ProblemSet
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
        path:'/discussset',
        name:'DiscussSet',
        component:DiscussSet
    },
    {
        path:'/discuss',
        name:'Discuss',
        component:Discuss
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
        path:'/texteditor',
        name:'TextEditor',
        component:TextEditor
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
            }
        ]
    },
    {
        path:'/problemeditor',
        name:'ProblemEditor',
        component:ProblemEditor
    },
    {
        path:'/test',
        name:'Test',
        component:Test
    },
    
]
//创建并暴露一个路由器
export default createRouter({
    history:createWebHashHistory(),
	routes:routes
})
