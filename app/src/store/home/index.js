//home的小仓库

import { reqCategoryList, reqGetBannerList,reqGetFloorList } from "@/api"
import bannerList from '@/mock/mockServe'

//state:仓库存储数据的地方
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
}
//mutaition:修改state的唯一手段
const mutations={
    CATEGOTYLIST(state,categoryList){
        state.categoryList=categoryList
        // console.log(categoryList);
    },
    GETBANNERLIST(state,bannerList){
        // console.log(bannerList);
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        // console.log(bannerList);
        state.floorList=floorList
    }
}
//action:处理action，可以书写自己的业务逻辑
const actions={
    //获取三级联动
    async categoryList({commit}){
        let result = await reqCategoryList()
        // console.log(result);
        if(result.code==200){
            commit("CATEGOTYLIST",result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        // console.log(result);
        if(result.code==200){
            commit("GETBANNERLIST",result.data)
        }
    },
    //获取floor的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        // console.log(result);
        if(result.code==200){
            commit("GETFLOORLIST",result.data)
            // console.log('已经接受到了');
        }
    },
}
//getters:理解为计算属性，用于简化仓库数据
const getters={}

export default{
    state,mutations,actions,getters
}