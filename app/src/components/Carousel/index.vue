<template>
  <div>
    <div class="swiper-container" id="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="image in list" :key="image.id">
                <img :src="image.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
    //引入swiper
    import Swiper from "swiper"
    export default {
        name:'Carousel',
        props:['list'],
        watch:{
            //监听bannerList数据的变化
            //$nextTick:在下次DOM更新，循环结束之后执行延迟回调。在修改数据之后立即适用这个方法，获取更新后的DOM
            //$nextTick可以保证页面中的结构是一定有的,经常跟很多插件一起使用
            list:{
                //立即监听
                immediate:true,
                handler(newcalue,oldvalue){
                    this.$nextTick(()=>{
                        var mySwiper = new Swiper ('.swiper-container', {
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            //点击小球的饿时候也切换图片
                            clickable:true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        },
                    })
                    })
                }
            }
        }
    }
</script>

<style>

</style>