<template>
    <div class="wrap">
        <button @click="showIt = !showIt">demo</button>
        <div :class="showIt ? 'active' : ''" class="box">
            <lv-box width="100%" height="100%" :needClose="true" title="标题">
            </lv-box>
        </div>
    </div>
</template>

<script>
import LvBox from "../lv/LvBox"
export default {
data () {
    return {
        showIt:true
    }
},
components: {
    LvBox
}
}
</script>

<style lang="less">
    .wrap{
        position: relative;
        width: 100px;
        height: 30px;
        button{
            position: absolute;
            display: inline-block;
            width: 100px;
            height: 30px;
            top:0%;
            left:0%;
            line-height: 30px;
        }
        .box{
            position: absolute;
            left: 100px;
            bottom:0px;
            width: 0;
            height: 0;
            z-index: 999;
            overflow: hidden;
            transition: .3s;
            &.active{
                width: 600px;
                height: 400px;
            }
        }
    }
</style>
