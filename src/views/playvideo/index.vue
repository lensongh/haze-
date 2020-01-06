<template>
  <div>
    <div class="container">
      <div class="player-advertising" v-show="playimg" @click="advertisingimg()">
          <img class="advertisingimg" :src="playPageAd.cover" alt />
           <span class="playvideone-span">{{playvideotext}}</span>
      </div>
      <div id="vs" v-show="!playimg">


      </div>
     
      <div class="play-title">
          {{videoList.title}}&nbsp; &nbsp; 第{{videoList.codeNum}}集
      </div>
      <div class="play-nav cl">
          <span @click="clickNav('error')">报错</span>
          <span @click="clickNav('collect')">{{isCollection?'已收藏':'收藏'}}</span>
          <span @click="clickNav('flush')">刷新</span>
          <span class="nav-li" @click="clickNav('PartOne')">上集</span>
          <span class="nav-li" @click="clickNav('NextPart')"> 下集</span>
      </div>
    </div>
    <div class="vlist-coder">
          <h3>剧情介绍</h3>
          <div>{{videoList.storySynopsis}}</div>
      </div>
      <div class="vlist-bottem">
          <div class="vlbottem1 cl">
              <h3>麻花影视</h3>
              <h4>无需安装任何插件,即可快速播放</h4>
          </div>
          <div class="vlbottem2">
              <span v-for="(item,i) in videoList.totalCount" :key="i" 
               @click="goplayVideo(item)"
              >第{{item}}集</span>
          </div>
      </div>
      <div class="vlist-more">
           <h3>相关推荐</h3>
           <div class="more-list">
              <listone
                v-for="(item,i) in relevantList"
                class="more-list-one"
                :key="i"
                :title="item"
                @click.native="pathListDetails(item)"
              ></listone>
           </div>
      </div>
      <loading v-show="thisloading"></loading>
  </div>
</template>

<script>

// import 'xgplayer';
// import HlsPlayer from 'xgplayer-hls';
 require('../../common/js/xgplayer.js')
  require('../../common/js/hls.js')
import {adclick,playinfo,vipplayinfo,relevant,addCollection,removeCollection} from '@/api/index.js'
import {decrypt,getStore,setStore,unique} from '../../common/js/util.js'
import { Dialog ,Toast } from 'vant';
import listone from "../../components/VideoOne";
export default {
  data() {
    return {
      playerConfig:{   //3、动态设置相关值
         id: 'vs',
        
         url:'https://cdn.yotss.com/file/ssplus/dea32767-a1d2-4086-8aba-ee15c0c655dd/out.m3u8',   //高清
         poster: '',   //封面
      },
       Player: null,
      videoList:{
        codeNum:'1',
        storySynopsis:'1111111',
        title:'1111',
         type:'1'
      },
      thisloading:true,
      isCollection:false,
      params:{
        code:this.$route.query.videoCode,
        codeNum:this.$route.query.codeNum,
      },
     
      relevantList:[],
      playPageAd:{},
      playvideotext: "倒计时",
       playvideotime: 5,
       playimg:true,
    };
  },
  created() {
   
    
  },

  mounted() {
 
      this.getplayinfo();
  },
  components: {
    listone,
    
  },
  methods: {
    playerInit(){

     new window.HlsJsPlayer({
            id: 'vs',
            url:this.playerConfig.url,
            fluid: true,
            // videoInit: true,
            poster: this.playerConfig.poster,
            playbackRate: [0.5, 0.75, 1, 1.5, 2],
            defaultPlaybackRate: 1,
            rotate: {   //视频旋转按钮配置项
                innerRotate: true, //只旋转内部video
                clockwise: false // 旋转方向是否为顺时针
            },
            whitelist: ['iPhone','Android'],
            pip: true,
              playsinline: true, 
              'x5-video-player-type': 'h5'
          })
        



    },

    getplayinfo(){
      this.playimg = true;
      this.playvideotext="倒计时";
      this.playvideotime=5;
      this.thisloading = true;
      if(getStore('token')){
        vipplayinfo({
          code:this.params.code,
          codeNum:this.params.codeNum
          }).then(res=>{
            this.thisloading=false;

            if(res.data == null){
                Dialog({ message: '您的会员观影次数为0' });
            }else{
              this.videoList={
                storySynopsis:res.data.videoInfo.storySynopsis,
                totalCount:res.data.videoInfo.totalCount,
                codeNum:res.data.videoInfo.codeNum,
                title:res.data.videoInfo.title,
                type:res.data.videoInfo.type
              }  
              this.playPageAd = res.data.playPageAd.AD_DISPLAY_FOR_BEFORE_PLAY;

              var clock = window.setInterval(() => {
                this.playvideotime--;
                this.playvideotext = this.playvideotime + "秒";
                if (this.playvideotime <= 0) {
                  this.playimg = false;
                  window.clearInterval(clock);
                }
              }, 1000);
              var hoistObj = {
                title:res.data.videoInfo.title,
                code:res.data.videoInfo.code,
                codeNum:res.data.videoInfo.codeNum,
                isVipL:res.data.videoInfo.isVip
              };
              var hois  = JSON.parse(getStore('hoisObj'));
              if(getStore('hoisObj')){
                  let list = hois;
                  list.unshift(hoistObj);
                  setStore('hoisObj',unique(list))
              }else{
                  let list = [];
                  list[0]=hoistObj;
                  setStore('hoisObj',list)
              }
              this.isCollection=res.data.isCollection;
              var src =   decrypt(res.data.videoInfo.playUrl);
              console.log(src);
              this.playerConfig.url = src;

               this.playerConfig.poster = res.data.videoInfo.cover;  
               this.playerInit();
                this.getrelevant()




            }
            // playPageAd
           
        });
      }else{
          // alert('novip')
        // 不是vip
        playinfo({
          code:this.params.code,
          codeNum:this.params.codeNum
          }).then(res=>{
            this.thisloading=false;  
                   
            this.playPageAd = res.data.playPageAd.AD_DISPLAY_FOR_BEFORE_PLAY;
           
              var clock = window.setInterval(() => {
                this.playvideotime--;
                this.playvideotext = this.playvideotime + "秒";
                if (this.playvideotime <= 0) {
                  // this.playvideo = true;
                  this.playimg = false;
                  window.clearInterval(clock);
                }
              }, 1000);
            
              
              var hoistObj = {
              title:res.data.videoInfo.title,
              code:res.data.videoInfo.code,
              codeNum:res.data.videoInfo.codeNum,
              isVipL:res.data.videoInfo.isVip
            };
            var hois  = JSON.parse(getStore('hoisObj'));
            if(getStore('hoisObj')){
                let list = hois;
                list.unshift(hoistObj);
                setStore('hoisObj',unique(list))
            }else{
                let list = [];
                list[0]=hoistObj;
                setStore('hoisObj',list)
            }
            var src =   decrypt(res.data.videoInfo.playUrl);
            console.log(src);
            this.thisloading=false;
             this.playerConfig.url = src;
            this.playerConfig.poster = res.data.videoInfo.cover;  
           
            this.videoList={
              storySynopsis:res.data.videoInfo.storySynopsis,
              totalCount:res.data.videoInfo.totalCount,
              codeNum:res.data.videoInfo.codeNum,
              title:res.data.videoInfo.title,
              type:res.data.videoInfo.type,
            }
            console.log( this.videoList);
            
              this.playerInit();
              this.getrelevant()
        });
      }






    },
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player) {
      // alert("pause");
    },
    clickNav(val){
        if(val=='error'){
          Dialog({ message: '已将您的反馈发送至管理员,我们将快速处理' });
        }else if(val == 'collect'){
            if(getStore('token')){
                  // 收藏和取消收藏
                  // this.isCollection = true;
                  // this.isCollection
                  if(this.isCollection){
                      Dialog.confirm({
                         title: '温馨提示',
                        message: '是否取消收藏该视频？'
                      }).then(() => {
                         removeCollection(
                           this.params.code
                         ).then(res=>{
                            if(res.code==1000){
                            this.isCollection = false;   
                             Toast('取消收藏成功');
                           }
                           
                         }) 
                          
                        // on confirm
                      }).catch(() => {
                        // on cancel
                      });
                  }else{
                    Dialog.confirm({
                      title: '温馨提示',
                      message: '是否收藏该视频？'
                    }).then(() => {
                        addCollection(
                           this.params.code
                        ).then(res=>{

                          if(res.code==1000){
                            this.isCollection = true;   
                             Toast('收藏成功');
                           } 
                         
                          
                        })
                        
                      // on confirm
                    }).catch(() => {
                      // on cancel
                    });
                  }



              }else{
                 Dialog.confirm({
                    title: '温馨提示',
                    message: '该收藏功能只能登陆后使用哦！！！'
                  }).then(() => {
                    // on confirm
                  }).catch(() => {
                    // on cancel
                  });
            }
        }else if(val == 'flush'){
            Dialog.confirm({
              title: '温馨提示',
              message: '是否刷新该界面？？？'
            }).then(() => {
              this.$router.go(0)
            }).catch(() => {
              // on cancel
            });
        }else if(val == 'PartOne'){
            Dialog.confirm({
              title: '温馨提示',
              message: '是否跳转到上一集'
            }).then(() => {
             
              if(this.params.codeNum == 1){   
                Toast('已经是第一集咯');
              }else{
                this.$router.push({
                  name: "playvideo",
                  query: {
                    codeNum:this.params.codeNum-1,
                    videoCode: this.$route.query.videoCode
                  }
                });    
              }
              // on confirm



            }).catch(() => {
              // on cancel
            });


        }else{
              Dialog.confirm({
              title: '温馨提示',
              message: '是否跳转到下一集'
            }).then(() => {

                console.log(this.videoList.totalCount);
              if(this.params.codeNum == this.videoList.totalCount){   
                Toast('已经是最后一集咯');
              }else{
               this.$router.push({
                  name: "playvideo",
                  query: {
                    codeNum:this.params.codeNum*1+1,
                    videoCode: this.$route.query.videoCode
                  }
                });   
              }    

              
              // on confirm
            }).catch(() => {
              // on cancel
            });



        }
    },
    pathListDetails(item){
      this.$router.push({
        name: "videoList",
        query: {
          videoCode: item.code,
          videoType: item.type,
        }
      });
      
    },
    getrelevant(){
      relevant({
        page:1,
        pageSize:6,
        type:this.videoList.type

      }).then(res=>{
        this.relevantList = res.data;
      })
    },
    advertisingimg(){
      adclick().then(res=>{
        
      })
      window.open(this.playPageAd.detailsUrl)
    },
     goplayVideo(item) {
   
       console.log(item);
       
      var user = JSON.parse(getStore("user"));
     
      if (this.isVip) {
        if (getStore("token")) {
          if (user.viewCount >= 1) {
            this.$router.push({
              name: "playvideo",
              query: {
                codeNum: item,
                videoCode: this.$route.query.videoCode,
                fant: this.$route.query.videoCode
              }
            });
            // 观看次数
          } else {
            Dialog.confirm({
              title: "温馨提示",
              message:
                "您的会员观影次数不够，是否邀请更多好友，获得会员观影次数？"
            })
              .then(() => {
                this.$router.push({
                  name: "my"
                });

                // on confirm
              })
              .catch(() => {
                // on cancel
              });

            // 没有观看次数
          }
        } else {
          Dialog.confirm({
            title: "温馨提示",
            message: "尊敬的用户，会员视频登录后开放"
          })
            .then(() => {
              // this.$router.push({
              //   name: "member"
              // });

              // on confirm
            })
            .catch(() => {
              // on cancel
            });
        }
      } else {
        this.$router.push({
          name: "playvideo",
          query: {
            codeNum: item,
            videoCode: this.$route.query.videoCode
          }
        });
      }

    },
  },
  watch: {
     $route: {
      handler: function(val, oldVal) {
          
          if(val.name=='playvideo'){    
            this.params.code = this.$route.query.videoCode;
            this.params.codeNum = this.$route.query.codeNum;
            this.getplayinfo();
             document.getElementById('content-container').scrollTop=0;  
          }else{
            

          }
        
       
      },
      // 深度观察监听
      deep: true
    }
  
	},
  computed: {
  


  }
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  // min-height: 100%;
  border-radius: 10PX;
  font-size: .3rem;
}
/deep/.vjs-custom-skin > .video-js .vjs-big-play-button{
width: 2em !important;
border-radius: 50% !important;
}
/deep/.vjs-custom-skin > .video-js .vjs-big-play-button{
  margin-left: -1em !important;
}
.play-title{
    @include ell();
  padding: 0 .2rem;
  text-align: left;
  line-height: 1rem;
  font-size: .36rem;
  border-bottom: 1PX solid #e2e2e2;
}
.play-nav{
  padding: 20px 0;

  span{
    float: left;
    border: 1PX solid #b1b0b0;
    line-height: .6rem;
    padding: 0 20px;
    margin: .2rem;
    border-radius: 4PX;
  }
  .nav-li{
   padding: 0 20px;
  }
}
.vlist-coder{
  margin: 30px 0;
  background-color: #fff;
 
  border-radius: 10PX;
  font-size: .3rem;
  padding: 0 10px;
  h3{
    font-weight: normal;
    color: #0bbe06;
    font-size: .36rem;
    text-align: left;

    line-height: 1rem;
    border-bottom: 1PX solid #e9e9e9;
  }
  div{
    padding-top: .2rem;
    line-height: .4rem;
    text-align: left;
    text-indent: 2em;
    padding-bottom: .3rem;
  }
}
.vlist-bottem{
  background-color: #fff;
  margin: 20px 0;
   padding: 0 20px;
  font-size: .3rem;
  border-radius: 10PX;

}
.vlbottem1{
  line-height: 1rem;
    border-bottom: 1PX solid #e9e9e9;
  h3{
    float: left;
    font-size: .36rem;
    font-weight: normal;
    color: #0bbe06;
  }
  h4{
    float: right;
     font-size: .3rem;
    font-weight: normal;
  }
}
.vlbottem2{
   display:flex;
    flex-wrap:wrap ;
   justify-content : flex-start;
   padding-bottom: 40px;
    span{
      width:30%;
      border:1PX solid #e9e9e9;
      padding: 10px 0;
      margin: 0 10px;
      margin-top:30px ;

      border-radius: 4PX;
    }
}
.vlist-more{
   margin: 30px 0;
  background-color: #fff;
 
  border-radius: 10PX;
  font-size: .3rem;
  padding: 0 10px;
  h3{
    font-weight: normal;
    color: #0bbe06;
    font-size: .36rem;
    text-align: left;

    line-height: 1rem;
    border-bottom: 1PX solid #e9e9e9;
  }
}
.more-list{
   width: 100%;
  @include fj();
  padding: 0 0.1rem;
}
.more-list-one{
  width: 29.7%;
}
.player-advertising{
  position: relative;
  height: 4rem;
  .advertisingimg{
    width: 100%;
    height: 4rem;
  }
  .playvideone-span{
    position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  font-size: 0.3rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  color: rgb(228, 228, 228);
  background-color: rgba($color: rgb(0, 0, 0), $alpha: 0.6);
  }
}

</style>