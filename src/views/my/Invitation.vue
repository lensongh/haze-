<template>
  <div>
    <van-nav-bar
      title="邀请信息"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="inv-main">
        <div class="inv-main-tar FFD84F">
            <span class="inv-tar1">序号</span>
            <span class="inv-tar2">被邀请人</span>
            <span class="inv-tar3">注册时间</span>
        </div>
        <div class="inv-main-tar" v-for="(item,i) in spreadList" :key="i">
            <span class="inv-tar1">序号</span>
            <span class="inv-tar2">{{item.inviterNickname}}</span>
            <span class="inv-tar3">{{item.registerTime}}</span>
        </div>
      
    </div>
    <loading v-show="thisloading"></loading>
  </div>
</template>
<script>
import {spreadinfo} from '@/api/index.js'
import listone from "../../components/VideoOne";
export default {
  data() {
    return {
      spreadList:[],
      thisloading:false,
    }
  },
  components: {
    listone,
   
  },
  created() {
    this.getspreadinfo();
  },
  methods: {
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
    getspreadinfo(){
       this.thisloading=true;
      spreadinfo().then(res=>{
        console.log(res);
         this.thisloading = false;
        this.spreadList = res.data;
      })
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
.inv-main{
  margin-top:1.1rem;
  font-size: .36rem;
  overflow: hidden;
  border-radius: 10PX;
  // padding-bottom: .5rem;
   background-color: #fff;
}
.inv-main-tar{
  // border-radius: 10PX ;
  padding: 0 20px;
  display: flex;
 line-height: 1rem;
}
.inv-tar1{
  width: 20%;
  text-align: center;
  // background-color: aqua;
   border-top: 1PX solid #ccc;
}
.inv-tar2{
  width: 40%;
  text-align: center;
  // background-color: rgb(209, 188, 66);
   border-top: 1PX solid #ccc;
}
.inv-tar3{
  width: 40%;
  text-align: center;
  // background-color: rgb(0, 255, 34);
   border-top: 1PX solid #ccc;
}
.FFD84F{
 
  color: #fff;
  background-color: #fff;
  color: #000;
  border: 0;
  .inv-tar1,.inv-tar2,.inv-tar3{
     border: 0;
  }
}
</style>