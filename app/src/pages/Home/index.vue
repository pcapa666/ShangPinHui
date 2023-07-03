<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- 用props传递数据 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
  import ListContainer from '@/pages/Home/ListContainer/index.vue'
  import Recommend from '@/pages/Home/Recommend'
  import Rank from '@/pages/Home/Rank'
  import Like from '@/pages/Home/Like'
  import Floor from '@/pages/Home/Floor'
  import Brand from '@/pages/Home/Brand'
  import { mapState } from 'vuex'
  export default {
    name:'',
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    mounted(){
      // 派发action获取floor数据
      this.$store.dispatch("getFloorList")
      
    },
    computed:{
      ...mapState({
        floorList:(state)=>state.home.floorList
      })
    }
  }
</script>

<style>

</style>