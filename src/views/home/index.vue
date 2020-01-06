<template>
  <div>
    <!-- 搜索s -->
    <div class="home-sear">
      <div class="home-search" @click="gotosearch">
        <svg-icon iconClass="search" class="icon" />
        <span>点我搜索,尽量少写别错字,不然搜不到哦</span>
      </div>
    </div>
    <!-- 搜索e -->
    <!-- 轮播图s -->
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in bannList" :key="index">
          <div class="home-barrn" @click="pathListDetailsone(item)">
            <img :src="item.cover" />
            <div class="home-barn-text">
              <h4>{{item.title}}</h4>
              <span>{{item.content}}</span>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图e-->
    <!-- 公告s -->
    <div class="home-notice">
      <van-notice-bar color="#0bbe06" background="#ffffff">{{noticetxt}}</van-notice-bar>
    </div>
    <!-- 公告E -->
    <!-- 今日推荐S -->
    <div class="home-AboutUs">
      <div class="home-AboutUs-top cl">
        <h4>今日推荐</h4>
        <!-- <p>今日更新&nbsp;<span>66</span>&nbsp;部&nbsp;  共63694部  </p> -->
      </div>
      <div class="home-AboutUs-list">
        <listone
          v-for="(item,i) in ByTodayList"
          :key="i"
          :title="item"
          @click.native="pathListDetails(item)"
        ></listone>
      </div>
    </div>
    <!-- 今日推荐e -->
    <!-- 电视剧s -->
    <div class="home-AboutUs">
      <div class="home-AboutUs-top cl">
        <h4>电视剧</h4>
        <p @click="gotohand('2')">更多</p>
      </div>
      <div class="home-barrndiv">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in teleplayBannList" :key="index">
            <div
              class="home-barrnss"
              :style="{backgroundImage: 'url(' + item.cover + ')'}"
              @click="pathListDetailsone(item)"
            >
              <div class="home-barn-text">
                <h4>{{item.title}}</h4>
                <span>{{item.content}}</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="home-AboutUs-list">
        <listone
          v-for="(item,i) in teleplayList"
          :key="i"
          :title="item"
          @click.native="pathListDetails(item)"
        ></listone>
      </div>
    </div>
    <!-- 电视剧e -->
    <!-- 电影s -->
    <div class="home-AboutUs">
      <div class="home-AboutUs-top cl">
        <h4 >电影</h4>
        <p @click="gotohand('1')">更多</p>
      </div>
      <div class="home-barrndiv">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in movieBannList" :key="index">
            <div
              class="home-barrnss"
              :style="{backgroundImage: 'url(' + item.cover + ')'}"
              @click="pathListDetailsone(item)"
            >
              <div class="home-barn-text">
                <h4>{{item.title}}</h4>
                <span>{{item.content}}</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="home-AboutUs-list">
        <listone
          v-for="(item,i) in movieList"
          :key="i"
          :title="item"
          @click.native="pathListDetails(item)"
        ></listone>
      </div>
    </div>

    <!-- 电影e -->
    <!-- 综艺s -->
    <div class="home-AboutUs">
      <div class="home-AboutUs-top cl">
        <h4>综艺</h4>
        <p @click="gotohand('3')">更多</p>
      </div>
      <div class="home-barrndiv">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in varietyBannList" :key="index">
            <div
              class="home-barrnss"
              :style="{backgroundImage: 'url(' + item.cover + ')'}"
              @click="pathListDetailsone(item)"
            >
              <div class="home-barn-text">
                <h4>{{item.title}}</h4>
                <span>{{item.content}}</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="home-AboutUs-list">
        <listone
          v-for="(item,i) in varietyList"
          :key="i"
          :title="item"
          @click.native="pathListDetails(item)"
        ></listone>
      </div>
    </div>

    <!-- 综艺e -->
    <!-- 动漫s -->
    <div class="home-AboutUs">
      <div class="home-AboutUs-top cl">
        <h4>动漫</h4>
        <p @click="gotohand('4')">更多</p>
      </div>
      <div class="home-barrndiv">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in cartoonBannList" :key="index">
            <div
              class="home-barrnss"
              :style="{backgroundImage: 'url(' + item.cover + ')'}"
              @click="pathListDetailsone(item)"
            >
              <div class="home-barn-text">
                <h4>{{item.title}}</h4>
                <span>{{item.content}}</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="home-AboutUs-list">
        <listone
          v-for="(item,i) in cartoonList"
          :key="i"
          :title="item"
          @click.native="pathListDetails(item)"
        ></listone>
      </div>
    </div>

    <!-- 动漫e -->
    <loading v-show="thisloading"></loading>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { banner, notice, ByTodayPlaySum, LabelAndVideos } from "@/api/index.js";
import listone from "../../components/VideoOne";
export default {
  data() {
    return {
      bannList: [],
      noticetxt:
        "麻花影视欢迎你的观看，麻花影视欢迎你的观看麻花影视欢迎你的观看麻花影视欢迎你的观看麻花影视欢迎你的观看",
      ByTodayList: {},
      teleplayList: {}, // 电视剧
      teleplayBannList: {},
      movieList: {}, // 电影
      movieBannList: {},
      varietyList: {}, // 综艺
      varietyBannList: {},
      cartoonList: {}, // 动漫
      cartoonBannList: {},
      thisloading: true
    };
  },
  components: {
    listone
  },
  created() {
    this.getbanner();
    this.getnotice();
    this.getByTodayPlaySum();
    this.getLabelAndVideos();
  },
  computed: {},
  methods: {
    getLabelAndVideos() {
      LabelAndVideos({
        page: 1,
        page2: 1,
        pageSize: 0,
        pageSize2: 9
      }).then(res => {
        this.teleplayList = res.data[1].videoBasicInfoVOS;
        let list = [];
        this.movieList = res.data[0].videoBasicInfoVOS;
        this.varietyList = res.data[2].videoBasicInfoVOS;
        this.cartoonList = res.data[3].videoBasicInfoVOS;
        this.thisloading = false;
      });
    },
    gotosearch() {
      this.$router.push({ name: "search" });
    },
    getbanner() {
      banner(30).then(res => {
        this.bannList = res.data;
      });
      banner(32).then(res => {
        this.teleplayBannList = res.data;
      });
      banner(31).then(res => {
        this.movieBannList = res.data;
      });
      banner(33).then(res => {
        this.varietyBannList = res.data;
      });
      banner(34).then(res => {
        this.cartoonBannList = res.data;
      });
    },
    pathListDetailsone(item) {
      console.log(item);
      
      this.$router.push({
        name: "videoList",
        query: {
          videoCode: item.videoCode,
          videoType: item.type
        }
      });
    },
    pathListDetails(item) {
      this.$router.push({
        name: "videoList",
        query: {
          videoCode: item.code,
          videoType: item.type
        }
      });
    },
    getnotice() {
      notice(52).then(res => {
        this.noticetxt = res.data[0].content;
      });
    },
    getByTodayPlaySum() {
      ByTodayPlaySum({
        page: 1,
        pageSize: 12
      }).then(res => {
        this.ByTodayList = res.data;
      });
    },
    gotohand(type) {
      console.log(type);
      
      this.$router.push({
        name: "movie",
        query: {
          type: type
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h1 {
  font-size: 36px;
}
.msg {
  font-size: 32px;
}
.home-sear {
  border-top: 1PX solid #e2e2e2;
  background-color: #fff;
  overflow: hidden;
}
.home-search {
  font-size: 0.3rem;
  background-color: #fff;
  margin: 20px 40px;
  line-height: 0.7rem;
  border-radius: 20PX;
  border: 1PX solid #e2e2e2;
  font-size: 0.26rem;
  color: rgb(100, 97, 97);
}
.home-barrn {
  position: relative;
  color: #fff;
  width: 100%;
  img {
    width: 7.5rem;
    border-radius: 5PX;
  }
  .home-barn-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 30px;
    font-size: 0.36rem;
    text-align: left;
    border-radius: 5PX;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    h4 {
      font-weight: normal;
      margin-bottom: 0.1rem;
    }
    span {
      @include ell();
      font-size: 0.26rem;
      height: 0.26rem;
      line-height: 0.26rem;
    }
  }
}
.home-notice {
  margin: 25px 0;
  border-radius: 6PX;
  overflow: hidden;
}
.home-AboutUs {
  margin: 25px 0;
  border-radius: 6PX;
  background-color: #fff;
}
.home-AboutUs-top {
  font-size: 0.34rem;
  line-height: 0.9rem;
  height: 0.9rem;
  h4 {
    font-weight: normal;
    float: left;
    margin-left: 20px;
  }
  p {
    float: right;
    font-size: 0.26rem;
    padding: 0 20px;
    margin-right: 0.2rem;
  }
  span {
    color: #42b983;
  }
}
.home-AboutUs-list {
  width: 100%;
  @include fj();
  padding: 0 0.1rem;
}

.home-barrndiv {
  padding: 0 20px;
  border-radius: 6PX;
  overflow: hidden;
  margin-bottom: 30px;
}

.home-barrnss {
  position: relative;
  color: #fff;
  background-position: 50% 50%;
  background-size: cover;
  width: 100%;
  height: 3.2rem;
  background-color: #42b983;
  border-radius: 6PX;

  .home-barn-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 30px;
    font-size: 0.36rem;
    text-align: left;
    border-radius: 6PX;

    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    h4 {
      font-weight: normal;
      margin-bottom: 0.1rem;
    }
    span {
      @include ell();
      font-size: 0.26rem;
      height: 0.26rem;
      line-height: 0.26rem;
    }
  }
}
</style>
