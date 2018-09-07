<template>
    <div class="zyy_layout" name="zyy_layout">

        <!-- header -->
        <header class="zyy_header">
            <div class="zyy_header_box">
                <a href="#" class="zyy_logo" v-if="isShow"></a>
                <form action="javascript:;">
                  <router-link to="/search">
                    <span class="icon_search"></span>
                    <!-- 这样可以调出搜索按钮 -->
                    <input type="search" placeholder="提示"/>
                  </router-link>
                </form>
                <router-link class="sessionClass" to="/user">{{nickname}}</router-link>
                <router-link to="/login" class="login" v-show="!isLogined">登录</router-link>
                <span class="login" v-show="isLogined" @touchend="mdLogout = true">注销</span>
            </div>
        </header>
        <!-- 轮播图 -->
        <div class="zyy_banner">
            <mt-swipe :auto="4000">
                <!-- <mt-swipe-item>1</mt-swipe-item>
                 -->
                <mt-swipe-item v-for="item in list">
                    <img :src="item.img">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 导航栏 -->
        <div class="zyy_nav">
            <ul>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav0.png'" alt="">
                        <p>夜空朗朗</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav1.png'" alt="">
                        <p>奋笔书旁</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav2.png'" alt="">
                        <p>秋霜微降</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav3.png'" alt="">
                        <p>庭院空堂</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav4.png'" alt="">
                        <p>悠悠月光</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav5.png'" alt="">
                        <p>散落心房</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav6.png'" alt="">
                        <p>梦断情长</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img v-lazy="'../../static/imgs/home/nav7.png'" alt="">
                        <p>你在何方</p>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 商品区域 -->
        <main class="zyy_product">
            <!--<section class="zyy_product_box zyy_secondKill">-->
                <!--<div class="product_top no_bor">-->
                    <!--<div class="zyy_secondKill_left">-->
                        <!--<span class="sk_icon"></span>-->
                        <!--<h4 class="sk_name">掌上秒杀</h4>-->
                        <!--<div class="sk_time">-->
                            <!--<span class="num">0</span>-->
                            <!--<span class="num">0</span>-->
                            <!--<span class="str">:</span>-->
                            <!--<span class="num">0</span>-->
                            <!--<span class="num">0</span>-->
                            <!--<span class="str">:</span>-->
                            <!--<span class="num">0</span>-->
                            <!--<span class="num">0</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="zyy_secondKill_right">-->
                        <!--<a href="#">更多></a>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="product_bot">-->
                    <!--<ul class="clearfix">-->
                        <!--<li>-->
                            <!--<a href="#">-->
                                <!--<div class="img_box"><img v-lazy="'../../static/imgs/home/detail02.jpg'" alt=""></div>-->
                                <!--<p class="now_price">&yen;20.00</p>-->
                                <!--<p class="old_price">&yen;200.00</p>-->
                            <!--</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a href="#">-->
                                <!--<div class="img_box"><img v-lazy="'../../static/imgs/home/detail02.jpg'" alt=""></div>-->
                                <!--<p class="now_price">&yen;20.00</p>-->
                                <!--<p class="old_price">&yen;200.00</p>-->
                            <!--</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a href="#">-->
                                <!--<div class="img_box"><img v-lazy="'../../static/imgs/home/detail01.jpg'" alt=""></div>-->
                                <!--<p class="now_price">&yen;20.00</p>-->
                                <!--<p class="old_price">&yen;200.00</p>-->
                            <!--</a>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
            <!--</section>-->
            <section class="zyy_product_box zyy_pd">
                <div class="product_top">
                    <h3>超值购</h3>
                </div>
                <div class="product_bot clearfix">
                    <a href="#" class="p_left b_right"><img v-lazy="'../../static/imgs/home/cp1.jpg'" alt=""></a>
                    <a href="#" class="p_right b_bottom"><img v-lazy="'../../static/imgs/home/cp2.jpg'" alt=""></a>
                    <a href="#" class="p_right"><img v-lazy="'../../static/imgs/home/cp3.jpg'" alt=""></a>
                </div>
            </section>
            <section class="zyy_product_box zyy_pd" style="padding-bottom: 50px;">
                <div class="product_top">
                    <h3>热门活动</h3>
                </div>
                <div class="product_bot clearfix">
                    <a href="#" class="p_left b_bottom"><img v-lazy="'../../static/imgs/home/cp4.jpg'" alt=""></a>
                    <a href="#" class="p_left"><img v-lazy="'../../static/imgs/home/cp5.jpg'" alt=""></a>
                    <a href="#" class="p_right b_left"><img v-lazy="'../../static/imgs/home/cp6.jpg'" alt=""></a>
                </div>
            </section>
        </main>

        <Footer></Footer>

        <model v-show="mdLogout">

          <p slot="message">
            尊敬的用户，是否确定要注销？
          </p>
          <div slot="btnGroup">

            <a href="javascript:;" class="cancel" @touchend="mdLogout=false">取消</a>
            <span class="submit" @touchend="logOut">注销</span>
          </div>

        </model>

        <router-view></router-view>
    </div>
</template>
<script>
  import Footer from './footer.vue';
  import  model from './model.vue';
  import axios from 'axios';
    export default {
      components: {
        model,
        Footer
      },
      data(){
            return {
                list:[
                    {"id":"1","img":"/static/imgs/l1.jpg"},
                    {"id":"2","img":"/static/imgs/l2.jpg"},
                    {"id":"3","img":"/static/imgs/l3.jpg"},
                    {"id":"4","img":"/static/imgs/l4.jpg"},
                    {"id":"5","img":"/static/imgs/l5.jpg"}
                ],
                // username:'',
                // user:'',
                isShow:true,
                isLogined:true,
                nickname:'',
                mdLogout:false
            }
        },
        mounted() {
          // this.getSession();
          this.isShowLogo();
          this.checklogin();
        },
        methods:{
          // getSession() {
          //   if (window.sessionStorage.userInfo) {
          //     this.username = window.sessionStorage.userInfo;
          //     // console.log(typeof (this.username))
          //     this.user = eval('(' + this.username + ')');
          //     // console.log(this.user);
          //   }else {
          //     return
          //   }
          // },
          isShowLogo(){
            if(this.nickname!=''){
              this.isShow = false;
              this.isLogined = true
            }else {
              this.isShow = true;
              this.isLogined = false;
            }
          },
          logOut(){
            axios.post('/api/users/logout').then((response)=>{
              let res = response.data;
              if(res.status == "0"){
                // this.user = '';
                this.isLogined = false;
                this.isShow = true;
                window.sessionStorage.userInfo = '';
                this.nickname='';
                this.mdLogout = false;
              }
            })
          },
          checklogin(){
            axios.get("/api/users/checkLogin").then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                this.nickname = res.result;
                this.isLogined = true;
                this.isShow = false;
              }
            })
          },

        }
    }
</script>
<style scoped>

    header{
        background-color: rgba(0,0,0,0.3);
    }
    header input{
        border: 1px solid white;
    }
    .mint-swipe{
        height: 201px;
    }
    .mint-swipe-item img{
        width: 100%;
    }
    .mint-swipe-item{
        width: 100%;
        height: 300px;
    }
  .sessionClass{
    position: absolute;
    color: white;
    top: 10px;
    left: 10px;
  }
</style>   
