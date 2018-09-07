<template>
    <div>
      <header class="mui-bar mui-bar-nav">
        <router-link to="/user" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <h1 class="mui-title">修改密码页</h1>
      </header>
      <div class="mui-content">

        <div id='login-form' class="mui-input-group">
          <div class="mui-input-row">
            <label>账号</label>
            <input id='account' v-model.trim="userName" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
          </div>
          <div class="mui-input-row">
            <label>原密码</label>
            <input id='password' v-model.trim="userPwd" type="password" class="mui-input-clear mui-input" placeholder="请输入原密码">
          </div>
          <div class="mui-input-row">
            <label>新密码</label>
            <input id='passwordNew' v-model.trim="userPwdNew" type="password" class="mui-input-clear mui-input" placeholder="请输入新密码">
          </div>
          <div class="mui-input-row">
            <label>重复新密码</label>
            <input id='passwordNewAgain' v-model.trim="userPwdAgain" type="password" class="mui-input-clear mui-input" placeholder="请输入重复密码">
          </div>
        </div>
        <span class="msg" v-show="errorTip">{{errMessage}}</span>
        <div class="mui-content-padded">
          <a id='login' class="mui-btn mui-btn-block mui-btn-primary" @touchend="changePwd" style="background-color: red;border-color: red" >确认</a>

        </div>

        <model v-show="">
          <p slot="message">
            尊敬的用户，修改密码修改成功!
          </p>
          <div slot="btnGroup">
            <router-link class="cancel" to="/home">取消</router-link>
            <router-link class="submit" to="/Cart">去登录</router-link>
          </div>
        </model>

      </div>

      <router-view></router-view>
    </div>
</template>

<script>
  import model from './model';
  import axios from 'axios';
    export default {
      name: "changePwd",
      data(){
        return{
          userName:'',
          userPwd:'',
          userPwdNew:'',
          userPwdAgain:'',
          errMessage:'',
          errorTip:false
        }
      },
      components:{
        model
      },
      mounted(){

      },
      methods:{
        changePwd(){
          if(this.userPwd == ''||this.userPwdNew == ''||this.userName == ''){
            this.errorTip = true;
            this.errMessage = '内容不得为空'
          }else if (this.userPwd == this.userPwdNew || this.userPwd == this.userPwdAgain){
            this.errorTip = true;
            this.errMessage = '原密码不得与新密码相同'
          } else if(this.userPwdNew != this.userPwdAgain){
            this.errorTip = true;
            this.errMessage = '两次新密码不一致'
          }
          var _this = this;
          axios.post('/api/users/ChangePwd',{
            userName:_this.userName,
            userPwd:_this.userPwd,
            userPwdNew:_this.userPwdNew
          }).then((resposne)=>{
            let res = resposne.data;
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
