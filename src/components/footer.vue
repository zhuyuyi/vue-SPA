<template>
  <div class="">
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home" v-on:touchend.native="isClassShow(1)">
        <span class="mui-icon mui-icon-home" v-bind:class="{zyy_active:isChecked == 1}"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/goods" v-on:touchend.native="isClassShow(2)">
        <span class="mui-icon mui-icon-email" v-bind:class="{zyy_active:isChecked == 2}"></span>
        <span class="mui-tab-label">商品列表</span>
      </router-link>
      <router-link class="mui-tab-item" to="/Cart" v-on:touchend.native="isClassShow(3)">
				<span class="mui-icon mui-icon-contact" v-bind:class="{zyy_active:isChecked == 3}">
					<span class="mui-badge" v-if="cartCount>0">{{cartCount}}</span>
				</span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/user" v-on:touchend.native="isClassShow(4)">
        <span class="mui-icon mui-icon-gear" v-bind:class="{zyy_active:isChecked == 4}"></span>
        <span class="mui-tab-label">个人中心</span>
      </router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  export default {
    name: "",
    data(){
      return {
        isChecked:1,
        cartList:[],
        length:''
      }
    },
    created(){

    },
    computed:{
      ...mapState(['cartCount']) // vuex中辅助的函数相当于下面的形式
      // cartCount(){
      //   return thiss.$store.state.cartCount;
      // }
    },
    mounted(){
      this.isRouter();
      this.init();
    },
    methods:{
      isClassShow: function (index) {
        this.isChecked = index;
        // console.log(this.$route.name);
      },
      isRouter:function () {
        if(this.$route.name == 'goods'){
          this.isChecked = 2;
        }
        else if (this.$route.name == 'Cart'){
          this.isChecked = 3;
        }
        else if (this.$route.name == 'user'){
          this.isChecked = 4;
        }else {
          this.isChecked = 1;
        }
      },
      init(){
        var _this = this;
        axios.get("/api/users/cartList").then((response)=>{
          let res = response.data;
          this.$store.commit("initCartCount",res.result.length);
        })
      },
    }
  }
</script>

<style scoped>
  .zyy_active{
    color: red;
  }
</style>
