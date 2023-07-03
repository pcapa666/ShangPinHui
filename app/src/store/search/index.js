//search的小仓库

import {reqGetSearchInfo} from '@/api'

//state:仓库存储数据的地方
const state={
    searchList:{}
}
//mutaition:修改state的唯一手段
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
//action:处理action，可以书写自己的业务逻辑
const actions={
    async getSearchList({commit},params={}){
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
    }
}
//getters:理解为计算属性，用于简化仓库数据
const getters={
    goodsList(state){
        //这里的state是当前仓库的state
        return state.searchList.goodsList||[]
    },
    trademarkList(){
        return state.searchList.trademarkList||[]
    },
    attrsList(){
        return state.searchList.attrsList||[]
    }
}

export default{
    state,mutations,actions,getters
}