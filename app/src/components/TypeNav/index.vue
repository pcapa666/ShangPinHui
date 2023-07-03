<template>
  <div class="type-nav">
        <div class="container" @mouseleave="leaveShow">
            <h2 class="all"  @mouseenter="enterShow">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 过度动画 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                    <div class="all-sort-list2">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" @click="toSearch">
                            <h3 @mouseenter="changeIndex(index)" :class="{cur:colorindex==index}" >
                                <a 
                                :data-categoryName="c1.categoryName" 
                                :data-category1Id="c1.categoryId">
                                    {{c1.categoryName}}
                                </a>
                                <!-- 声明式导航会卡顿，耗内存 -->
                                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem" 
                                v-for="(c2) in c1.categoryChild" 
                                :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a 
                                            :data-categoryName="c2.categoryName" 
                                            :data-category2Id="c2.categoryId">
                                                {{c2.categoryName}}
                                            </a>
                                            <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" 
                                                :data-category3Id="c3.categoryId">
                                                    {{c3.categoryName}}
                                                </a>
                                                <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    // 引入节流，按需引入
    import throttle from 'lodash/throttle'
    import {mapState} from 'vuex'
    export default {
        name:'TypeNav',
        data(){
            return{
                colorindex:-1,
                show:true
            }
        },
        mounted(){
            //如果不是home路由，把show属性变成false
            if(this.$route.path!='/home'){
                this.show=false
            }
        },
        computed:{
            ...mapState({
                categoryList:(state)=>state.home.categoryList
            })
        },
        methods:{
            //加上节流
            changeIndex:throttle(function(index){
                this.colorindex=index
                // console.log(index);
            },50),

            // 路由跳转
            toSearch(event){
                let element = event.target
                console.log(element.dataset);
                //用自定义属性来分辨那些是需要触发点击事件的
                let {categoryname,category1id,category2id,category3id} = element.dataset
                if(categoryname){
                    // console.log(category1Id);
                    let location = {name:'search'}
                    let query = {categoryName:categoryname}
                    if(category1id){
                        query.category1Id=category1id
                    }else if(category2id){
                        query.category2Id=category2id
                    }else{
                        query.category3Id=category3id
                    }
                    //判断：如果路由跳转带有params参数，捎带脚传递过去
                    if(this.$route.params){
                        location.params = this.$route.params
                        //整理完参数
                        location.query=query
                        //路由跳转
                        this.$router.push(location)
                    }
                }
            },

            //鼠标离开时触发的方法
            leaveShow(){
                this.colorindex=-1
                if(this.$route.path!='/home'){
                    this.show=false
                }
            },
            //鼠标拉入时候触发的方法
            enterShow(){
                if(this.$route.path!='/home'){
                    this.show=true
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .type-nav {
            border-bottom: 2px solid #e1251b;

            .container {
                width: 1200px;
                margin: 0 auto;
                display: flex;
                position: relative;

                .all {
                    width: 210px;
                    height: 45px;
                    background-color: #e1251b;
                    line-height: 45px;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                }

                .nav {
                    a {
                        height: 45px;
                        margin: 0 22px;
                        line-height: 45px;
                        font-size: 16px;
                        color: #333;
                    }
                }

                .sort {
                    position: absolute;
                    left: 0;
                    top: 45px;
                    width: 210px;
                    height: 461px;
                    position: absolute;
                    background: #fafafa;
                    z-index: 999;

                    .all-sort-list2 {
                        .item {
                            h3 {
                                line-height: 30px;
                                font-size: 14px;
                                font-weight: 400;
                                overflow: hidden;
                                padding: 0 20px;
                                margin: 0;

                                a {
                                    color: #333;
                                }
                            }
                            .cur{
                                background-color: skyblue;
                            }

                            .item-list {
                                display: none;
                                position: absolute;
                                width: 734px;
                                min-height: 460px;
                                background: #f7f7f7;
                                left: 210px;
                                border: 1px solid #ddd;
                                top: 0;
                                z-index: 9999 !important;

                                .subitem {
                                    float: left;
                                    width: 650px;
                                    padding: 0 4px 0 8px;

                                    dl {
                                        border-top: 1px solid #eee;
                                        padding: 6px 0;
                                        overflow: hidden;
                                        zoom: 1;

                                        &.fore {
                                            border-top: 0;
                                        }

                                        dt {
                                            float: left;
                                            width: 54px;
                                            line-height: 22px;
                                            text-align: right;
                                            padding: 3px 6px 0 0;
                                            font-weight: 700;
                                        }

                                        dd {
                                            float: left;
                                            width: 415px;
                                            padding: 3px 0 0;
                                            overflow: hidden;

                                            em {
                                                float: left;
                                                height: 14px;
                                                line-height: 14px;
                                                padding: 0 8px;
                                                margin-top: 5px;
                                                border-left: 1px solid #ccc;
                                            }
                                        }
                                    }
                                }
                            }

                            &:hover {
                                .item-list {
                                    display: block;
                                }
                            }
                        }
                    }
                }
                //过度动画的样式
                .sort-enter-to{
                    height: 461px;
                }
                .sort-enter{
                    height:0px
                }
                //定义动画时间速率
                .sort-enter-active{
                    transition: all 0.1s linear
                }
            }
        }
</style>