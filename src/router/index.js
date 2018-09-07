import Vue from 'vue'
import Router from 'vue-router'

import login from './../components/login.vue';
import register from './../components/register.vue';
import home from './../components/home.vue';
import shopcart from './../components/shopcart.vue';
import user from './../components/user.vue';
import goodslist from '../views/goodlist.vue';
import goodsdetail from '../views/goodsdetail';
import orderList from '../views/orderList';
import addresses from './../components/address';
import changePwd from './../components/changePwd';
import interestList from './../components/interestList';
import orderConfirm from './../components/orderConfirm';
import orderSuccess from './../components/orderSuccess';
import cummunity from './../components/cummunity';
import search from './../components/search';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path: '/register',
      name: 'register',
      component:register
    },
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '*',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component:home
    },
    {
      path: '/goods',
      name: 'goods',
      component:goodslist
    },
    {
      path: '/Cart',
      name: 'Cart',
      component:shopcart
    },
    {
      path: '/user',
      name: 'user',
      component:user
    },
    {
      path: '/goods/:id',
      name: 'goodsdetail',
      component:goodsdetail
    },
    {
      path: '/addresses',
      name: 'addresses',
      component:addresses
    },
    {
      path: '/changePwd',
      name: 'changePwd',
      component:changePwd
    },
    {
      path: '/user/interestList',
      name: 'interestList',
      component:interestList
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component:orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component:orderSuccess
    },
    {
      path: '/user/orderList',
      name: 'orderList',
      component:orderList
    },
    {
      path: '/user/cummunity',
      name: 'cummunity',
      component:cummunity
    },
    {
      path: '/search',
      name: 'search',
      component:search
    }
  ]
})
