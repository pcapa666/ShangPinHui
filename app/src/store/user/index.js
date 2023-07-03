import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogout
} from '@/api'

import {setToken,getToken,removeToken} from '@/utils/token'

const state={
  code:'',
  token:getToken(),
  userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    //清楚本地数据
    CLEAR(state){
        state.token=''
        state.userInfo={}
        // 本地存储清空
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        // console.log(result);
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            alert(result.message)
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code==200){
            console.log(result);
            commit("USERLOGIN",result.data.token)
            // 本地持久化储存token
            setToken(result.data.token)
            return 'ok'
        }else{
            alert(result.message);
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit("GETUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit("CLEAR")
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {

}

export default{
    state,
    mutations,
    actions,
    getters
}