<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <router-link to="/login" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
            <h1 class="mui-title">注册</h1>
        </header>
        <div class="mui-content">
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input id='account' v-model.trim="userName" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' v-model.trim="userPwd" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
                <div class="mui-input-row">
                    <label>重复密码</label>
                    <input id='againPassword' v-model.trim="userPwdAgain" type="password" class="mui-input-clear mui-input" placeholder="请重新输入密码">
                </div>
                <span class="msg" v-show="errorTip">{{errorMessage}}</span>
            </form>
            <div class="mui-content-padded">
                <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @touchend="register">注册</button>
                <div class="link-area">
                    <router-link to="/register" id='reg'>若出现问题</router-link>
                    <span class="spliter">|</span>
                    <a id='forgetPassword'>请联系朱育仪</a>
                </div>
            </div>

        </div>
        <model v-show="mdRegistered">
          <p slot="message">
            客官，您已注册成功，是否前往登录页？
          </p>
          <div slot="btnGroup">
            <a href="javascript:;" class="cancel" @touchend="mdRegistered=false">留在此页</a>
            <router-link class="submit" to="/login">去登录</router-link>
          </div>
        </model>
        <router-view></router-view>
    </div>
</template>
<script>
  import axios from 'axios';
  import  model from './model.vue';
    export default {
        name: "",
        data(){
            return {
                msg: "",
                userName:'',
                userPwd:'',
                userPwdAgain:'',
                errorTip:false,
                errorMessage:'',
                mdRegistered:false
            }
        },
        components: {
          model
        },
        created(){

        },
        methods:{
          register(){
            var _this = this;
            if(_this.userPwdAgain != _this.userPwd){
              _this.errorTip = true;
              _this.errorMessage = '两次密码不一致';
              return;
            }
            axios.post('/api/users/register',{
              userName:_this.userName,
              userPwd:_this.userPwd
            }).then((response=>{
              let res = response.data;
              if(res.status == "0"){
                _this.mdRegistered = true;
                _this.errorTip = false;
              }else {
                _this.errorTip = true;
                _this.errorMessage = '账号重复';
              }
            }))
          }
        }
    }
</script>
<style scoped>
    .mui-input-group{
        top:50px;
    }
    .mui-input-group .mui-input-row{
        height: 60px;
    }
    .mui-input-group .mui-input-row label,
    .mui-input-group .mui-input-row input{
        font-size: 20px;
        height: 60px;
        line-height: 40px;
    }
    .mui-content-padded{
        position: relative;
        margin-top: 100px;
    }
    .mui-content-padded button{
        background-color: red;
        border-color: red;
    }
    .mui-content-padded .link-area{
        margin-top: 35px;
        text-align: center;
        font-size: 17px;
        padding-bottom: 35px;
    }
    .mui-content{
        background-color: transparent;
    }
    .msg{
      color: red;
      display: block;
      text-align: center;
      position: absolute;
      left: 50%;
      margin-left: -56px;
      z-index: -100;
    }
</style>   
