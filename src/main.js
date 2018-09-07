// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload';
import mintui from 'mint-ui';
import infiniteScroll from 'vue-infinite-scroll';
import {currency} from './assets/currency';
import axios from 'axios';
import Vuex from 'vuex';
import '../static/mui/css/mui.css';
import '../static/css/base.css';
import '../static/css/home.css';
import 'mint-ui/lib/style.min.css';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    nickName:'',
    cartCount:0
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;
    }
  }
});

Vue.filter("currency",currency);
Vue.use(VueLazyLoad,{
  loading:'/static/loading-svg/loading-spinning-bubbles.svg'
});
Vue.use(mintui);
Vue.use(infiniteScroll);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
