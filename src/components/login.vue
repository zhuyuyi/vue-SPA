
<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <router-link to="/" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">

            <div id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input id='account' v-model.trim="userName" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' v-model.trim="userPwd" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
            </div>
            <span class="msg" v-show="errorTip">用户名或密码错误</span>
            <div class="mui-content-padded">
                <a id='login' class="mui-btn mui-btn-block mui-btn-primary" @touchend="login" style="background-color: red;border-color: red" >登录</a>
                <div class="link-area">
                    <router-link to="/register" id='reg'>注册账号</router-link>
                    <span class="spliter">|</span>
                    <router-link id='forgetPassword' to="/home">你好</router-link>
                </div>
            </div>

            <model v-show="mdLogined">
              <p slot="message">
                客官，您登录成功，是否前往首页？
              </p>
              <div slot="btnGroup">
                <router-link class="cancel" to="/home">去首页</router-link>
                <router-link class="submit" to="/Cart">查看购物车</router-link>
              </div>
            </model>

        </div>

        <router-view></router-view>
    </div>
</template>
<script>
  import  model from './model.vue';
  import axios from 'axios';
    export default {
      name: "",
      data() {
        return {
          userName: '',
          userPwd: '',
          errorTip: false,
          mdLogined: false
        }
      },
      components: {
        model
      },
      created() {

      },
      methods: {
        login() {
          var _this = this;
          if (!this.userName || !this.userPwd) {
            this.errorTip = true;
            return;
          }
          axios.post('/api/users/login', {
            userName: _this.userName,
            userPwd: _this.userPwd
          }).then((response) => {
            let res = response.data;
            if (res.status == "0") {
              _this.errorTip = false;
              // window.sessionStorage.userInfo = JSON.stringify(res.result.userName);
              _this.mdLogined = true;
              // let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
              // // console.log(_this.$route);
              // _this.$route.push({path:redirect});
            } else {
              _this.errorTip = true;
            }
          })
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
        margin-top: 180px;
    }
    .mui-content-padded button{
        background-color: red;
        border-color: red;
    }
    .mui-content-padded .link-area{
        margin-top: 20px;
        text-align: center;
        font-size: 17px;
        padding-bottom: 35px;
    }
    .mui-content{
        background-color: transparent;
    }
    .msg{
      color: red;
      padding-top: 70px;
      display: block;
      text-align: center;
      position: absolute;
      left: 50%;
      margin-left: -56px;
      z-index: -100;
    }
</style>   
