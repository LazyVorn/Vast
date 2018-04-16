<template>
<div class="frame_wrap">
    <login-background></login-background>
    <div class="frame_top">
        <img class="logo" src="../assets/logo.png">
    </div>
    <div class="top_wrap" :class="hide ? 'hide' : ''">
        <div class="top_btn" @click="hide = !hide">
            <i class="iconfont">&#xe752;</i>
        </div>
        <div class="menu_wrap">
            <div class="menu_box" v-for="(ele,index) in menuArr" :key="index">
                <i class="iconfont" v-html="ele.src"></i>
                <span class="value">{{ele.simpleValue}}</span>
            </div>
        </div>
    </div>
    <left-side></left-side>
    <div class="content_wrap" :class="hide ? 'hide' : ''">
        <router-view/>
    </div>
</div>
</template>

<script>
import LeftSide from "../components/LeftSide";
import LoginBackground from "../components/LoginBackground";
export default {
  name: "Frame",
  components: {
    LoginBackground,
    LeftSide
  },
  data() {
    return {
      hide: false,
      menuArr: [
        {
          value: "游戏概况",
          simpleValue: "概况",
          src: "&#xe612;",
          path: "/Overview"
        },
        {
          value: "游戏阵营",
          simpleValue: "阵营",
          src: "&#xe608;",
          path: "/Comp"
        },
        {
          value: "NPC",
          simpleValue: "NPC",
          src: "&#xe612;",
          path: "/NPC"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.frame_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .frame_top {
    width: 100%;
    height: 50px;
    .logo {
      float: left;
      height: 50px;
    }
  }
  .top_wrap {
    box-sizing: border-box;
    position: absolute;
    height: 52px;
    top: 0px;
    right: 10px;
    color: #fff;
    border: 1px solid #4472c4;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    transition: 0.3s;
    &.hide {
      height: 12px;
      .top_btn {
        .iconfont {
          transform: rotate(180deg);
        }
      }
    }
    .top_btn {
      width: 100%;
      height: 12px;
      background-color: #4472c4;
      &:hover {
        color: #000;
        box-shadow: 0 0 4px #fff;
      .iconfont {
        color: #000;
      }
      }
      .iconfont {
        display: block;
        width: 100%;
        height: 12px;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
        text-align: center;
      }
    }
    .menu_wrap {
      box-sizing: border-box;
      width: 100%;
      padding-left: 10px;
      background-color: rgba(255, 255, 255, 0.4);
      .menu_box {
        box-sizing: border-box;
        float: left;
        width: 62px;
        height: 30px;
        margin: 5px 10px 0 0;
        padding-left: 8px;
        border: 1px solid #4472c4;
        color: #4472c4;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          color: #fff;
          background-color: #4472c4;
          box-shadow: 0 0 4px #4472c4;
        }
        .iconfont {
          display: block;
          float: left;
          width: 20px;
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          text-align: left;
        }
        .value {
          float: left;
          display: block;
          font-size: 12px;
          line-height: 30px;
        }
      }
    }
  }
  .content_wrap {
    box-sizing: border-box;
    position: absolute;
    left: 88px;
    top: 60px;
    right: 10px;
    bottom: 10px;
    padding: 10px;
    border: 1px solid #4472c4;
    border-radius: 10px;
    transition: 0.3s;
    background-color: rgba(255,255,255,0.4);
    &.hide {
      top: 15px;
    }
  }
}
</style>
