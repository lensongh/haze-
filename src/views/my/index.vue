<template>
  <div>
   <van-nav-bar
      title="我的"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="my-div" @click="pathuser()">
        <img :src="imageUrl" alt="">
        <!-- ../../common/img/270x405.jpg -->
        <p>{{user.nickname}}</p>
    </div>
    <div class="my-navlist">
        <div class="my-navletf" >
            <p>{{user.viewCount?user.viewCount:0}}</p>
            <p>会员观影</p>
          
        </div>
        <div class="my-navletf" @click="navletf()">
            <p>{{user.mbCount}}</p>
            <p>麻花币</p>
          
        </div>
        <div  @click="navRight()">
            <p><van-icon name="like-o" /></p>
            <p>我的收藏</p>
        </div>
    </div>
    <div class="my-code">
        
        <div id="qrcode" ></div>
        <p>分享注册，送麻花币，可兑换观影次数哦</p>
    </div>
    <loading v-show="thisloading"></loading>
  </div>
</template>
<script>
import {userinfo} from '@/api/index.js'
 import QRCode  from "qrcodejs2"
import {getStore} from '../../common/js/util.js'
export default {
  data() {
    return {
      user:{},
      link: JSON.parse(getStore('user')).spreadQrcodeUrl,
      thisloading:true,
      imageUrl:require("../../common/img/270x405.jpg"),
    }
  },
   components: { QRCode },
  created() {
    this.getuserinfo();
     
  },
  mounted() {
    // this.$nextTick (function () {
    //    this.qrcode();
    // })
  },
   methods: {
     getuserinfo(){
       userinfo({}).then(res=>{
         this.user = res.data;
         this.link = res.data.spreadQrcodeUrl;
         if (res.data.userIcon == null) {
          return;
        } else {
          this.imageUrl = 'http://'+res.data.userIcon;
        }
         document.getElementById('qrcode').innerHTML = '';
         this.$nextTick (function () {
            this.qrcode();
           this.thisloading=false;
          })
       })
     },
     pathuser(){
       this.$router.push({
        name: "myuser",
      });
     },
     navRight(){
        this.$router.push({
        name: "videomy",
      });
     },
     navletf(){
        this.$router.push({
          name: "mission",
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
    qrcode () {
        let that = this;
        let qrcode = new QRCode('qrcode', {
            width: 124,
            height: 124,        // 高度
            text:  this.link,   // 二维码内容
             render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            background: '#f0f',   // 背景色
            foreground: '#ff0'    // 前景色
        })
    },
  }
}
</script>
<style lang="scss" scoped>
.my-div{
  background-color: #ffffff;
  border-radius: 6PX;
  margin: 30px 0;
  display: flex;
  font-size: .3rem;
  padding: 20px 20px;
  img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    
  }
  p{
    line-height:1.2rem;
    padding-left: .4rem;
    color: #000000;
  }
}
.my-navlist{
  font-size: .36rem;
  background-color: #ffffff;
  margin: 20px 0;
  border-radius: 6PX;
  display: flex;
  div{
    width: 50%;
    border-right: 1PX solid #e3ede3;
    padding: 20px 0;
    margin: 20px 0;
  }
}
.van-icon-like-o{
  font-size: .6rem;
}
.my-navletf{
  p{
    line-height: .6rem;
  }
}
.my-code{
   background-color: #ffffff;
  margin: 30px 0;
  border-radius: 6PX;
  font-size: .3rem;
  #qrcode{
    padding: 30px 0 10px 0;
   display: flex;
   justify-content:center;
  }
  p{
    line-height: .6rem;
    padding-bottom: .3rem;
  }
}
</style>