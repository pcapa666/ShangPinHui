//search的小仓库

import {reqCartList,reqDeleteCartById,reqUpdateCheckedByid} from '@/api'

//state:仓库存储数据的地方
const state={
    cartList:[]
}
//mutaition:修改state的唯一手段
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
//action:处理action，可以书写自己的业务逻辑
const actions={
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车产品
    async deleteCartList({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            //加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车产品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        await reqUpdateCheckedByid(skuId,isChecked)
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        //constext：小仓库
        //获取购物车中全部产品
        let PromiseAll = []
        // 便利购物车
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartList',item.skuId):''
            PromiseAll.push(promise)
        });
        // 只要全部的p1|p2...都成功，返回结果为成功
        // 有一个失败，返回失败
        return Promise.all(PromiseAll)
    },
    //修改全部产品状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
//getters:理解为计算属性，用于简化仓库数据
const getters={
    cartList(state){
        return state.cartList[0]||{}
    },
    //计算出来购物出数据
    
}

export default{
    state,mutations,actions,getters
}