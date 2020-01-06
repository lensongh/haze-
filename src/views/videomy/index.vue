<template>
  <div>
   
      <van-nav-bar
        title="我的收藏"
        left-text="返回"
        right-text="首页"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
          <div class="cl videomy-list" @click="pathListvideo(item)" v-for="(item,i) in videoMyList" :key="i">
            <listone class="videomy-listleft" :title="item"></listone>
            <div class="videomy-listright">
              <h3>{{item.title}}</h3>
              <h4>导演：{{item.director}} </h4>
              <h5>评分：{{item.grade}}</h5>
              <ul>
                <li>分类：{{item.type==1?'电影':item.type==2?'电视剧':
                item.type==3?'综艺':'动漫'
                }}</li>
                <li>地区：{{item.country}}</li>
                <li>年份：{{item.year}}</li>
                <li>语种：{{item.language}}</li>
              </ul>
              <div class="cl  video-coodern">
                  <span class="one">内容介绍:</span>
                  <span class="two">{{item.synopsis}}</span>
              </div>
            
            </div>
          </div>
        </van-list>


      </div>

   
     <loading v-show="thisloading"></loading>
  </div>
</template>
<script>
import listone from "../../components/VideoOne";
import {usercollelist} from '@/api/index.js'
export default {
  components: {
    listone
  },
  data() {
    return {
       loading: false,
      finished: false,
      item:{},
      videoMyList:[],
       thisloading:true,
       page:1,
      pageSize:10,
    };
  },
  created() {
    // this.getUsercollelist();
  },
  methods: {
    getUsercollelist(){
      usercollelist({
         page:this.page,
          pageSize:this.pageSize,
      }).then(res=>{
          console.log(res);
          this.videoMyList = res.data;
         
      })


    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
       
        // 加载状态结束
        
        usercollelist({
         page:this.page,
          pageSize:this.pageSize,
        }).then(res=>{
          this.page = this.page+1;
          this.loading = false;
          this.thisloading = false;
        
         res.data.forEach(element => {
            this.videoMyList.push(element)
          });



          if(res.data.length<10){
                this.finished = true;
              }
        })


       
        // 数据全部加载完成
      }, 500);
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
  }
};
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
    height:1.5rem;
    position: relative;
    @include ell3();
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
      line-height: .4rem;
     text-indent: 4em;
      white-space:normal;
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
</style>