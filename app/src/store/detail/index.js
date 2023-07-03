import {reqGoodsInfo} from '@/api'
import {reqAddOrUpdateShopCart} from '@/api'
//封装游客身份模块uuid--生成随机id
import {getUUID} from '@/utils/uuid'

const state={
    goodInfo:{},
    uuid:getUUID()
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
const actions = {
    //获取信息的action
    async getGoodInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},all){
        let result = await reqAddOrUpdateShopCart(all)
        // console.log('dddddddddddd',result);
        if(result.code==200){
            return 'ok'
        }else{
            //加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    //路径导航简化
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    //简化产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    },
}

export default{
    state,
    mutations,
    actions,
    getters
}