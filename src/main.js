// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './Router'

import store from '@/store'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import {
    Button,
    Upload,
    Steps,
    Step,
    Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
// import '../src/assets/less/base.less'

import Axios from 'axios'
import api from '../src/api/index'
import { $get, $post } from '../src/utils/request'
Axios.defaults.baseURL = 'http://47.98.112.70:8080';
Vue.use(Button);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Step);
// Axios.defaults.headers.common['Authorization'] = "Bearer 3577e2a8-8efe-497a-8553-27e135046b1b";
Axios.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                _t: Date.parse(new Date()) / 1000,
            }
        } else if (config.method == 'get') {
            config.params = {
                _t: Date.parse(new Date()) / 1000,
                ...config.params
            }
        }
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

Vue.prototype.$api = api
Vue.prototype.$get = $get
Vue.prototype.$post = $post

Vue.prototype.$Message = Message

Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})