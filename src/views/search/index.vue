<template>
  <div>
     <van-nav-bar
        title="搜索"
        left-text="返回"
        right-text="首页"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div class="search-main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
          <div class="cl videomy-list" @click="pathListvideo(item)" v-for="(item,i) in seachlist" :key="i">
            <listone class="videomy-listleft" :title="item"></listone>
            <div class="videomy-listright">
              <h3>{{item.title}}</h3>
              <h4>主演：<span v-for="(item1,i) in item.actorList" :key="i">
                    {{item1.name}}</span></h4>
              <h5>评分：{{item.grade}}</h5>
              <ul>
                <li>分类:{{item.type==1?'电影':item.type==2?'电视剧':
              item.type==3?'综艺':'动漫'
              }}</li>
                <li>地区:{{item.country}}</li>
                <li>年份:{{item.year}}</li>
                <li>语种:{{item.language}}</li>
                <!-- <li>{{item.labelList[3].typeName}}：{{item.labelList[3].name}}</li> -->
              </ul>
              <div class="cl  video-coodern">
                  <span class="one">内容介绍:</span>
                  <span class="two">{{item.synopsis}}</span>
              </div>
              <!-- <h6>收藏时间</h6> -->
            </div>
          </div>
      
      </van-list>
    </div>
    <loading v-show="thisloading"></loading>
  </div>
</template>
<script>
import listone from "../../components/VideoOne";
import { Toast   } from 'vant';
import {search} from '@/api/index.js'
export default {
    components: {
    listone,
   
  },
  data() {
    return {
      loading: false,
      finished: false,
      value:'',
      item:{},
      seachlist:[],
      thisloading:false,
      page:1,
      pageSize:10,
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
       
        // 加载状态结束
       
       
          this.page++;
            search({
              page:this.page,
              pageSize:this.pageSize,
              searchValue:this.value
            }).then(res=>{
              this.loading = false;
              this.thisloading = false;
              // this.seachlist = res.data;
              res.data.forEach(element => {
                  // console.log(element);
                  this.seachlist.push(element)
              });

              if(res.data.length<10){
                this.finished = true;
              }
            })
       
        // 数据全部加载完成
      }, 500);
    },
    onSearch(){
      this.thisloading = true;
      search({
        page:1,
        pageSize:10,
        searchValue:this.value
      }).then(res=>{
        if(res.data == ''){

          if(res.data = []){
             Toast('尊敬的用户，暂时没有内容哦，请重新输入关键词');
          }
        }
        this.thisloading = false;
        this.seachlist = res.data;
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
    pathListvideo(item){
     
      this.$router.push({
        name: "videoList",
        query: {
          videoCode: item.code,
          videoType: item.type,
        }
      });
    }
  },
}
</script>
<style lang="scss" scoped>
.videomy-list {
  margin: 30px 0;
  background-color: #fff;
  border-radius: 10PX;
  padding: 10px 10px;
}
.videomy-listleft {
  float: left;
}
.videomy-listright {
  float: right;
  width: 64%;
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
  .video-coodern{
    margin-top: .2rem;
    height: .7rem;
    position: relative;
    @include ell2();
    .one{
      position: absolute;
      left: 0;
      top:0;
      width: 1.3rem;
      text-align: left;
      height: .3rem;
    }
    .two{
      width: 4.2rem;
      line-height: .3rem;
      padding-left: 1.3rem;
      white-space:normal
    }
  }
  h6 {
    font-weight: normal;
    font-size: 0.3rem;
    line-height: 0.6rem;
    @include ell();
  }
}
.van-nav-bar{
  position: fixed;
  top:0;
  height: .8rem;
  width: 100%;
  z-index: 99;
}
.van-search{
   position: fixed;
   top:.8rem;
   width: 100%;
    z-index: 99;
}
.search-main{
  margin-top:2.3rem;
}
.van-nav-bar__left, .van-nav-bar__right{
  height: .8rem;
}
</style>