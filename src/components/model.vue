<template>
  <!-- 弹出框 -->
  <div class="zyy_win" name="zyy_win">

    <div class="zyy_win_box jumpIn">
      <div class="zyy_win_box_text">
        <slot name="message"></slot>
      </div>
      <div class="zyy_btn_box clearfix">
        <slot name="btnGroup"></slot>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name: "model",
      props:["mdShow"],
      methods:{
        // closeModal(){
        //   this.$emit("close");
        // }
      }
    }
</script>

<style scoped>
  /*弹出层*/

  .zyy_win{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 1001;
  }
  .zyy_win .zyy_win_box{
    width: 85%;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin:0 auto;
    margin-top: 40%;
    padding:0 5%;
  }
  .zyy_win .zyy_win_box .zyy_win_box_text{
    line-height: 75px;
    color: #666;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
  }
  .zyy_win .zyy_win_box .zyy_btn_box{
    font-size: 15px;
    margin-bottom: 10px;
  }
  .zyy_win .zyy_win_box .zyy_btn_box .cancel{
    width: 45%;
    height:36px;
    float: left;
    margin-right: 10%;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #888;
    text-align: center;
    line-height: 36px;
  }
  .zyy_win .zyy_win_box .zyy_btn_box .submit{
    width: 45%;
    height:36px;
    float: left;
    background: #d8505c;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 36px;
  }

  @-webkit-keyframes jumpIn {
    0%{
      opacity: 0;
      transform: translateY(-2000px);
      -webkit-transform: translateY(-2000px);
    }
    60%{
      opacity: 0.8;
      transform: translateY(30px);
      -webkit-transform: translateY(30px);
    }
    75%{
      opacity: 1;
      transform: translateY(-10px);
      -webkit-transform: translateY(-10px);
    }
    90%{
      transform: translateY(5px);
      -webkit-transform: translateY(5px);
    }
    100%{
      opacity: 1;
      transform: none;
      -webkit-transform: none;
    }
  }
  .jumpIn{
    animation: jumpIn 1s ease;
  }
  @-webkit-keyframes jumpOut {
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
      transform: translateY(-1000px);
      -webkit-transform: translateY(-1000px);
    }
  }
  .jumpOut{
    animation: jumpOut 0.5s ease;
  }
</style>
