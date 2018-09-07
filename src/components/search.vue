<template>
    <div>
      <header class="zyy_header">
        <div class="zyy_header_box">
          <a href="javascript:;" class="zyy_logo"></a>
          <form action="javascript:;">
            <span class="icon_search"></span>
            <!-- 这样可以调出搜索按钮 -->
            <input v-model.trim="goodsName" autofocus="autofocus" type="search" placeholder="提示"/>
          </form>
          <span class="login" @touchend="search">搜索</span>
        </div>
      </header>

      <ul class="searchList" >
        <li v-for="item in searchList">
          <router-link v-bind="{to:'/goods/'+item.productId}">
            <div class="imgBox"><img v-lazy="'../../static/imgs/goodslist/'+item.productImage" :src="'../../static/imgs/goodslist/'+item.productImage" alt=""></div>
            <div class="goodsInfo">
                <span class="info">
                  {{item.productName}}    风萧萧兮易水寒，壮士一去兮不复还。风萧萧兮易水寒，壮士一去兮不复还。
                </span>
              <span class="goodsPrice">{{item.salePrice| currency('￥')}}</span>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="busy" v-show="isShow">对不起，平台暂无此商品</div>
      <div class="busy">已加载全部内容</div>

      <Footer></Footer>
    </div>
</template>

<script>
  import Footer from './footer.vue';
  import axios from 'axios';
    export default {
      data(){
        return{
          searchList:[],
          goodsName:'',
          isShow:false
        }
      },
      components:{
        Footer
      },
      mounted(){

      },
      methods:{
        search(){
          var _this = this;
          axios.post("/api/goods/searchGoods",{
            goodsName:_this.goodsName
          }).then((response)=>{
            let res = response.data;
            _this.searchList = res.result;
            if(_this.searchList.length == 0){
              _this.isShow = true;
            }else {
              _this.isShow = false;
            }
          });
          _this.goodsName = '';
        }
      }
    }
</script>

<style scoped>
  .busy{
    color: #cccccc;
    text-align: center;
  }
  .login{
    z-index: 10;
  }
  header{
    background-color: rgba(0,0,0,0.3);
  }
  header input{
    border: 1px solid white;
  }
  .zyy_header form {
    width: 80%;
    height: 40px;
    margin-right: 55px;
    padding-right: 0px;
    position: relative;
  }
  .zyy_header form input {
    width: 100%;
    height: 30px;
    border-radius: 15px;
    margin-top: 5px;
  }
  .searchList{
    margin-top: 40px;
    margin-bottom: 51px;
  }
  .searchList li{
    width: 100%;
    overflow: auto;
    height:140px;
    margin-top: 15px;
    position: relative;
    overflow: hidden;
  }
  .searchList li .imgBox{
    float: left;
    width: 34%;
    height: 120px;
  }
  .searchList li .imgBox img{
    width: 110px;
    height: 110px;
  }
  .searchList li .goodsInfo{
    float: left;
    width: 65%;
    padding:10px;
    border-top: 1px solid #ccc;
  }
  .searchList li .goodsInfo .goodsPrice {
    display: block;
    color: red;
    font-size: 20px;
    padding-top: 15px;
  }
</style>
