// 这个模块：api统一管理
import requests from './request'
import mockRequests from './mockAjax'
import { escape, method } from 'lodash'



//三级联动接口
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
//get 无参数

export const reqCategoryList = ()=>{
    //发请求：axios发请求返回结果是Promise对象
    return requests({url:'product/getBaseCategoryList',method:'get'})
}

//获取banner首页轮播图接口
export const reqGetBannerList = ()=>{
    return mockRequests({url:'/banner',method:'get'})
}

//获取floor接口
export const reqGetFloorList = ()=>{
    return mockRequests({url:'/floor',method:'get'})
}

//获取搜索模块数据，请求方式post,要带参数
//当前这个接口，给服务器传递参数params至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

//获取产品信息的接口 get
export const reqGoodsInfo=(skuid)=>{
    return requests({url:`item/${skuid}`,method:'get'})
}

//将产品添加到购物车中
export const reqAddOrUpdateShopCart = (all)=>{
    return requests({url:`cart/addToCart/${all.skuId}/${all.skuNum}`,method:'post'})
}

//获取购物车列表的接口
export const reqCartList = ()=>{
    return requests({url:'cart/cartList',method:'get'})
}

//删除购物车产品
export const reqDeleteCartById = (skuId) =>requests({url:`cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>{
    requests({url:`cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}

// 获取验证码
export const reqGetCode = (phone)=>requests({url:`user/passport/sendCode/${phone}`})

//注册接口
export const reqUserRegister = (data)=>{
    console.log(data);
    return requests({url:'user/passport/register',data,method:'post'})
}

//登录接口
export const reqUserLogin = (data)=>{
    return requests({url:'user/passport/login',data,method:'post'})
}

//获取用户信息，需要带着用户的token
export const reqUserInfo = ()=>{
    return requests({url:'user/passport/auth/getUserInfo',method:'get'})
}

// 退出登录
export const reqLogout = ()=>{
    return requests({url:'user/passport/logout',method:'get'})
}

//获取用户地址信息
export const reqAddressInfo = ()=>{
    return requests({url:'user/userAddress/auth/findUserAddressList',method:'get'})
}

//获取商品清单
export const reqOrderInfo=()=>{
    return requests({url:'order/auth/trade',method:'get'})
}

//提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>{
    return requests({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}

//获取订单信息
export const reqPayInfo = (orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}

//获取支付订单状态
export const reqPayStatus = (orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

//获取个人中你数据
export const reqMyOrderList = (page,limit)=>{
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}