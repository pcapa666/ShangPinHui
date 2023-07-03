import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
//引入仓库
import store from './store'
//引入swiper
import 'swiper/css/swiper.css'


//定义全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox  } from 'element-ui'
// 全局组件,第一个参数，组件名，第二个参数，哪个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// elementUI组件
Vue.component(Button.name,Button)
//还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

//统一接口api文件夹里面的全部请求函数
import * as API from '@/api'

import cool from '@/assets/images/1.jpg'

//测试
// import {reqGetSearchInfo} from './api/index'
// import * as reqCategoryList from './api'
// reqGetSearchInfo({});

//引入插件
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload,{
    loading:cool
})

//引入表单校验插件
import '@/plugins/validate'

new Vue({
    render:h=>h(App),
    beforeCreate(){
        //配置全局时间总线
        Vue.prototype.$bus=this
        Vue.prototype.$API = API
    },
    //注册路由
    router,
    //注册仓库
    store
}).$mount('#app')
