<template>
  <div class="goods_detail">
    <header class="mui-bar mui-bar-nav">
      <router-link to="/goods" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">商品详情页</h1>
    </header>
    <main class="detail_box" >
      <section class="banner_box">
        <div class="banner_child_box">
            <img v-lazy="item" alt="" class="banner_pic">
        </div>

        <div class="banner_count">
          <em id="slide-nub" class="fz18">1</em>
          <em class="nub-bg">/</em>
          <em id="slide-sum" class="fz12">5</em>
        </div>

      </section>
      <section class="product_info clearfix">
        <div class="product_left">
          <p class="p_name">{{goods.productName}}</p>
          <div class="product_pric">
            <span>￥</span>
            <span class="rel_price">{{goods.salePrice}}</span>
            <span>.00</span>
          </div>
          <div class="product_right">
            降价通知
          </div>
        </div>

      </section>
      <section class="product_intro">
        <p class="pro_det">
          惠普（HP）战99-65 15.6英寸 笔记本 工作站i7-8750H/8GB*1/256G SSD+1TB/Win10
        </p>
      </section>

    </main>
    <footer class="cart_d_footer">
      <div class="m">
        <ul class="m_box">
          <li class="m_item" v-if="isLogined">
            <a href="" class="m_item_link">
              <em class="m_item_pic"></em>
              <span class="m_item_name">卖家</span>
            </a>
            <a href="javascript:;" @touchend="toggleInterest(goods.productId)" class="m_item_link"  >
              <em class="m_item_pic" :class="{'two':interested == false,'interested':interested == true }"></em>
              <span class="m_item_name">关注</span>
            </a>
            <a href="" class="m_item_link">
              <em class="m_item_pic three"></em>
              <router-link to="/Cart"  class="m_item_name" >购物车</router-link>
            </a>
          </li>
        </ul>
        <div class="btn_box clearfix" >
          <a href="javascript:;" class="buy_now" @touchend="addCart(goods.productId)">加入购物车</a>

        </div>
      </div>
    </footer>
    <!-- if 失败 -->
    <model v-show="mdShow" >
      <p slot="message">
        请您先登录，否则无法加入购物车！
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="cancel" @touchend="mdShow=false">关闭</a>
        <router-link href="javascript:;" to="/login" class="submit">去登录</router-link>
      </div>
    </model>
    <!-- if 成功 -->
    <model v-show="mdShowCart" >
      <p slot="message">
        尊敬的用户，加入购物车成功啦！
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="cancel" @touchend="mdShowCart=false">继续购物</a>
        <router-link to="/Cart" class="submit">查看购物车</router-link>
      </div>
    </model>
    <router-view></router-view>
  </div>

</template>

<script>
  import  model from './../components/model.vue';
  import axios from 'axios';
    export default {
      name: "goodsdetail",
      data(){
        return{
          goods:{},
          id:0,
          item:'',
          userName:'',
          mdShow:false,
          mdShowCart:false,
          isLogined:false,
          toShopcart:'',
          interested:false,
        }
      },
      components: {
        model
      },
      created(){
        this.getGoodsList();
      },
      mounted:function () {
        this.checklogin();
      },
      methods:{
        getGoodsList(){
          var param = {
            id: this.$route.params.id
          };
          var _this = this;
          axios.get('/api/goods/list',{params:param}).then((result)=>{;
            var res = result.data;
            _this.goods = res.result.list[0];
            _this.item = '../../static/imgs/goodslist/' + res.result.list[0].productImgBig;
          })
        },
        addCart(productId){
          var _this = this;
          axios.post("/api/goods/addCart",{
            productId:productId,
            userName:_this.userName
          }).then(function (response) {
            var res = response.data;
            if(res.status==0){
              _this.mdShowCart = true;
            }else {
              _this.mdShow = true;
            }
          })
        },
        toggleInterest(productId){
          var _this = this;
          _this.interested=!_this.interested;
          if(_this.interested == true){
            axios.post("/api/goods/addInterest",{
              productId:productId,
              userName:_this.userName
            }).then(function (response) {
              var res = response.data;
              if(res.status == '0'){
                console.log('suc')
              }else {
                console.log('err')
              }
            })
          }else if(_this.interested == false){
            axios.post("/api/goods/delInterest",{
              productId:productId,
              userName:_this.userName
            }).then(function (response) {
              var res = response.data;
              if(res.status == '0'){
                console.log('suc')
              }else {
                console.log('err')
              }
            })
          }
        },
        checkInterest(){
          var _this = this;
          axios.post("/api/goods/checkInterest",{
            productId:_this.$route.params.id,
            userName:_this.userName
          }).then(function (response) {
            var res = response.data;
            if(res.status == '0'){
              _this.interested = true;
            }else {
              _this.interested = false;
            }
          })
        },
        checklogin(){
          var _this = this;
          axios.get("/api/users/checkLogin").then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              this.isLogined = true;
              _this.userName = res.result;
              _this.checkInterest();
            }else {
              this.isLogined = false;
            }
          })
        }
      }
    }
</script>

<style scoped>
  @import '../assets/detail.css';
  .m_item_link .interested{

    background-position: -52px -20px;
  }
</style>
