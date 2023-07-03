import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

// 先把vuerouter原型对象上的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{ },()=>{ })
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{ },()=>{ })
    }
}


//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})
// getUserInfo
//全局守卫
router.beforeEach(async(to,from,next)=>{
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token){
        if(to.path=='/login'){
            next('/home')
        }else{
            if(name)next()
            else{
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了,重新登录
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }

})

export default router
