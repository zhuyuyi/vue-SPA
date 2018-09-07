<template>
    <div>
      <header class="mui-bar mui-bar-nav">
        <router-link to="/home" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" v-show="!isLogined"></router-link>
        <span class="sessionClass">{{nickname}}</span>
        <h1 class="mui-title">购物车</h1>
        <router-link to="/login" class="login" v-show="!isLogined">登录</router-link>
        <span class="login" v-show="isLogined" @touchend="mdLogout = true">T_T</span>
      </header>
      <div class="zyy_safeTip">
        <p>您在安全购物环境中，请放心购物</p>
      </div>

      <ul class="zyy_shop" style="padding-bottom: 100px">
          <!--商品区块-->
          <li class="zyy_shop_con" v-for="item in cartList">
            <div class="con_check">
              <div class="zyy_check_box" v-bind:class="{'checked':item.checked == '1'}" @touchend="editCart('checked',item)"></div>
            </div>
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
                    <span class="change_box_left" @touchend="editCart('minu',item)">-</span>
                    <span class="select-ipt">{{item.productNum}}</span>
                    <span class="change_box_right" @touchend="editCart('add',item)">+</span>
                  </div>
                  <!--删除按钮-->
                  <div class="delete_box" @touchend="delCartConfirm(item.productId)">
                    <div class="delete_box_top"></div>
                    <div class="delete_box_bot"></div>
                  </div>
                </div>
              </div>
            </div>

          </li>
      </ul>
      <!-- 金额订单 -->
      <div class="zyy_amount">
        <div class="amount_check">
          <div class="zyy_check_box_all" v-bind:class="{'checked':checkAllFlag}" @touchend="toggleCheckAll"></div>
          <span>全选</span>
        </div>
        <div class="amount_info">
          <p class="sum" id="sum">合计：{{totalPrice | currency('￥')}}</p>
        </div>
        <a href="javascript:;" class="amount_submit" v-bind:class="{'btn-dis':checkedCount==0}" @touchend="checkOut">
          选择地址(<span id="span_amount_submit">{{checkedCount}}</span>)
        </a>
      </div>

      <model v-show="mdConfirm" >
        <p slot="message">
          尊敬的用户，确定要删除这件商品吗！
        </p>
        <div slot="btnGroup">
          <a href="javascript:;" class="cancel" @touchend="mdConfirm=false">取消</a>
          <a class="submit" @touchend="delGoods">确定</a>
        </div>
      </model>

      <model v-show="mdLogin" >
        <p slot="message">
          客官，您还未登录呢，请先登录哟！
        </p>
        <div slot="btnGroup">
          <router-link class="cancel" to="/home">取消</router-link>
          <router-link class="submit" to="/login">去登录</router-link>
        </div>
      </model>

      <Footer></Footer>
      <router-view></router-view>
    </div>
</template>

<script>
  // import {currency} from './../assets/currency'; 在main.js中我定义了全局过滤器
  import Footer from './footer.vue';
  import  model from './../components/model.vue';
  import axios from 'axios';
    export default {
      name: "shopcart",
      data(){
        return {
          mdConfirm:false, // model框
          isLogined:false,
          nickname:'',
          cartList:[],
          productId:'',
          mdLogin:false
        }
      },
      components:{
        model,
        Footer
      },
      computed:{
        checkAllFlag(){
          if(this.nickname != ''){
            return this.checkedCount == this.cartList.length;
          }else{
            return;
          }
        },
        checkedCount(){
          if(this.nickname != ''){
            var i = 0;
            this.cartList.forEach((item)=>{
              if(item.checked == '1'){
                i++;
              }
            });
            return i;
          }else {
            return;
          }
        },
        totalPrice(){
          if(this.nickname != ''){
            var money = 0;
            this.cartList.forEach((item)=>{
              if(item.checked == '1'){
                money += parseFloat(item.salePrice)*parseInt(item.productNum);
              }
            });
            return money;
          }else {
            return;
          }
        }
      },
      mounted(){
        this.checklogin();
        this.init();
      },
      methods:{
        delGoods(){ // 删除商品
          var _this = this;
          axios.post("/api/users/cartDel",{
            productId:_this.productId
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0') {
              this.mdConfirm = false;
              this.init();
              this.$store.commit("updateCartCount", -1)
            }
          });
        },
        delCartConfirm(productId){ // 删除商品
          this.productId = productId;
          this.mdConfirm = true;
        },
        editCart(flag,item){  // 商品实时修改
          if(flag == 'add'){
            item.productNum++;
          }else if(flag == 'minu'){
            if(item.productNum <= 1){
              return;
            }
            item.productNum--;
          }else {
            item.checked = item.checked =="1"?'0':'1';
          }
          axios.post("/api/users/cartEdit",{
            productId:item.productId,
            productNum:item.productNum,
            checked:item.checked
          }).then((response)=>{
            let res = response.data;
          })
        },
        toggleCheckAll(){ // 全选
          var flag = !this.checkAllFlag;
          this.cartList.forEach((item)=>{
            item.checked = flag?'1':'0';
          });
          axios.post("/api/users/editCheckAll",{
            checkAll:flag
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              // console.log('suc');  测试成功！
            }
          })
        },
        checklogin(){ // 判断登录状态
            var _this = this;
            axios.get("/api/users/checkLogin").then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                _this.nickname = res.result;
                _this.isLogined = true;
              }else {
                _this.mdLogin = true;
              }
            });

        },
        init(){  // 初始化购物车商品
          var _this = this;
          axios.get("/api/users/cartList").then((response)=>{
            let res = response.data;
            _this.cartList = res.result;
          })
        },
        checkOut(){
          if(this.checkedCount > 0){
            this.$router.push({
              path:"/addresses"
            });
          }else {
            return;
          }
        }
      }
    }
</script>

<style scoped>
  .btn-dis{
    background: #cccccc !important;
  }
  .login{
    position: absolute;
    right: 10px;
    top:10px;
  }
  .sessionClass{
    display: inline-block;
    padding-top: 10px;
  }
  body{
    background: #f5f5f5;
  }
  /*安全提示*/
  .zyy_safeTip{
    width: 100%;
    height: 34px;
    line-height: 34px;
    font-size: 10px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 45px;
    background: #fff;
  }
  .zyy_safeTip p{
    padding-left: 25px;
    width: 240px;
    display: inline-block;
    position: relative;
  }
  .zyy_safeTip p::before{
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    background: url("../../static/imgs/safe_icon.png") no-repeat;
    background-size: 18px 18px;
    position: absolute;
    left: 0;
    top: 8px;
  }
  /*公用复选框*/
  .zyy_check_box{
    height: 20px;
    width: 20px;
    display: block;
    background: url("../../static/imgs/shop-icon.png") no-repeat;
    background-size: 50px 100px;
    background-position: 0 0;
  }
  .zyy_check_box_all{
    height: 20px;
    width: 20px;
    display: block;
    background: url("../../static/imgs/shop-icon.png") no-repeat;
    background-size: 50px 100px;
    background-position: 0 0;
  }
  /* 是否选中 */
  .checked{
    background-position: -25px 0;
  }
  .zyy_shop .zyy_shop_con{
    border-bottom: 1px solid #e0e0e0;
    position: relative;
  }
  .zyy_shop .zyy_shop_con .con_check{
    position: absolute;
    width: 40px;
    top: 0;
    left: 0;
  }
  .zyy_shop .zyy_shop_con .con_check .zyy_check_box{
    position: absolute;
    top: 20px;
    left: 10px;
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
  /*删除盒子*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option .delete_box{
    float: right;
  }
  /*删除盒子上*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option .delete_box .delete_box_top{
    width: 20px;
    height: 5px;
    background: url("../../static/imgs/delete_up.png") no-repeat;
    background-size: 20px 5px;
    margin-left: -1px;
  }
  /*删除盒子下*/
  .zyy_shop .zyy_shop_con .con_product .con_product_box .option .delete_box .delete_box_bot{
    width: 18px;
    height: 18px;
    background: url("../../static/imgs/delete_down.png") no-repeat;
    background-size: 18px 18px;
    margin-top: -3px;
  }
  /*金额操作*/
  .zyy_amount{
    position: fixed;
    left: 0;
    bottom: 50px;
    height:50px;
    background: rgba(0,0,0,0.6);
    width: 100%;
  }
  /*金额操作的盒子*/
  .zyy_amount .amount_check{
    position: absolute;
    width: 80px;
    line-height: 50px;
  }
  .zyy_amount .amount_check .zyy_check_box_all{
    position: absolute;
    top: 17px;
    left: 10px;
  }
  /*全选*/
  .zyy_amount .amount_check span{
    padding-left: 35px;
    color: #fff;
  }
  /*金额信息*/
  .zyy_amount .amount_info{
    padding-left: 70px;
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
