import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/container/Login'
// import ProInfo from '@/container/ProInfo'
// import Frame from '@/container/Frame'
// import Overview from '@/container/Overview'
// import Unit from '@/container/Unit'
const ProInfo = () =>
    import ('@/container/ProInfo')
const Frame = () =>
    import ('@/container/Frame')
const Overview = () =>
    import ('@/container/Overview')
const Unit = () =>
    import ('@/container/Unit')
const Login = () =>
    import ('@/container/Login')

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/ProjectInfo',
        name: 'ProInfo',
        component: ProInfo
    }, {
        path: '/:id/Frame',
        name: 'Frame',
        component: Frame,
        children: [{
                path: '/:id/Frame/Overview',
                name: 'Overview',
                component: Overview
            },
            {
                path: '/:id/Frame/Unit',
                name: 'Unit',
                component: Unit
            }
        ]
    }]
})