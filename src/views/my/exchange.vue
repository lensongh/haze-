<template>
  <div> 
      <van-nav-bar
        title="兑换中心"
        left-text="返回"
        right-text="首页"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <div class="ex-main">
          <div class="ex-top">
              <div>
                  增加观影次数
              </div>
              <p>
                  10麻花币=1次观影
              </p>
              <span @click="convert('viewing','10')">
                  兑换
              </span>
          </div>
          <!-- <div class="ex-top">
              <div>
                  增加观影次数
              </div>
              <p>
                  10麻花币=1次观影
              </p>
              <span>
                  兑换
              </span>
          </div> -->

     </div>
     <van-dialog
        v-model="show"
        
        show-cancel-button
        :beforeClose="beforeClose"
        confirmButtonText='确定兑换'
      >
      <div class="convert-title">兑换观影次数</div>
      <div class="convert-main cl">
          <span>数量：</span>
          <van-stepper
            :value="convertList.value"
            async-change
            @change="onChange"
            integer 
            :max="convertList.max"
          />
      </div>
      <div class="convert-main2">
          <span>花费：{{convertList.num}}麻币</span>
      </div>
       <div class="convert-main2">
          <span>麻币：{{user.mbCount}}麻币</span>
      </div>
        <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg"> -->
      </van-dialog>
  </div>
</template>
<script>
import {userinfo,changeMb} from '@/api/index.js'
import { Toast } from 'vant';
export default {
  data() {
    return {
      user:{},
      show: false,
      convertList:{
        value:1,
        max:100000,
        total:10,
        num:0,
      },
      
    }
  },
  created() {
    this.getuserinfo()
  },
  methods: {
    getuserinfo(){
       userinfo({}).then(res=>{
         this.user = res.data;
         localStorage.setItem("user", JSON.stringify(res.data));
       })
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
    convert(text,num){
        if(!this.user.mbCount){
           Toast('暂无麻币哦');
           return false;
        }


      this.convertList.num = num*1;
      if(text=='viewing'){
        this.show = true;
         this.convertList.value=1;
       
        this.convertList.total=10;
       
        this.convertList.max = parseInt(this.user.mbCount/this.convertList.total);
      }
    },
    beforeClose(action, done){
      console.log(action,done);
     if(action === 'confirm') {
          // setTimeout(done, 1000)
          // console.log()
        let numtotal = this.convertList.value*this.convertList.total

       changeMb(numtotal).then(res=>{
        Toast(res.data.context);
        if(res.code == 1000){
          done()
         this.show = false;
        } 
      })
        this.getuserinfo();  
        
      } else if(action === 'cancel') {
       
         done() //关闭
      }
    },
    onChange(value) {
      // Toast.loading({ forbidClick: true });

      // setTimeout(() => {
        // Toast.clear();

        // 注意此时修改 value 后会再次触发 change 事件
        this.convertList.value = value;
       this.convertList.num= this.convertList.total*value
      // }, 500);
    },
    
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
.ex-main{
  margin-top: .8rem;
  font-size: .3rem;
  overflow: hidden;
}
.ex-top{
  margin: 30px 30px;
  background-color: #fff;
 
  border-radius: 6PX;
  text-align: left;
  text-indent: 1em;
  box-shadow: 0 6px 10px rgba(0,0,0,0.2);
  overflow: hidden;
  position: relative;
  div{
    margin-top: 30px;
   
    font-size: .32rem;
    font-weight: 600;
    letter-spacing:3px;
  }
  p{
    margin-top: 6px;
     line-height:26px;
     font-size: .26rem;
       margin-bottom: 30px;
  }
  span{
     text-indent: 0;
    text-align: center;
    line-height: .43rem;
    position: absolute;
    right:.2rem;
    top:50%;
    color: #fff;
    width:1.3rem;
    transform:translateY(-50%);
    font-size: .22rem;
    background-color: salmon;
    border-radius: 20PX;
   
  
  }
}
.convert-title{
  margin-top: 20px;
padding:30px 0;
}
.convert-main{
  margin: 0 auto;
  span{
    float: left;
    line-height: 28PX;
    margin-left: 2rem;
  }
  .van-stepper{
    float: left;
  }
}
.convert-main2{
  margin: .3rem 0;
  text-align: left;
  margin-left: 2rem;
}
</style>