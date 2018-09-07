<template>
    <div>
      <header class="mui-bar mui-bar-nav">

        <h1 class="mui-title">订单成功</h1>
      </header>

      <main>
        <div class="imgBox"><img src="../../static/imgs/ok.png" alt=""></div>
        <div class="address">
          <span class="img-zyy"></span>
          <span class="address-zyy">收件人：{{addressInfo.name}} | 电话：{{addressInfo.tel}}</span>
          <span class="address-zyy">地址：{{addressInfo.streetName}}</span>
        </div>
        <ul class="zyy_shop">
          <li  class="zyy_shop_con" v-for="item in goodsList">
            <!--商品信息-->
            <div class="con_product clearfix">
              <!--图片-->
              <a href="javascript:;" class="con_product_img"><img v-bind:src="'static/imgs/goodslist/'+ item.productImage" v-bind:alt="item.productName"></a>
              <!--商品详细信息-->
              <div class="con_product_box">
                <a href="" class="name">{{item.productName}}</a>
                <!--价格-->
                <p class="price">{{item.salePrice | currency('￥')}}</p>
                <!--操作-->
                <div class="option clearfix">
                  <!--数量-->
                  <div class="change_box">
                    <span class="select-ipt">{{item.productNum}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div class="order">
          <span>订单编号：{{orderId}}</span>
          <span>创建时间：{{createDate}}</span>
          <span style="color:#cf2d28;">总价格：{{orderTotal | currency('￥')}}</span>
        </div>
      </main>

      <footer>
        <router-link to="/home" class="router">首页</router-link>
        <router-link to="/user/orderList" class="router">我的订单</router-link>
      </footer>
      <router-view></router-view>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      data(){
        return{
          goodsList:[],
          orderId:'',
          orderTotal:0,
          createDate:'',
          addressInfo:{}
        }
      },
      mounted(){
        var orderId = this.$route.query.orderId;
        if(!orderId){
          return;
        }
        var _this = this;
        axios.get("/api/users/orderDetail",{
         params:{
           orderId:orderId
         }
        }).then((response=>{
          let res = response.data;
          if(res.status == '0'){
            _this.orderId = orderId;
            _this.orderTotal = res.result.orderTotal;
            _this.createDate = res.result.createDate;
            _this.addressInfo = res.result.addressInfo;
            _this.goodsList = res.result.goodsList;
          }
        }));

      },
      methods:{

      }
    }
</script>

<style scoped>
  .zyy_shop{
    margin-top: 10px;
  }
  .zyy_shop .zyy_shop_con{
    border-bottom: 1px solid #e0e0e0;
    position: relative;
  }
  /*商品大盒子*/
  .zyy_shop .zyy_shop_con .con_product{
    background: #fff;
    padding:10px 10px 10px 40px;
  }
  /*商品图片*/
  .zyy_shop .zyy_shop_con .con_product .con_product_img{
    float:left;
    width: 80px;
    height: 80px;
    margin-right: 10px;
    display: block;
    position: absolute;
  }
  .zyy_shop .zyy_shop_con .con_product .con_product_img img{
    width: 100%;
    height: 100%;
    display: block;
  }
  /*商品信息盒子*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box{
    padding-left: 90px;
  }
  /*名字*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box .name{
    height: 30px;
    line-height: 15px;
    font-size: 13px;
    overflow: hidden;
    display: block;
  }
  /*价格*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box .price{
    margin-top: 5px;
  }
  /*操作盒子*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option{
    width: 100%;
    height: 24px;
    margin-top: 5px;
  }
  /*改变数量盒子*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option .change_box{
    float: left;
  }
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option .select-ipt{
    float: left;
    display: inline-block;
    width: 30px;
    height: 24px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  }
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option input{
    width: 32px;
    height: 24px;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    float: left;
  }

  main{
    margin-top: 45px;
    margin-bottom:50px;
  }
  main .imgBox{
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: white;
  }
  main .imgBox img{
    margin: 0 auto;
    display: block;
    width: 20%;
    height: 20%;
  }
  main .address{
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: white;
    color: #6d6d72;
  }
  main .address .img-zyy{
    float: left;
    width: 50px;
    height: 50px;
    background: url("../../static/imgs/sprites.png") -288px -45px;
  }
  main .address .address-zyy{
    padding: 10px 10px 0 10px;
    /*height: 60px;*/
    float: right;
    width: 85%;
  }
  main .order{
    color: #6d6d72;
    margin-top: 10px;
    background-color: white;
    padding: 10px;
  }
  main .order span{
    display: block;
  }
  footer{
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
  }
  footer .router{
    flex: 1;
    text-align: center;
    height: 45px;
    font-size: 16px;
    line-height: 45px;
    color: white;
  }
  footer .router:nth-child(1){
    background-color: #f0ad4e;
  }
  footer .router:nth-child(2){
    background-color: #ef4f4f;
  }
</style>
