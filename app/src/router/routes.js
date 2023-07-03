//引入路由组件
import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from "@/pages/Trade"
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default[
    {
        path:'/home',
        component:Home,
        meta:{
            show:true
        }
    },
    {
        path:'/center',
        component:Center,
        meta:{
            show:true
        },
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                //重定向
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{
            show:true
        },
        beforeEnter:(to,from,next)=>{
            if(from.path=='/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        meta:{
            show:true
        },
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/search/:keyword?',
        //路由懒加载
        component:()=>import('@/pages/Search'),
        name:'search',
        meta:{
            show:true
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            show:false
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            show:false
        }
    },
    {
        path:'/detail/:skuid',
        name:'detail',
        component:Detail,
        meta:{
            show:true
        }
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{
            show:true
        }
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{
            show:true
        }
    },
    {
        path:'/trade',
        component:Trade,
        meta:{
            show:true
        },
        // 路由独享守卫
        beforeEnter:(to,from,next)=>{
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    
    
    //重定向
    {
        path:'*',
        redirect:'/home'
    }
]