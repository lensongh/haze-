<template>
  <div class="billmo-main">
    <div>
      <van-tabs v-model="active" animated @change="gobillmovie">
        <van-tab v-for="(index,i) in nav" :title="index.title" :key="i">
          <div class="bollo-tab">
            <div>
              <div
                class="cl videomy-list"
                @click="pathListvideo(item)"
                v-for="(item,i) in list"
                :key="i"
              >
                <div class="videomy-no">
                    <span v-if="i+1 >3 ">NO.{{i+1}}</span>
                    <img v-if="i+1 <=3 " :src="billimg[i]"  alt="">
                </div>
                <listone class="videomy-listleft" :title="item"></listone>
                <div class="videomy-listright">
                  <h3>{{item.title}}</h3>
                  <h4>
                    主演：
                    <span v-for="(item1,i) in item.actorList" :key="i">{{item1.name}}</span>
                  </h4>
                  <h5>评分：{{item.grade}}</h5>
                  <ul>
                    <li>
                      分类:{{item.type==1?'电影':item.type==2?'电视剧':
                      item.type==3?'综艺':'动漫'
                      }}
                    </li>
                    <li>地区:{{item.country}}</li>
                    <li>年份:{{item.year}}</li>
                    <li>语种:{{item.language}}</li>
                    <!-- <li>{{item.labelList[3].typeName}}：{{item.labelList[3].name}}</li> -->
                  </ul>
                  <div class="cl video-coodern">
                    <span class="one">内容介绍:</span>
                    <span class="two">{{item.synopsis}}</span>
                  </div>
                  <!-- <h6>收藏时间</h6> -->
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>

      <loading v-show="thisloading"></loading>
    </div>
  </div>
</template>
<script>
import listone from "../../components/VideoOne";
import { VideoByPlaySum } from "@/api/index.js";
export default {
  data() {
    return {
      nav: [
        { title: "本日", sortName: "play_count_for_day" },
        { title: "本周", sortName: "play_count_for_week" },
        { title: "本月", sortName: "play_count_for_month" }
      ],
      billimg:[
         require('../../common/img/one1.png'),
         require('../../common/img/one2.png'),
          require('../../common/img/one3.png'),
      ],
      active: 0,
      list: {},
      params: {
        type: this.$route.query.listtype,
        sortName: "play_count_for_day"
      },
      thisloading: true
    };
  },
  components: {
    listone
  },
  created() {
    this.getVideoByPlaySum();
  },
  methods: {
    getVideoByPlaySum() {
      var tata = this;
      tata.thisloading = true;

      VideoByPlaySum({
        type: tata.params.type,
        sortName: tata.params.sortName,
        page: 1,
        pageSize: 10
      }).then(res => {
        console.log(res);
        tata.thisloading = false;
        tata.list = res.data;
      });
    },
    gobillmovie(name, title) {
      this.params.type = this.$route.query.listtype;
      if (name == 0) {
        this.params.sortName = "play_count_for_day";
      } else if (name == 1) {
        this.params.sortName = "play_count_for_week";
      } else {
        this.params.sortName = "play_count_for_month";
      }
      this.getVideoByPlaySum();
    },

    pathListvideo(item) {
      this.$router.push({
        name: "videoList",
        query: {
          videoCode: item.code,
          videoType: item.type
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.params.type = this.$route.query.listtype;
        this.getVideoByPlaySum();
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.billmo-main {
  background-color: #fff;
  margin: 0 30px;
  min-height: 8rem;
  border-radius: 10PX;
  margin-bottom: 1rem;
  overflow: hidden;
}
/deep/.van-ellipsis {
  color: #000;
}
/deep/.van-tab--active {
  background-color: rgba($color: #000000, $alpha: 0.4);
  color: #fff;
}
/deep/.van-tab--active .van-ellipsis {
  color: #fff;
}
.bollo-tab {
  // margin:0 20px ;
  // background-color: aqua;
  font-size: 0.3rem;
}
.video-li {
  // background-color: #000000;
}
.videomy-listright {
  float: right;
  width: 62%;
  text-align: left;
  font-size: 0.3rem;
  h3 {
    line-height: 0.6rem;
    @include ell();
    font-size: 0.34rem;
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

    line-height: 0.42rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      @include ell();
      width: 50%;
      line-height: 0.4rem;
    }
  }
  .video-coodern {
    margin-top: 0.2rem;
    height: 1.4rem;
    position: relative;

    .one {
      position: absolute;
      left: 0;
      top: 0;
      width: 1.3rem;
      text-align: left;
      height: 0.3rem;
    }
    .two {
      width: 3.4rem;
      line-height: 0.38rem;
      // padding-left: 1.3rem;
      white-space: normal;
      text-indent: 4.5em;
      @include ell3();
    }
  }
  h6 {
    font-weight: normal;
    font-size: 0.3rem;
    line-height: 0.6rem;
    @include ell();
  }
}
.videomy-listleft {
  float: left;
  margin-left: 0.2rem;
}
.videomy-list {
  margin-top: 0.2rem;
  border-bottom: 1PX solid rgb(235, 230, 230);
}
.videomy-list:first-child {
  margin-top: 0;
}
.videomy-no {
  text-align: left;
  padding-left: 20px;
  color: rgb(255, 0, 0);
  font-weight: 500;
}
.videomy-no img{
  width: .6rem;
}
</style>