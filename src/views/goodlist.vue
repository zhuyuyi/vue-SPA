<template>
    <div>
      <header class="mui-bar mui-bar-nav">
        <router-link to="/home" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <h1 class="mui-title">商品列表页</h1>
      </header>
      <section>
        <span @touchend="setPriceFilter('all')"  v-bind:class="{'active':priceChecked == 'all'}">显示所有</span>
        <span @touchend="setPriceFilter(index)" v-for="(price,index) in priceFilter" v-bind:class="{'active':priceChecked==index}">{{price.startPrice}}-{{price.endPrice}}</span>

        <span @touchend="changeClass">切换样式</span>
        <p style="margin-top: 15px; color:#bbb;transition: all .3s ease-in-out;" @touchend="sortGoods" v-bind:class="{'sortUpDown':!sortFlag}">↑^-^↓</p>
      </section>
      <main>
        <ul class="goodsList" >
          <li v-for="item in goodsList" :class="{'zyy-li':isChangeClass == true}">
            <router-link v-bind="{to:'/goods/'+item.productId}">
              <div class="imgBox" :class="{'zyy-imgBox':isChangeClass == true}"><img :class="{'zyy-img':isChangeClass == true}" v-lazy="'../../static/imgs/goodslist/'+item.productImage" :src="'../../static/imgs/goodslist/'+item.productImage" alt=""></div>
              <div class="goodsInfo" :class="{'zyy-goodsInfo':isChangeClass == true}">
                <span class="info" :class="{'zyy-info':isChangeClass == true}">
                  {{item.productName}}    风萧萧兮易水寒，壮士一去兮不复还。风萧萧兮易水寒，壮士一去兮不复还。
                </span>
                <span class="goodsPrice">{{item.salePrice| currency('￥')}}</span>
              </div>
            </router-link>
          </li>
        </ul>
        <div v-show="busy" class="busy">已加载全部内容</div>
        <div class="view-more-normal"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="20">
          <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">

        </div>
      </main>

      <Footer></Footer>

      <router-view></router-view>
    </div>
</template>

<script>
  import Footer from './../components/footer.vue';
  import axios from 'axios';
    export default {
      name: "goodlist",
      data(){
        return{
          goodsList:[],
          sortFlag:true,
          loading:false,
          page:1,
          pageSize:8,
          busy:true,
          isChangeClass:false,
          priceFilter:[
            {
              startPrice:'0',
              endPrice:'3000'
            },
            {
              startPrice:'3000',
              endPrice:'6000'
            }
          ],
          priceChecked:'all'
        }
      },
      components:{
        Footer
      },
      mounted:function () {
        this.getGoodsList();
      },
      methods:{
        getGoodsList(flag){
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceChecked
          };
          this.loading = true;
          axios.get('/api/goods/list',{params:param}).then((result)=>{
            var res = result.data;
            this.loading = false;
            if(res.status == "0") {
              if(flag){
                this.goodsList = this.goodsList.concat(res.result.list);
                if(res.result.count == 0){
                  this.busy = true;
                }else{
                  this.busy = false;
                }
              }else {
                this.goodsList = res.result.list;
                this.busy = false;
              }
            }else {
              this.goodsList = [];
            }
          })
        },
        setPriceFilter:function (index) {
          this.priceChecked = index;
          this.page = 1;
          this.getGoodsList();
        },
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodsList();
        },
        loadMore(){
          setTimeout(()=>{
            this.page++;
            this.getGoodsList(true);
          },500)
        },
        changeClass(){
          this.isChangeClass = !this.isChangeClass;
        }
      }
    }
</script>

<style scoped>
  .busy{
    color: #cccccc;
    text-align: center;
  }
  .active{
    color: red;
  }
  header input{
    border: 1px solid white;
  }
  section{
    margin-top: 55px;
    text-align: center;
  }
  section span{
    font-size: 16px;
    padding-right: 15px;
    color:#bbb;
  }
  .view-more-normal{
    margin-bottom: 30px;
    height: 50px;
    text-align: center;
  }
  main .goodsList li{
    width: 100%;
    overflow: auto;
    height:140px;
    margin-top: 15px;
    position: relative;
    overflow: hidden;
  }
  main .goodsList li .imgBox{
    float: left;
    width: 34%;
    height: 120px;
  }
  main .goodsList li .imgBox img{
    width: 110px;
    height: 110px;
  }
  main .goodsList li .goodsInfo{
    float: left;
    width: 65%;
    padding:10px;
    border-top: 1px solid #ccc;
  }
  main .goodsList li .goodsInfo .goodsPrice {
    display: block;
    color: red;
    font-size: 20px;
    padding-top: 15px;
  }
  .sortUpDown{
    transform: rotate(180deg);
    transition: all .3s ease-in-out;
  }
  .zyy-li{
    width: 49% !important;
    overflow: auto;
    height:auto !important;
    margin-top: 5px !important;
    position: relative;
    overflow: hidden;
    display: inline-block !important;
  }
  .zyy-li:nth-child(2n+1){
    margin-right: 5px;
  }
  .zyy-imgBox{
    clear: both !important;
    width: 100% !important;
    height: 180px !important;
  }
  .zyy-img{
    display: inline-block;
    width: 100% !important;
    height: 100%  !important;
  }
  .zyy-goodsInfo{
    clear: both;
    width: auto !important;
    padding:10px;
    border-top: 1px solid #ccc;
  }
</style>
