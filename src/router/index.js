import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/container/Login'
import ProInfo from '@/container/ProInfo'
import Frame from '@/container/Frame'

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
        path: '/:id/Index',
        name: 'Frame',
        component: Frame
    }]
})