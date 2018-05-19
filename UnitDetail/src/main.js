// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import store from '@/store'
//按需引用,请自行增减
import './assets/iconfont/iconfont.css'
import '../src/assets/less/base.less'

import {
    Button,
    Upload,
    Steps,
    Step,
    Message,
    Radio,
    RadioGroup,
    Select,
    Option,
    ColorPicker
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'

import LvButton from './components/lv/LvButton.vue'
import LvTag from './components/lv/LvTag.vue'
import LvModal from './components/lv/LvModal.vue'
import FormInput from './components/lv/FormInput.vue'
Vue.component('LvButton', LvButton);
Vue.component('LvTag', LvTag);
Vue.component('LvModal', LvModal);
Vue.component('FormInput', FormInput);

import api from '../src/api/index'
import { $get, $post, $put, $del } from '../src/utils/request'

Axios.defaults.baseURL = 'http://47.98.112.70:8080';
// Axios.defaults.baseURL = 'http://192.168.31.82:8080';
Vue.use(Button);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(ColorPicker);
Axios.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                _t: Date.parse(new Date()) / 1000,
            }
        } else if (config.method == 'get' || config.method == 'put') {
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
Vue.prototype.$put = $put
Vue.prototype.$del = $del
Vue.prototype.$Message = Message
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     store,
//     components: { App },
//     template: '<App/>'
// })
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')