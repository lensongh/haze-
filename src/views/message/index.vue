<template>
  <div>
    <div>
      
        <div class="mess-box">
            <h4>我要留言</h4>
            <div class="mess-username">
                <input type="text" v-model="value" >
            </div>
            <div class="mess-message">
              <van-cell-group>
                <van-field
                  v-model="message"
                  rows="2"
                  autosize
                  type="textarea"
                  maxlength="100"
                  placeholder="请输入留言"
                  show-word-limit
                />
              </van-cell-group>
            </div>
            <div class="mess-bottem">
                <span @click="resetmessage()">
                  重新留言
                </span>
                <span class="resd" @click="submitmessage()">
                  提交留言
                </span>
            </div>
        </div>
        <div class="mess-boxx">
            <div class="mess-boxx-top">
                <p>最近留言</p>
                <p>共<span>{{messcunturn}}</span>条</p>
            </div>
            <div v-for="(item,i) in messList" :key="i">
              <div class="mess-user">
                  <span>{{item.name}}</span>
                  <span>{{item.feedbackTime |formatTimer}}</span>
              </div>
              <div class="mess-cooder">
                  {{item.feedbackContent}}
              </div>
               <div class="mess-timer">
                  发表于 {{item.feedbackTime |formatTimer(1)}}
                 </div> 
            </div>
            
        </div>
       <!-- 分页s -->
       <div class="mo-sort222">

        <van-pagination 
          v-model="currentPage" 
          :page-count="pagecount"
          mode="simple" 
        
          @change='sortList'
        />
    </div>
    <!-- 分页e -->
    </div>
     <loading v-show="thisloading"></loading>
  </div>
</template>
<script>
import {feedbackList,addfeedback} from '@/api/index.js'
import { Toast } from 'vant';
export default {
  data() {
    return {
      value:'匿名',
      message:'',
      currentPage:1,
      pagecount:5,
      messList:[],
      messcunturn:'',
      Listparme:{
        page:1,
        pageSize:10
      },
       thisloading:true,
    }
  },
  created() {
    this.getfeedbackList();
  },
  methods: {  
    sortList(){
      this.Listparme.page = this.currentPage;
      this.getfeedbackList();    
    },
    resetmessage(){
        this.value = '匿名';
        this.message = ''
    },
    submitmessage(){
       if((this.value =='') ||  (this.message =='')){
          Toast.fail('名字和内容不能为空');
       }else{
          addfeedback({
              name:this.value,// 用户名
              feedbackContent:this.message,
              feedbackUserId:"0"
            }).then(res=>{
               Toast('评论成功');
              this.message = '',  
              this.Listparme.page = 1,
              this.getfeedbackList();
          }) 
       }
    },
    getfeedbackList(){
      feedbackList(this.Listparme).then(res=>{
          this.messcunturn = res.data.total;
           this.pagecount = Math.ceil(res.data.total/this.Listparme.pageSize)
          this.messList = res.data.list;
          this.thisloading=false;
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.mess-username{
  // background-color: yellow;
  padding: 0 30px;
  input{
    width: 100%;
    border: 0;
    height: .7rem;
    background-color:#F8F8F8 ;
    border-radius: 5PX;
    padding: 20px 20px;
    font-size: .3rem;
  }
}

.mess-box{
  background-color: #fff;
  font-size: .36rem;
  margin: 20px 0;
  border-radius: 10PX;
  h4{
    text-align: left;
    font-weight: normal;
    line-height: 1rem;
    padding-top: .3rem;
    padding-left: .3rem;
  }
}
.mess-message{
  margin: 20px 0;
 border-radius:10PX;
 /deep/ textarea{
    background-color: #F8F8F8;
    border-radius: 5PX;
    min-height: 3rem;
    padding: 20px 20px;
  }
}
.mess-bottem{
    display: flex;
    justify-content : space-between;
    padding: 10px 30px;
    padding-bottom: 50px;
    span{
      background-color: #f5f5f5;
      border-radius: 5PX;
      color: #333333;
      padding: 16px 20px;
      font-size: .32rem;
      border: 1PX solid #EEEEEE;
    }
    .resd{
      background-color: #FF9900;
    border: 1px solid #FF9900;
    color: #FFFFFF;
    }
}
.mess-boxx{
  margin: 20px 0;
  padding: 0 20px  ;
  background-color: #fff;
  font-size: .3rem;
  border-radius: 10PX;
}
.mess-boxx-top{
  display: flex;
  justify-content : space-between;
  font-size: .36rem;
  line-height: 1rem;
  padding-top: .2rem;
  span{
    color: rgb(11, 190, 6);
  }
}
.mess-user{
  display: flex;
  justify-content : space-between;
 
  border-top: 1PX solid #e3e3e3;
  span{
    line-height: .8rem;
    font-size: .34rem;
    height: .8rem;
    overflow: hidden;
  }
}
.mess-cooder{
  margin-top: .2rem;
  line-height: .8rem;
  font-size: .3rem;
  text-align: left;
}
.mess-timer{
  padding-top: .2rem;
   line-height: .8rem;
  font-size: .3rem;
  text-align: left;
  padding-bottom: .2rem;
}
.mo-sort222{
  border-radius: 10PX;
    background-color: #fff;
    margin: 20px 0;
}
/deep/.van-pagination__item{
  color: #0bbe06;
}
/deep/.van-pagination__item:active{
  background-color:#0bbe06;
}
</style>