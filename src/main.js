/*
 * @Author: qqq
 * @Date: 2021-09-20 00:27:19
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-14 23:57:01
 * @Description: file content
 */
import { createApp,provide } from 'vue'
import App from './App.vue'
import less from 'less'
import axios from 'axios';
import route from './router/index.js';
import store from './store/index.js'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/resset.css'
const app=createApp(App);
app.config.globalProperties.message=ElMessage
app.use(VueAxios, axios).use(route).use(store).use(ElementPlus).use(less);
app.mount('#app')

