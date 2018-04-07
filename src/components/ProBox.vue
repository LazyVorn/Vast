<template>
    <div class="pb_wrap" @click="isClick">
        <img :src="info.coverUrl" alt="暂无图像" class="pb_img">
        <h1 class="pb_title">{{info.name}}</h1>
        <p class="pb_person">负责人：{{info.createPersonName}}</p>
        <p class="pb_date">创建时间：{{info.createTime}}</p>
        <p class="pb_date">最后修改：{{info.updateTime}}</p>
        <p class="pb_announcement">公告：{{info.announcement}}</p>
        <p class="pb_detail">简述：{{info.introduction}}</p>
        <div class="layer"></div>
    </div>
</template>

<script>
export default {
    name:"ProBox",
    props:{
        projectInfo:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    data(){
        return {
            info:{}
        }
    },
    mounted(){
        let _obj = this.projectInfo
        _obj.coverUrl = _obj.coverUrl == "" ? '../../static/logo.png' : this.projectInfo.coverUrl
        _obj.updateTime = this.dealDate(_obj.updateTime)
        _obj.createTime = this.dealDate(_obj.createTime)
        _obj.announcement = _obj.announcement == "" ? "暂无" : _obj.announcement
        _obj.introduction = _obj.introduction == "" ? "暂无" : _obj.introduction
        this.info = _obj
    },
    methods:{
        dealDate(date,type = "-"){
            let _date = new Date(date),
                _year = _date.getFullYear(),
                _month = _date.getMonth() < 9 ? '0' + "" + (_date.getMonth() + 1) : _date.getMonth + 1,
                _day = _date.getDate() < 10 ? '0' + "" + _date.getDate() : _date.getDate(),
                _hour = _date.getHours() < 10 ? '0' + "" + _date.getHours() : _date.getHours(),
                _minute = _date.getMinutes() < 10 ? '0' + "" + _date.getMinutes() : _date.getMinutes(),
                _second = _date.getSeconds() < 10 ? '0' + "" + _date.getSeconds() : _date.getSeconds()
            return `${_year}-${_month}-${_day} ${_hour}:${_minute}:${_second}`
        },
        isClick(){
            this.$emit('on-click',this.info.id)
        }
    }
}
</script>

<style lang="less">
.pb_wrap{
    position: relative;
    box-sizing: border-box;
    float: left;
    width: 300px;
    height: 480px;
    background-color: #fff;
    padding:10px 15px;
    margin: 10px 20px;
    border:1px solid #dddee1;
    box-shadow: 3px 3px 5px #ddd;
    overflow: hidden;
    cursor: pointer;
    transition: .2s;
    &:hover{
        box-shadow: 0 0 5px #4472c4;
        border-color:#4c82df;
        .layer{
            left:400px;
        }
    }
    .pb_img{
        display: block;
        width: 100%;
        height: 160px;
    }
    .pb_title{
        width: 100%;
        text-align: center;
        font-size: 20px;
        color:#4472c4;
        line-height: 2.5;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .iconfont{
            font-size: 24px;
            font-weight: 400;
        }
    }
    .pb_date,.pb_announcement,.pb_person,.pb_detail{
        width: 100%;
        color:#c2c2c2;
        line-height: 2;
        font-size: 14px;
    }
    .layer{
        position: absolute;
        left:-100px;
        top: -40px;
        width: 5px;
        height: 150%;
        background-color: #fff;
        transform: rotate(30deg);
        box-shadow: 3px 3px 5px #fff;
        transition: .6s;
    }
}
</style>
