<template>
    <div class="pagination">
        <button @click="$emit('getPageNo',pageNo-1)" :disabled="pageNo==1">上一页</button>
        <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="startNumAndEndNum.start>2">...</button>
        <button v-for="(page,i) in continueNum" :key="i" 
            @click="$emit('getPageNo',page+startNumAndEndNum.start-1)" 
            :class="{active:pageNo==page+startNumAndEndNum.start-1}">
            {{ page+startNumAndEndNum.start-1 }}</button>
        <button v-if="startNumAndEndNum.end<totalPage-1">...</button>
        <button v-if="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
        <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo==totalPage">下一页</button>
        <button style="margin-left:30px">共{{total}}条</button>
    </div>
</template>

<script>
    export default {
        name:"Pagination",
        props:[
            // 当前多少页
            'pageNo',
            // 一页多少个
            'pageSize',
            // 总共多少个数据
            'total',
            // 连续的页
            'continues'],
        computed:{
            //总共多少页
            totalPage(){
                return Math.ceil(this.total/this.pageSize)
            },
            //计算出连续的页码开始和结束的数字
            startNumAndEndNum(){
                let start = 0
                let end = 0
                if(this.continues>this.totalPage){
                    start = 1
                    end = this.totalPage
                }
                else{
                    start = this.pageNo - parseInt(this.continues/2)
                    end = this.pageNo + parseInt(this.continues/2)

                    if(start<1){
                        start=1
                        end = this.continues
                    }
                    if(end>this.totalPage){
                        start = this.totalPage-this.continues +1
                        end = this.totalPage
                    }
                }
                return {start,end}
            },
            //连续数字
            continueNum(){
                let num = 0
                num = this.startNumAndEndNum.end-this.startNumAndEndNum.start+1
                return num
            }
        }
    }
</script>

<style lang="less" scoped>
    .pagination{
        text-align: center;
        button{
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;
            &[disabled]{
                color: #c0c4cc;
                cursor: not-allowed;
            }
            &.active{
                // cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>