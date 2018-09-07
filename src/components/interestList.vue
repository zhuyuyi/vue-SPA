<template>
    <div>
      <header class="mui-bar mui-bar-nav">
        <router-link to="/user" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <h1 class="mui-title">我的关注</h1>
      </header>

      <main>
        <ul class="interestList" >
          <li v-for="item in interestList">
            <div class="qxgz" @touchend="adelInterest(item.productId)">取消关注</div>
            <router-link v-bind="{to:'/goods/'+item.productId}">
              <div class="imgBox"><img v-lazy="'../../static/imgs/goodslist/'+item.productImage" :src="'../../static/imgs/goodslist/'+item.productImage" alt=""></div>
              <div class="goodsInfo" >
                <span class="info">
                  {{item.productName}}    风萧萧兮易水寒，壮士一去兮不复还。风萧萧兮易水寒，壮士一去兮不复还。
                </span>
                <span class="goodsPrice">{{item.salePrice| currency('￥')}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </main>


    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      data(){
        return{
          interestList:[],
          userName: ''
        }
      } ,
      mounted(){
        this.checklogin();
        this.getInterestList();
      },
      methods:{
        getInterestList(){
          var _this = this;
          axios.get("/api/goods/interestList").then((result)=>{
            let res = result.data;
            _this.interestList = res.result;
          })
        },
        adelInterest(productId){
          var _this = this;
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
          });
          _this.getInterestList();
        },
        checklogin(){
          var _this = this;
          axios.get("/api/users/checkLogin").then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              _this.userName = res.result;
            }else {
              return;
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
  main .interestList li{
    width: 100%;
    overflow: hidden;
    height:180px;
    position: relative;
  }
  main .interestList li .imgBox{
    float: left;
    width: 34%;
    height: 120px;
  }
  main .interestList li .imgBox img{
    width: 110px;
    height: 110px;
  }
  main .interestList li .goodsInfo{
    float: left;
    width: 65%;
    padding:10px;
    border-top: 1px solid #ccc;
  }
  main .interestList li .goodsInfo .goodsPrice {
    display: block;
    color: red;
    font-size: 20px;
    padding-top: 15px;
  }
  .qxgz{
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 50px;
    margin: 10px 200px 10px 10px;
    color: #bbb;
  }
</style>
