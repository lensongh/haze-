<template>
  <div>
    <div class="vlist-top cl">
      <listone class="vlist-topleft" :title="item"></listone>
      <div class="vlist-topright">
        <h3>{{item.title}}</h3>
        <h4>
          主演：
          <span v-for="(item,i) in videoList.actorList" :key="i">{{item.name}}</span>
        </h4>
        <h5>导演：{{videoList.director}}</h5>
        <ul>
          <li>
            分类：{{videoList.type==1?'电影':videoList.type==2?'电视剧':
            videoList.type==3?'综艺':'动漫'
            }}
          </li>
          <li>地区：{{videoList.country}}</li>
          <li>年份：{{videoList.year}}</li>
          <li>语种：{{videoList.language}}</li>
        </ul>
        <div @click="goplayVideoone(item)">立刻播放</div>
      </div>
    </div>
    <div class="vlist-coder">
      <h3>剧情介绍</h3>
      <div>{{videoList.synopsis}}</div>
    </div>
    <div class="vlist-bottem">
      <div class="vlbottem1 cl">
        <h3>剧集</h3>
        <h4>无需安装任何插件,即可快速播放</h4>
      </div>
      <div class="vlbottem2">
        <span
          v-for="(item,i) in videoList.totalCount"
          :key="i"
          @click="goplayVideo(item)"
        >第{{item}}集</span>
      </div>
    </div>
    <loading v-show="thisloading"></loading>
  </div>
</template>
<script>
import { InfoByCodeNum } from "@/api/index.js";
import listone from "../../components/VideoOne";
import { getStore } from "../../common/js/util";
import { Dialog } from "vant";
export default {
  data() {
    return {
      videoList: {
        actorList: [],
        labelList: []
      },
      item: {
        totalCount: "1",
        title: "1"
      },

      thisloading: true,
      isVip: ""
    };
  },
  components: {
    listone
  },
  created() {
    this.getInfoByCodeNum();
  },
  methods: {
    getInfoByCodeNum() {
      InfoByCodeNum({
        code: this.$route.query.videoCode,
        codeNum: 1
      }).then(res => {
        // console.log(res.data);
        this.videoList = res.data;

        let type = res.data.type;
        let totalCount = res.data.totalCount;

        let obj = {
          cover: res.data.cover,
          type: res.data.type,
          isVip: res.data.isVip,
          title: res.data.title,
          grade:res.data.grade,
          totalCount,
          code: res.data.code
        };
        this.item = obj;
        // console.log(obj);
        
        this.isVip = res.data.isVip;
        this.thisloading = false;
    
      });
    },
    goplayVideo(item) {
   
     
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
    goplayVideoone(item) {
     
      var user = JSON.parse(getStore("user"));
    
      console.log(item);
      
      if (this.isVip) {
        if (getStore("token")) {
          if (user.viewCount >= 1) {
            this.$router.push({
              name: "playvideo",
              query: {
                codeNum: '1',
                videoCode: this.$route.query.videoCode,
              
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
            codeNum: "1",
            videoCode: this.$route.query.videoCode
          }
        });
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if(val.name == 'videoList'){

          this.getInfoByCodeNum();
           document.getElementById('content-container').scrollTop=0;  
        }
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.vlist-top {
  background-color: #fff;
  margin: 30px 0;
  border-radius: 10PX;
  padding: 10px 10px;
}
.vlist-topleft {
  float: left;
}
.vlist-topright {
  float: right;
  width: 64%;
  text-align: left;
  font-size: 0.3rem;
  h3 {
    line-height: 0.8rem;
    @include ell();
    font-size: 0.36rem;
    font-weight: 530;
  }
  h4 {
    font-size: 0.32rem;
    font-weight: normal;
    @include ell();
    span {
      padding-right: 10px;
    }
  }
  h5 {
    font-size: 0.32rem;
    font-weight: normal;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
    line-height: 0.6rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      @include ell();
      width: 50%;
      line-height: 0.5rem;
    }
  }
  div {
    background-color: #0bbe06;
    width: 2rem;
    text-align: center;
    line-height: 0.65rem;
    font-size: 0.32rem;
    margin-top: 0.2rem;
    color: #fff;
    border-radius: 6PX;
  }
}
.vlist-coder {
  margin: 30px 0;
  background-color: #fff;

  border-radius: 10PX;
  font-size: 0.3rem;
  padding: 0 10px;
  h3 {
    font-weight: normal;
    color: #0bbe06;
    font-size: 0.36rem;
    text-align: left;

    line-height: 1rem;
    border-bottom: 1PX solid #e9e9e9;
  }
  div {
    padding-top: 0.2rem;
    line-height: 0.4rem;
    text-align: left;
    text-indent: 2em;
    padding-bottom: 0.3rem;
  }
}
.vlist-bottem {
  background-color: #fff;
  margin: 20px 0;
  padding: 0 20px;
  font-size: 0.3rem;
  border-radius: 10PX;
}
.vlbottem1 {
  line-height: 1rem;
  border-bottom: 1PX solid #e9e9e9;
  h3 {
    float: left;
    font-size: 0.36rem;
    font-weight: normal;
    color: #0bbe06;
  }
  h4 {
    float: right;
    font-size: 0.3rem;
    font-weight: normal;
  }
}
.vlbottem2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-bottom: 40px;
  span {
    width: 30%;
    border: 1PX solid #e9e9e9;
    padding: 10px 0;
    margin: 0 10px;
    margin-top: 30px;

    border-radius: 4PX;
  }
}
</style>