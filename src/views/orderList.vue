<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <router-link to="/user" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">我的订单</h1>
    </header>
    <main>
      <ul class="ulBox">
        <li class="liBox" v-for="item in orderList">

          <div class="orderId"><span>订单编号：{{item.orderId}}</span><span @touchend="del(item.orderId)" style="color: #ef4f4f">删除订单</span></div>

          <ul class="zyy_shop">
            <!--商品区块-->
            <li class="zyy_shop_con" v-for="i in item.goodsList">
              <!--商品信息-->
              <div class="con_product clearfix">
                <!--图片-->
                <a href="javascript:;" class="con_product_img"><img v-bind:src="'../../static/imgs/goodslist/'+ i.productImage" v-bind:alt="i.productName"></a>
                <!--商品详细信息-->
                <div class="con_product_box">
                  <!--名字-->
                  <a href="" class="name">
                    {{i.productName}}
                  </a>
                  <!--价格-->
                  <p class="price">{{(i.salePrice*i.productNum)| currency('￥')}}</p>
                  <!--操作-->
                  <div class="option clearfix">
                    <!--选择数量-->
                    <div class="change_box">
                      <span class="select-ipt">×{{i.productNum}}</span>
                    </div>
                  </div>
                </div>
              </div>

            </li>
          </ul>

          <div class="totalPrice">
            <router-link :to="'/orderSuccess?orderId='+ item.orderId" style="color: orange">查看订单详情</router-link>
            <span>总计：{{item.orderTotal | currency('￥')}}</span>
          </div>

        </li>
      </ul>
    </main>

    <model v-show="mdShow" class="model">
      <p slot="message">
        尊敬的用户，确定要删除吗？
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="cancel" @touchend="mdShow=false">取消</a>
        <a href="javascript:;" class="submit" @touchend="delOrder">确定</a>
      </div>
    </model>
  </div>
</template>

<script>
  import  model from './../components/model.vue';
  import axios from 'axios';
    export default {
      data(){
        return{
          orderList:[],
          mdShow:false,
          orderId:''
        }
      },
      components:{
        model
      },
      mounted(){
        this.getOrderList();
      },
      methods:{
        getOrderList(){
          var _this = this;
          axios.get("/api/users/orderList").then((response)=>{
            let res = response.data;
            _this.orderList = res.result;
          })
        },
        del(orderId){
          this.orderId = orderId;
          this.mdShow = true;
        },
        delOrder(){
          var _this = this;
          axios.post("/api/users/delOrder",{
            orderId:_this.orderId
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              _this.mdShow = false;
              _this.getOrderList();
            }
          })
        }
      }
    }
</script>

<style scoped>
  main{
    margin-top: 45px;
  }
  main .orderId{
    padding:10px;
    background-color: white;
  }
  main .orderId span:nth-child(2){
    margin-left: 50px;
  }
  main .liBox{
    margin-top:10px;
  }
  main .totalPrice{
    background-color: white;
    border-top: 1px solid #e0e0e0;
    padding-top:5px;
    padding-bottom: 5px;
    padding-left: 5px;
  }
  main .totalPrice span{
    color:#ef4f4f;
    margin-left: 130px;
  }
  .zyy_shop .zyy_shop_con{
    border-top: 1px solid #e0e0e0;
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
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option .change_box_left{
    width: 32px;
    height: 24px;
    border: 1px solid #e0e0e0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    display: block;
    float: left;
    text-align: center;
  }
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option input{
    width: 32px;
    height: 24px;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    float: left;
  }
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option .change_box_right{
    width: 32px;
    height: 24px;
    border: 1px solid #e0e0e0;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    display: block;
    float: left;
    text-align: center;
  }
</style>
