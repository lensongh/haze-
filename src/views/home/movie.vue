<template>
  <div>
    <!-- 地区s -->
    <transition
      enter-active-class="animated slideInLeft"
      leave-active-class="animated fadeOut"
    >
      <div class="movie-topnavli" v-show="topnav">
        <div class="movie-topnav cl">
          <h4>{{videolabel[0].vltName}}</h4>
          <div>
            <p class="cl">
              <span
                :class="item2.vlName ==country ? 'mo-slost-active':''"
                v-for="(item2,y) in videolabel[0].vlList"
                :key="y"
                @click="gaotolabel(item2,0)"
              >{{item2.vlName}}</span>
            </p>
          </div>
        </div>
        <div class="movie-topnav cl">
          <h4>{{videolabel[1].vltName}}</h4>
          <div>
            <p class="cl">
              <span
                :class="item2.vlName == year ? 'mo-slost-active':''"
                v-for="(item2,y) in videolabel[1].vlList"
                :key="y"
                @click="gaotolabel(item2,1)"
              >{{item2.vlName}}</span>
            </p>
          </div>
        </div>
        <div class="movie-topnav cl">
          <h4>{{videolabel[2].vltName}}</h4>
          <div>
            <p class="cl">
              <span
                :class="item2.vlName == language ? 'mo-slost-active':''"
                v-for="(item2,y) in videolabel[2].vlList"
                :key="y"
                @click="gaotolabel(item2,2)"
              >{{item2.vlName}}</span>
            </p>
          </div>
        </div>
        <div class="cl movie-topnav2">
          <div class="mo-sort cl">
            <span
              @click="gotosortName('create_date')"
              :class="movParams.sortName ==  'create_date'?'mo-slost-active':''"
            >更新时间</span>
            <span
              @click="gotosortName('play_sum')"
              :class="movParams.sortName ==  'play_sum'?'mo-slost-active':''"
            >观影次数</span>
            <span
              @click="gotosortName('time_len')"
              :class="movParams.sortName ==  'time_len'?'mo-slost-active':''"
            >影片时长</span>
          </div>
          <div class="mo-count">
            共
            <span>{{total}}</span>个影片
          </div>
        </div>
      </div>
     </transition>
    <!-- 地区e -->
    <!-- 视频列表s -->
    <div class="mo-list-slost">
  
      <div class="screen-img" >
        
         <img @click="screenimg()" src="../../common/img/screen.png" alt="">
         <span @click="screenimg()">筛选</span>
         
      </div>
      <div class="mo-list">
        <listone
          v-for="(item,i) in movieList"
          :key="i"
          :title="item"
          @click.native="pathListDetails(item)"
        ></listone>
      </div>
    </div>
    <!-- 视频列表e -->
    <!-- 分页s -->
    <div class="mo-sort222">
      <van-pagination
        v-model="currentPage"
        :page-count="pagecount"
        mode="simple"
        @change="sortList"
      />
    </div>
    <!-- 分页e -->
    <loading v-show="thisloading"></loading>
  </div>
</template>
<script>
import { AllVideoType, videolabel, findbylabel } from "@/api/index.js";
import { Toast } from 'vant';
import listone from "../../components/VideoOne";
export default {
  data() {
    return {
      videolabel: [
        {
          vlList: [],
          vltName: []
        },
        {
          vlList: [],
          vltName: []
        },
        {
          vlList: [],
          vltName: []
        }
      ],
      movParams: {
        page: 1,
        pageSize: 9,
        sortName: "create_date",
        type: this.$route.query.type,
        videoLabelIds: [1, 2, 3, 4, 5, 6]
      },
      total: "2",
      movieList: [],
      currentPage: 1,
      pagecount: 5,
      thisloading: true,
      year: "全部",
      country: "全部",
      language: "全部",
      topnav:false,
    };
  },
  components: {
    listone
  },
  created() {
    this.getvideolabel();
    this.getfindbylabel();
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        
        if(val.name == 'movie'){
          this.year = "全部";
          this.country= "全部";
          this.language ="全部";
          this.topnav=false;
          this.movParams.page =1;
          this.currentPage =1;
         (this.movParams.type = this.$route.query.type), this.getfindbylabel();

       }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    getfindbylabel() {
      this.thisloading = true;
      let year,country,language;
      this.year == '全部'?year = null :year= this.year;
      this.country == '全部'?country = null :country= this.country
      this.language == '全部'?language = null :language= this.language
      findbylabel({
        page: this.movParams.page,
        pageSize: this.movParams.pageSize,
        sortName: this.movParams.sortName,
        type: this.movParams.type,
        year,
        country,
        language
      }).then(res => {
        if(res.data.total == 0){
           Toast('影片暂无，我们将尽快上架');
        }
        this.total = res.data.total;
        this.pagecount = Math.ceil(this.total / this.movParams.pageSize);
        this.movieList = res.data.list;
        this.thisloading = false;
      });
    },
    getvideolabel() {
      videolabel().then(res => {
        var data = res.data;
        this.videolabel = res.data;
        let obj ={
          vlName:'全部',
          vlId:'0001'
        }
      
        
        for( let i  in this.videolabel){
            this.videolabel[i].vlList.unshift(obj)

        }
        // function descend(x,y){
        //     return y.vlName - x.vlName;  //按照数组的第1个值升序排列
        // }  
        // this.videolabel[1].sort(descend);

        // console.log( this.videolabel[1].sort(descend));
        
        // console.log(JSON.stringify(res.data));
      });
    },
    sortList() {
      this.movParams.page = this.currentPage;
      console.log(window.pageYOffset,document.body.scrollTop, document.documentElement.scrollTop);
      
       window.pageYOffset = 0
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0;
        document.getElementById('content-container').scrollTop=0;
      // console.log( document.getElementById('content-container').scrollTop);
      this.getfindbylabel();
    },
    gaotolabel(e, i) {
      if (i == 0) {
        this.country = e.vlName;
      } else if (i == 1) {
        this.year = e.vlName;
      } else {
        this.language = e.vlName;
      }
      this.getfindbylabel();
    },
    gotosortName(e) {
      this.movParams.sortName = e;
      this.movParams.page = 1;
      this.currentPage =this.movParams.page;
      this.getfindbylabel();
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
    screenimg(){
      this.topnav = !this.topnav;
     
    },
  }
};
</script>
<style lang="scss" scope>
.movie-topnavli {
  font-size: 0.36rem;
  background-color: #fff;
  margin: 0.25rem 0;
  padding: 20px 20px;
  border-radius: 10PX;
}
.movie-topnav {
  overflow: hidden;
  padding: 5px 0;
  font-size: 0.34rem;
  border-bottom: 1PX dashed #e2e2e2;
  &:last-child {
    border-bottom: 1PX dashed rgb(255, 255, 255);
  }
  h4 {
    float: left;
    font-weight: normal;
    width: 10%;
    line-height: 0.7rem;
    margin: 15px 0;
    box-shadow: 0.1rem 0 0.1rem -0.1rem rgba(0, 0, 0, 0.3);
  }
  div {
    float: left;
    width: 90%;
    line-height: 0.9rem;
    padding: 5px 0;
    overflow-x: auto !important;
    p {
      overflow-x: auto !important;
      white-space: nowrap;
      display: flex;
      padding-left: 10px;
    }
    span {
      margin: 0 20px;
    }
  }
}
.mo-list-slost {
  margin: 30px 0;
  border-radius: 10PX;
  background-color: #fff;
  overflow: hidden;
}
.mo-sort {
  float: left;
  padding: 0 20px;
  font-size: 0.34rem;
  span {
    float: left;
    margin-right: 20px;
    line-height: 0.8rem;
  }
}
.mo-count {
  float: right;
  font-size: 0.3rem;
  margin-right: 20px;
  line-height: 0.8rem;
  span {
    font-weight: 600;
    color: #0bbe06;
  }
}
.mo-slost-active {
  font-weight: 600;
  color: #0bbe06;
}

.mo-list {
  width: 100%;
  @include fj();
  padding: 0 0.1rem;
}
.mo-sort222 {
  border-radius: 10PX;
  background-color: #fff;
  margin: 20px 0;
}
.van-pagination__item {
  color: #0bbe06;
}
.van-pagination__item:active {
  background-color: #0bbe06;
}
.screen-img{
  text-align: right;
  height: .6rem;
  font-size: .3rem;
  line-height: .6rem;
  margin-top: .1rem;
  img{
    height: .4rem;
    margin-top: .1rem;
  }
  span{
    margin-right: .3rem;
  }
}
.movie-topnav2{
  margin-top: .1rem;
}
</style>