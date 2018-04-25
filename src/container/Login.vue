<template>
  <div class="login_wrap">
      <login-background></login-background>
      <img id="logo" src="../assets/logo.png">
    <div :class="rotate?'active':''" class="sign_log_box">
    <div class="login_box box" v-show="!rotate">
        <form-input type="text" label="用户名：" placeholder="请输入用户名或邮箱" @value="getUser"></form-input>
        <form-input type="password" label="密码：" placeholder="请输入密码" enter checkInfo="密码不得为空" @value="getPassword" @enter="loginFunc"></form-input>
        <lv-button size="large" @on-click="loginFunc">登录</lv-button>
        <p class="sign_option">没有账号?点击此处<span @click="rotate=!rotate">注册</span></p>
    </div> 
    <div class="sign_box box" :class="rotate?'active':''" v-show="rotate">
        <form-input type="text" label="用户名：" noRepeat="account" placeholder="请输入用户名" needCheck @value="getNewUser" @warning="newUserError"></form-input>
        <form-input type="text" label="昵称：" placeholder="请输入昵称" needCheck @value="getNewName" @warning="newNameError"></form-input>
        <form-input type="email" label="邮箱：" placeholder="请输入邮箱" needCheck @value="getNewEmail" @warning="newEmailError"></form-input>
        <form-input type="password" label="密码：" placeholder="请输入密码" needCheck checkInfo="密码不得为空" @value="getNewPassword" @warning="newPasswordError"></form-input>
        <form-input type="password" label="重复密码：" placeholder="请再输入一次密码" enter needCheck checkInfo="密码不一致，请重新输入" @value="getNewMuPassword" @warning="newMuPasswordError" @enter="signFunc"></form-input>
        <lv-button size="large" @on-click="signFunc">点击注册</lv-button>
        <p class="sign_option">已有账号?点击此处<span @click="rotate=!rotate">登录</span></p>
    </div>
    </div>
  </div>
</template>

<script>
import LvButton from "../components/lv/LvButton"
import FormInput from "../components/lv/FormInput"
import LoginBackground from "../components/LoginBackground"
export default {
  name: 'Login',
  data () {
    return {
        rotate:false,
        user:"",
        password:"",
        loginInfo:{
            identity:"",
            password:"",
        },
        signInfo:{
            email:"",
            name:"",
            account:"",
            password:"",
        },
        secondPassword:"",
        newUserWarning:true,
        newNameWarning:true,
        newEmailWarning:true,
        newPasswordWarning:true,
        newMuPasswordWarning:true,
    }
  },
  created () {
  },
  methods: {
      getUser(e){
          this.loginInfo.identity = e
      },
      getPassword(e){
          this.loginInfo.password = e
      },
      getNewUser(e){
          this.signInfo.account = e
      },
      getNewPassword(e){
          this.signInfo.password = e
      },
      getNewName(e){
          this.signInfo.name = e
      },
      getNewEmail(e){
          this.signInfo.email = e
      },
      getNewMuPassword(e){
          this.secondPassword = e
      },
      newUserError(e){
          this.newUserWarning = e
      },
      newEmailError(e){
          this.newEmailWarning = e
      },
      newNameError(e){
          this.newNameWarning = e
      },
      newPasswordError(e){
          this.newPasswordWarning = e
      },
      newMuPasswordError(e){
          this.newMuPasswordWarning = e
      },
      submitForm(formName){
          this.rotate=!this.rotate
      },
      loginFunc(){
          if(this.loginInfo.identity !="" && this.loginInfo.password !="") {
            let url = this.$api.login()
            this.$post(url,this.loginInfo).then(res => {
                if(!res.status){
                    this.$store.commit("INIT_USER_ID",res.userId)
                    this.$cookies.set("user_id",res.userId).set("user_token",res.token)
                    //记住一周
                    //this.$cookies.set("user_id",res.userId,60 * 60 * 24 * 7).set("user_token",res.token,60 * 60 * 24 * 7)
                    this.$Message.success("登陆成功，现为您跳转。。。。。。")
                    setTimeout(()=>{
                        this.$router.push("/ProjectInfo")
                    },500)
                } else {
                    this.$Message.error("用户名或密码错误")
                }
            })
          } else {
              this.$Message.error("帐号密码不得为空")
          }
      },
      signFunc(){
          if(!this.newUserWarning && !this.newNameWarning && !this.newEmailWarning && !this.newPasswordWarning && !this.newMuPasswordWarning) {
            let url = this.$api.sign()
            this.$post(url,this.signInfo).then(res => {
                this.$store.commit("INIT_USER_ID",res.id)
                this.$Message.success("注册成功，现为您跳转。。。。。。")
                this.$router.push("/ProjectInfo")
            })
          } else {
              this.$Message.error("请确认输入是否正确")
          }
      }
  },
  components: {
      LoginBackground,
      FormInput,
      LvButton,
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_wrap{
    .root{
        width: 100%;
    }
    position: relative;
    width: 100%;
    height: 100%;
    #logo{
        position: absolute;
        left: 50%;
        top:50px;
        width: 360px;
        margin-left: -190px;
    }
    .sign_option{
        font-size: 14px;
        color:#666;
        text-align: left;
        text-indent: 50px;
        span{
            font-weight: 900;
            color:#2d60cc;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .sign_log_box{
        position: absolute;
        box-sizing: border-box;
        top:50%;
        left: 50%;
        width: 360px;
        height: 260px;
        margin-top:-130px;
        margin-left:-180px;
        text-align: center;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 3px 3px 7px #ddd;
        transform: rotateY(0deg);
        -webkit-transform-style: preserve-3d;
        transition: .8s;
        &.active{
            margin-top:-260px;
            transform: rotateY(180deg);
        }
        .box{
            position: absolute;
            top: 0;
            left: 0;
            width: 360px;
            height: 260px;
            padding:30px 0;
            background-color: #fff;
            border:1px solid #ccc;
            border-radius: 5px;
            transform: rotateY(0deg);
            transition: .8s;
            &.sign_box{
                transform: rotateY(180deg);
                &.active{
                    height: 460px;
                }
            }
            .lv_input{
                margin:0 auto;
            }
            button{
                margin:10px auto 30px;
                width:260px;
            }
            
        }
    }
}
</style>
