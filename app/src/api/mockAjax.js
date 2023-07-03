// 对axios进行二次封装
import axios from 'axios'
//引入进度条
import nProgress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"

//用axios对象的方法create创建一个axios实例
//request就是axios，只是稍微配置了
const requests = axios.create({
    // 基础路径
    baseURL:'/mock',
    // 请求超时时间
    timeout:5000
})
//请求拦截器：在发请求之前，请求拦截器可以检测到，在请求发出去之前做事
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重啊哟，headers请求头
    //进度条开始
    nProgress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回校函数：服务器相应数据回来以后，拦截器可以检测到然后做事
    //进度条结束
    nProgress.done()
    return res.data
},(error)=>{
    //响应失败的回调
    return Promise.reject(new Error('faile'))
})

// 对外暴露
export default requests