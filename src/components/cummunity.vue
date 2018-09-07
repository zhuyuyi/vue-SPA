<template>
    <div>
      <header class="mui-bar mui-bar-nav">
        <router-link to="/user" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
        <span class="sessionClass">{{nickname}}</span>
        <h1 class="mui-title">留言板</h1>
      </header>
      
      <main>
        <div class="submit"><a href="javascript:;" @touchend="addTopic">发布</a></div>
        <textarea v-model.trim="topic" name="" id="" cols="30" rows="10" autofocus="autofocus" placeholder="您想说些什么呢？（内容不得为空哟）"></textarea>
      </main>

      <ul class="topicBox">
        <li class="topicList" v-for="item in topicList">
          <div class="name"><span>用户 {{item.userName}} 说：</span></div>
          <div class="topic"><span>{{item.topic[0]}}</span></div>
          <div class="time"><span>{{item.date}}</span></div>
          <div class="DZ" @touchend="dianZan(item.Id,item.zan)">点赞({{item.zan}})</div>
        </li>
      </ul>
      <div v-show="busy" class="busy">已加载全部内容</div>


    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      data(){
        return{
          nickname:'',
          topic:'',
          topicList:[],
          zan:0,
          sortFlag:true,
          busy:true
        }
      },
      components:{

      },
      mounted(){
        this.nickname = this.$route.query.userName;
        this.getTopic();
      },
      methods:{
        addTopic(){
          var _this = this;
          if(_this.topic!=''){
            axios.post("/api/topic/addTopic",{
              userName:_this.nickname,
              topic:_this.topic
            }).then((response)=>{
              let res = response.data;
            });
            _this.topic = '';
            _this.getTopic();
          }else {
            return;
          }
        },
        getTopic(flag){
          var _this = this;
          var param = {
            sort:this.sortFlag?-1:1,
          };
          axios.get("/api/topic/TopicList",{params:param}).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
                this.topicList = res.result.list;
            } else {
              this.topicList = [];
            }
          })
        },

        dianZan(Id,zan){
          var _this = this;
          zan++;
          axios.post("/api/topic/Zan",{
            Id:Id,
            zan:zan
          }).then((response)=>{
            let res = response.data;
            _this.getTopic();
          })
        }
      }
    }
</script>

<style scoped>
  .view-more-normal{
    margin-bottom: 1px;
    height: 30px;
    text-align: center;
  }
  .busy{
    color: #cccccc;
    text-align: center;
  }
  .topicBox .topicList{
    background: white;
    border-top: 1px solid #eee;
    margin-bottom: 5px;
  }
  .topicBox .topicList::after{
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }
  .topicBox .topicList .name{
    padding: 10px;
    color: #929292;
    border-bottom: 1px solid #eee;
  }
  .topicBox .topicList .topic{
    padding: 10px;
    font-size: 18px;
  }
  .topicBox .topicList .time{
    border-bottom: 1px solid #eee;
    font-size: 12px;
    color: #ccc;
    text-align: right;
    padding-right: 10px;
  }
  .topicBox .topicList .DZ{
    float: right;
    padding: 5px;
    color: #ef4f4f;
  }
  .sessionClass{
    float: right;
    padding-top: 10px;
  }
  main{
    margin-top:55px ;
  }
  main .submit{
    background-color: white;
    font-size: 18px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-right: 10px;
    overflow: auto;
    border-bottom: 1px solid #eee;
  }
  main .submit a{
    float: right;
    display: inline-block;
    background-color: #ef4f4f;
    width: 50px;
    line-height: 25px;
    height: 25px;
    border-radius: 3px;
    text-align: center;
    color: white;
  }
</style>
