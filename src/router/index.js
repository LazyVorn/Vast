import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/container/Login'
import ProInfo from '@/container/ProInfo'
import Frame from '@/container/Frame'
import Overview from '@/container/Overview'

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
        }]
    }]
})