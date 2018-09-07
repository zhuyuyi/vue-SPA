<template>
    <div class="layOut">
      <header class="mui-bar mui-bar-nav">
        <router-link to="/Cart" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <h1 class="mui-title">地址页</h1>
      </header>
      <ul class="address">
        <li v-for="(item,index) in addressList">
          <div class="con_check">
            <div class="zyy_check_box" v-bind:class="{'checked':checkIndex==index}" @touchend="setDef(item.addressId,index)"></div>
          </div>
          <div class="edit" @touchend="isAddressEdit(item.name,item.tel,item.postCode,item.streetName,item.addressId)"><span>编辑</span></div>
          <div class="name_tel">收件人：<span>{{item.name}}</span> &nbsp;&nbsp;&nbsp;电话：<span>{{item.tel}}</span></div>
          <div class="postCode">邮政编码：<span>{{item.postCode}}</span></div>
          <div class="street">地址：<span>{{item.streetName}}</span></div>

          <!--删除按钮-->
          <div class="delete_box" @touchend="mdDel = true;addressId = item.addressId">
            <div class="delete_box_top"></div>
            <div class="delete_box_bot"></div>
          </div>
        </li>
      </ul>

      <div class="zyy_amount">
        <a href="javascript:;" class="addAddress" @touchend="mdShowAdd=true;name='';tel='';postCode='';streetName=''">+新建收货地址</a>
        <a href="javascript:;" class="toOrder" :class="{'disabled':addressList.length < 1}" @touchend="gotoOrder">生成订单</a>
      </div>

      <model v-show="mdDel">
        <p slot="message">
          您真的要删掉这条地址吗？
        </p>
        <div slot="btnGroup">
          <a href="javascript:;" class="cancel" @touchend="mdDel=false">取消</a>
          <span class="submit" @touchend="delAddress(addressId)">确定</span>
        </div>
      </model>

      <model v-show="mdShowAdd">
        <div slot="message" class="mdShowEditBox">
          <p>新建收货地址</p>
          <div class="messageBox"><span>收件人名：</span><input type="text" placeholder="" v-model.trim="name"></div>
          <div class="messageBox"><span>电话号码：</span><input type="text" placeholder="" v-model.trim="tel"></div>
          <div class="messageBox"><span>邮政编码：</span><input type="text" placeholder="" v-model.trim="postCode"></div>
          <div class="messageBox"><span>详细地址：</span><input type="text" placeholder="如：南京审计大学" v-model.trim="streetName"></div>
          <div class="messageBox" v-show="isMessageNull"><span style="color:red">内容不得为空</span></div>
        </div>
        <div slot="btnGroup">
          <a href="javascript:;" class="cancel" @touchend="mdShowAdd=false,isMessageNull=false">取消</a>
          <span class="submit" @touchend="addAdd">确定</span>
        </div>
      </model>

      <model v-show="mdShowEdit">
        <div slot="message" class="mdShowEditBox">
          <p>新建收货地址</p>
          <div class="messageBox"><span>收件人名：</span><input type="text" placeholder="" v-model.trim="name"></div>
          <div class="messageBox"><span>电话号码：</span><input type="text" placeholder="" v-model.trim="tel"></div>
          <div class="messageBox"><span>邮政编码：</span><input type="text" placeholder="" v-model.trim="postCode"></div>
          <div class="messageBox"><span>详细地址：</span><input type="text" placeholder="" v-model.trim="streetName"></div>
          <div class="messageBox" v-show="isMessageNull"><span style="color:red">内容不得为空</span></div>
        </div>
        <div slot="btnGroup">
          <a href="javascript:;" class="cancel" @touchend="mdShowEdit=false,isMessageNull=false">取消</a>
          <span class="submit" @touchend="addressEdit">确定</span>
        </div>
      </model>
      <router-view></router-view>
    </div>
</template>

<script>
  import model from './model';
  import axios from 'axios';
    export default {
      data(){
        return{
          checkIndex:0,
          addressList: [],
          mdDel:false,
          addressId:'',
          selectedId:'0',
          mdShowAdd:false,
          mdShowEdit:false,
          isMessageNull:false,
          count:'',
          name:'',
          tel:'',
          streetName:'',
          postCode:'',
        }
      },
      components:{
        model
      },
      computed:{

      },
      mounted(){
        this.init();
      },
      methods:{
        init(){
          var _this = this;
          axios.get("/api/users/addressList").then((response)=>{
            let res = response.data;
            _this.count = res.result.length;
            _this.addressList = res.result;
          });
        },
        setDef(addressId,index){
          this.checkIndex = index;
          axios.post("/api/users/setDefault",{
            addressId:addressId
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              this.init();
            }
          });
          this.selectedId = addressId;
        },
        delAddress(addressId){
          axios.post("/api/users/delAddress",{
            addressId:addressId
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              this.mdDel = false;
              this.init();
            }else {
              return;
            }
          })
        },
        addAdd() {
          var _this = this;
          if (_this.name == '' || _this.tel == '' || this.streetName == '' || _this.postCode == '') {
            _this.isMessageNull = true;
          } else {
            axios.post('/api/users/addAddress', {
              addressId: _this.count,
              name: _this.name,
              tel: _this.tel,
              postCode: _this.postCode,
              streetName: _this.streetName
            }).then((response) => {
              let res = response.data;
              if (res.status == '0') {
                _this.init();
                _this.mdShowAdd = false;
              } else {
                return;
              }
            });
            _this.isMessageNull = true;
            _this.name = '', _this.tel = '', _this.streetName = '', _this.postCode = '', _this.count = '';
          }
        },
        isAddressEdit(name,tel,postCode,streetName,addressId){
          this.mdShowEdit = true;
          this.name = name,this.tel = tel,this.postCode = postCode,this.streetName = streetName,this.addressId = addressId;
        },
        addressEdit() {
          var _this = this;
          if (_this.name == '' || _this.tel == '' || this.streetName == '' || _this.postCode == '') {
            _this.isMessageNull = true;
          } else {
            axios.post('/api/users/addressEdit', {
              addressId: _this.addressId,
              name: _this.name,
              tel: _this.tel,
              postCode: _this.postCode,
              streetName: _this.streetName
            }).then((response) => {
              let res = response.data;
              if (res.status == '0') {
                _this.init();
              } else {
                return;
              }
            });
            _this.isMessageNull = false;
            this.mdShowEdit = false;
            this.name = '', this.tel = '', this.streetName = '', this.postCode = '', this.count = '';
          }
        },
        gotoOrder(){
          if(this.addressList.length > 0){
            this.$router.push({
              path:'/orderConfirm?addressId=' + this.selectedId
            })
          }else {
            return;
          }
        }

      }
    }
</script>

<style scoped>
  .disabled{
    background-color: #ccc !important;
  }
  .mdShowEditBox{
    padding-bottom: 30px;
  }
  .mdShowEditBox p{
    height: 40px;
  }
  .mdShowEditBox input{
    display: inline-block;
    width: 200px;
    margin-bottom: 0;
    height: 35px;
  }
  .mdShowEditBox .messageBox{
    height: 50px;
    width: 285px;
  }
  .layOut{
    height: 100%;
  }
  ul{
    margin-top: 48px;
  }
  ul li{
    background-color: white;
    overflow: hidden;
    padding: 8px;
    margin-bottom: 5px;
  }
  .name_tel,.postCode,.street{
    padding-left: 50px;
    font-size: 18px;
    color: #aaaaaa;
  }
  .name_tel span,.postCode span,.street span{
    font-size: 14px;
    color: #5a5a5a;
  }
  .edit{
    float: right;
  }
  .zyy_check_box{
    height: 20px;
    width: 20px;
    display: block;
    background: url("../../static/imgs/shop-icon.png") no-repeat;
    background-size: 50px 100px;
    background-position: 0 0;
  }
  .checked{
    background-position: -25px 0;
  }
  .delete_box{
    float: right;
  }
  .delete_box .delete_box_top{
    width: 20px;
    height: 5px;
    background: url("../../static/imgs/delete_up.png") no-repeat;
    background-size: 20px 5px;
    margin-left: -1px;
  }
  .delete_box .delete_box_bot{
    width: 18px;
    height: 18px;
    background: url("../../static/imgs/delete_down.png") no-repeat;
    background-size: 18px 18px;
    margin-top: -3px;
  }
  .zyy_amount{
    bottom: 0;
    position: absolute;
    width: 100%;
  }
  .zyy_amount .addAddress{
    width: 50%;
    float: left;
    background-color: orange;
    font-weight: bolder;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    color: white;
  }
  .zyy_amount .toOrder{
    float: right;
    height: 50px;
    background-color: #d8505c;
    width: 50%;
    color: white;
    font-weight: bolder;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
  }
</style>
