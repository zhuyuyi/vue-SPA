<template>
    <div>
      <header class="mui-bar mui-bar-nav">
        <router-link to="/addresses" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <h1 class="mui-title">确认订单</h1>
      </header>
      <main>
        <ul class="zyy_shop">
          <li v-for="item in orderList" v-if="item.checked == '1'" class="zyy_shop_con">
            <!--商品信息-->
            <div class="con_product clearfix">
              <!--图片-->
              <a href="javascript:;" class="con_product_img"><img v-bind:src="'static/imgs/goodslist/'+ item.productImage" v-bind:alt="item.productName"></a>
              <!--商品详细信息-->
              <div class="con_product_box">
                <!--图片-->
                <a href="" class="name">
                  {{item.productName}}
                </a>
                <!--价格-->
                <p class="price">{{(item.salePrice*item.productNum)| currency('￥')}}</p>
                <!--操作-->
                <div class="option clearfix">
                  <!--选择数量-->
                  <div class="change_box">
                    <span class="select-ipt">×{{item.productNum}}</span>
                  </div>

                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>
      <!-- 金额订单 -->
      <div class="zyy_amount">
        <div class="amount_info">
          <p class="sum" id="sum">折扣：￥{{Discount}} | 合计：{{orderTotal|currency('￥')}}</p>

        </div>
        <a href="javascript:;" class="amount_submit" @touchend="payMent">
          提交订单(<span id="span_amount_submit">{{orderNum}}</span>)
        </a>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      data(){
        return{
          orderList:[],
          Discount:100,
          orderTotal:0,
          subTotal:0,
          orderNum:0
        }
      },
      mounted(){
        this.init();
      },
      methods:{
        init(){
          var _this = this;
          axios.get("/api/users/cartList").then((result)=>{
            let res = result.data;
            _this.orderList = res.result;
            _this.orderList.forEach((item)=>{
              if(item.checked== '1'){
                _this.subTotal += item.salePrice*item.productNum;
                _this.orderNum++;
              }
            });
            _this.orderTotal = _this.subTotal - _this.Discount;
          })
        },
        payMent(){
          var _this = this;
          var addressId = this.$route.query.addressId;
          axios.post('/api/users/payMent',{
            addressId:addressId,
            orderTotal:_this.orderTotal
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              this.$router.push({
                path:'/orderSuccess?orderId='+res.result.orderId
              })
            }
          })
        }
      }
    }
</script>

<style scoped>
  .zyy_shop{
    margin-top: 45px;
  }
  /*商品大盒子*/
  .zyy_shop .zyy_shop_con .con_product{
    margin-top: 10px;
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

  /*金额操作*/
  .zyy_amount{
    position: fixed;
    left: 0;
    bottom: 0;
    height:50px;
    background: rgba(0,0,0,0.6);
    width: 100%;
  }
  /*金额信息*/
  .zyy_amount .amount_info{
    padding-left: 10px;
    padding-right: 80px;
    height: 50px;
  }
  .zyy_amount .amount_info p{
    color: #fff;
  }
  /*金额信息*/
  .zyy_amount .amount_info .sum{
    font-size: 16px;
    margin-top: 15px;
  }
  /*结算按钮*/
  .zyy_amount .amount_submit{
    height: 50px;
    width: 120px;
    padding: 0 2px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background: #d8505c;
    font-size: 18px;
    position: absolute;
    top: 0;
    right: 0;
  }
  /*结算按钮数量*/
  .zyy_amount .amount_submit span{
    font-size: 12px;
  }
</style>
