<template>
  <div>
    <van-nav-bar
      title="我的任务"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="miss-top">
        <h2>任务中心</h2>
        <div class="miss-topa">
          <span @click="pathInvitation()">
            <img src="../../common/img/Invitation.png" alt="">
            我的邀请</span>
          <span @click="pathStore()"><img src="../../common/img/store.png" alt="">兑换中心</span>
        </div>
        <div class="miss-top2">
            <div>
                <p>已邀请</p>
                <p>{{user.recommendCount}}人</p>
            </div>
            <div>
                <p>麻花币</p>
                <p>{{user.mbCount}}个</p>
            </div>
            <!-- <div>
                <p>签到</p>
                <p>已完成</p>
            </div> -->
        </div>
    </div>
    <div class="miss-mman">
        <div class="cl minss-ma" v-for="(item,i) in list" :key="i" v-show="item.task.id != 3">
            <img class="minss-ma-img" src="../../common/img/mission.png" alt="">
            <div class="minss-ma-text">
                <h5>{{item.task.taskName}}</h5>
                <div>
                    +{{item.task.mbCount}}麻花币/个
                </div>
                <p>{{item.task.content}}</p>
            </div>
            <span class="minss-ma-bottem" @click="task(item.task.id)">{{item.finished?'已完成':'未完成'}}</span>
        </div>
    </div>

  </div>
</template>
<script>
import {userinfo} from '@/api/index.js'
import {tasklist,tasksign} from '@/api/index.js'
import {getStore,setStore} from '../../common/js/util.js'
import { Toast ,Dialog  } from 'vant';
export default {
  data() {
    return {
     list:[],
     user:JSON.parse(getStore('user'))
    }
  },
  created() {
    this.gettasklist();
    
  },
  methods: {
    gettasklist(){
      tasklist().then(res=>{
        console.log(res);
        this.list = res.data;
      })



    },
    pathStore(){
        this.$router.push({
        name: `exchange`,
      });
    },
    pathInvitation(){
       this.$router.push({
        name: `Invitation`,
      });
    },
    onClickLeft() {
       this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: `home`,
        query: {
          type: "0"
        }
      });
    },
    task(id){
      console.log(id);
      if(id == 4){
          Dialog.confirm({
            title: '推广任务',
            message: '分享扫描二维码后，好友注册登录填写邀请码即可完成任务。'
          }).then(() => {
            this.$router.push({
              name: `my`,
            });
          }).catch(() => {
            // on cancel
          });
      }else if(id == 5 ){
          tasksign().then(res=>{
            console.log(res);
            if(res.data == true){
                Toast('签到成功');
                userinfo().then(res=>{

                    localStorage.setItem("user", JSON.stringify(res.data));
                  this.user =JSON.parse(getStore('user'))

                })
            }else{
               Toast('您今天已签到，请明天再试');
            }
          })
          console.log('每日签到');
      }else if(id == 2){
        Dialog.confirm({
            title: '点击广告',
            message: '快去选取你想观看的视频，并点击播放前广告，即可完成该任务哦'
          }).then(() => {
            this.$router.push({
              name: `home`,
              query: {
                type: "0"
              }
            });
          }).catch(() => {
            // on cancel
          });

      }else if(id == 1){
           Dialog.alert({
            title: '上传头像',
            message: '首次上传头像即可完成该任务哦，该任务只能完成一次'
          }).then(() => {
           
          })



      }
    }
  },
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
  height: 0.8rem;
  line-height: 0.8rem;
  position: fixed;
  top: 0;
  width: 100%;
}
.van-nav-bar__left,
.van-nav-bar__right {
  font-size: 0.3rem;
}
.van-nav-bar__title {
  font-size: 0.3rem;
}
.van-nav-bar__arrow {
  font-size: 0.3rem;
}
.miss-top{
  margin-top: 1.1rem;margin-bottom: .3rem;
  background-color: #fff;
  border-radius: 10PX;
  // margin: 30px 0;
  overflow: hidden;
  font-size: .3rem;
  h2{
    font-size: .4rem;
    color: rgb(0, 0, 0);
    font-weight: normal;
    padding: 40px 0;
    
  }
  .miss-topa{
    display: flex;
    justify-content : space-around;
        span{
          // background-color: aqua;
          padding: 20px 20px;
          width: 2.4rem;
          border-radius: 20PX;
          border: 1PX solid #ccc;
          // margin-left: 100px;
          img{
            height: .32rem;
            margin-right: .1rem;
          }
        }
      
  }
}
.miss-top2{
        margin: .6rem 0;
         display: flex;
         div{
           width: 50%;
         }
      }
.miss-mman{
  margin: 30px 0;
  background-color:#fff; 
  border-radius: 10PX;
  font-size: .3rem;
  overflow: hidden;
}
.minss-ma-img{
  // background-color:#9013FE;
  width: .8rem;
  height: .8rem;
  float: left;
 
  margin-left: .3rem;
}
.minss-ma{
  margin-top: 60px ;
   border-bottom: 1PX solid #ccc;
}


.minss-ma:last-child{
   border-bottom: 1PX solid rgb(255, 255, 255);
}
.minss-ma-text{
  float: left;
  text-align: left;
  margin-left: .3rem;
  width: 51%;
  padding-bottom: 40px;
  h5{
    font-size: .34rem;
    font-weight:650;
  }
  div{
    line-height: .5rem;
  }
  p{
    font-size: .28rem;
    color: rgb(128, 124, 124);
  }
}
.minss-ma-bottem{
  float: right;
  
  padding: 20px 30px;
  margin-right: 30px;
  border-radius:20PX;
  margin-top: .1rem;
  color:  rgb(254, 133, 19);
  border: 1PX  solid rgb(254, 133, 19);
}
</style>