<template>
  <div>
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
  import Header from './components/Header/MyIndex.vue'
  import Footer from './components/Footer/MyIndex.vue'
  export default {
    name: 'App',
    components: {
      Header,Footer
    },
    mounted(){
      //通知vuex发请求，获取数据存储在仓库中
      this.$store.dispatch('categoryList')
    }
  }
</script>

<style>

</style>
