<template>
    <div>
      <header class="mui-bar mui-bar-nav">
        <router-link to="/home" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <h1 class="mui-title">个人中心</h1>
      </header>

      <model v-show="mdLogout" class="model">
        <p slot="message">
          尊敬的用户，是否确定要注销？
        </p>
        <div slot="btnGroup">
          <span class="cancel" @touchend="cencel">取消</span>
          <span class="submit" @touchend="logOut">注销</span>
        </div>
      </model>

      <div class="userInfoBox">
        <div class="head"><img src="../../static/imgs/head.png" alt=""></div>
        <div class="userName">
          <span v-show="isLogined">用户名：{{nickname}}</span>
          <span v-show="!isLogined"><router-link to="/login">登录 </router-link>|<router-link to="/register"> 注册</router-link></span>
        </div>
      </div>
      <ul class="changeInfo" v-show="isLogined">
        <li><router-link to="/changePwd">修改密码</router-link></li>
        <li>切换头像</li>
        <li @touchend="mdLogout=true">退出登录</li>
      </ul>
      <div class="zyy_nav" v-show="isLogined">
        <ul>
          <li>
            <router-link to="/user/orderList">
              <img v-lazy="'../../static/imgs/home/nav1.png'" alt="">
              <p>我的订单</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/user/cummunity?userName='+nickname">
              <img v-lazy="'../../static/imgs/home/nav4.png'" alt="">
              <p>留言板</p>
            </router-link>
          </li>
          <li>
            <router-link to="/Cart">
              <img v-lazy="'../../static/imgs/home/nav2.png'" alt="">
              <p>购物车</p>
            </router-link>
          </li>
          <li>
            <router-link to="/user/interestList">
              <img v-lazy="'../../static/imgs/home/nav7.png'" alt="">
              <p>我的关注</p>
            </router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
      <Footer></Footer>
    </div>
</template>

<script>
  import Footer from './footer.vue';
  import model from './model.vue';

  import axios from 'axios';
    export default {
      data(){
        return{
          nickname:'',
          isLogined:false,
          mdAddressShow:false,
          mdLogout:false
        }
      },
      components:{
        Footer,
        model
      },
      mounted(){
        this.checklogin();
      },
      methods:{
        cencel(){
          this.mdLogout = false;
        },
        checklogin(){
          axios.get("/api/users/checkLogin").then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              this.nickname = res.result;
              this.isLogined = true;
            }
          })
        },
        logOut(){
          axios.post('/api/users/logout').then((response)=>{
            let res = response.data;
            if(res.status == "0"){
              this.isLogined = false;
              // this.isShow = true;
              window.sessionStorage.userInfo = '';
              this.nickname='';
              this.mdLogout = false;
            }
          })
        },
      }
    }
</script>

<style scoped>
  .model p{
    height:195px;
    line-height: 190px;
  }
  .userInfoBox{
    margin-top: 45px;
    width: 100%;
    overflow: auto;
    background-color: white;
  }
  .userInfoBox .head{
    float: left;
    margin: 20px;
    width: 80px;
    height: 80px;
  }
  .userInfoBox .head img{
    width: 100%;
    height: 100%;
  }
  .userInfoBox .userName{
    float: left;
  }
  .userInfoBox .userName span{
    font-size: 18px;
    display: block;
    line-height: 120px;
  }
  .changeInfo{
    width: 100%;
    display: flex;
    background-color: white;
  }
  .changeInfo li{
    flex: 1;
    text-align: center;
    padding: 30px;
    border-top:#cccccc 1px solid;
    border-bottom: #aaa 1px solid;
    border-radius: 5px;
  }
  .changeInfo li:nth-child(1){
    border-right: #cccccc 1px solid;
  }
  .changeInfo li:nth-child(2){
    border-right: #cccccc 1px solid;
  }
  .zyy_nav{
    height: auto;
    padding-bottom: 20px;
    border-radius: 10px;
    margin-top: 10px;
    top:0;
  }
  .zyy_nav ul{
    overflow: hidden;
    height: auto;
  }
</style>
