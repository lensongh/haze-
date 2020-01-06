<template>
  <div class="bill-main">
    <van-nav-bar
      title="排行榜"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="bill-main2">
      <van-tabs v-model="active" animated>
        <van-tab
          v-for="(item,i) in bannlist"
          :to="{name:item.path,query:{listtype:item.type}}"
          :key="i"
          :title="item.title"
        >
          <router-view></router-view>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      bannlist: [
        { title: "电影", path: "billmovie", type: "1" },
        { title: "电视剧", path: "billmovie", type: "2" },
        { title: "综艺", path: "billmovie", type: "3" },
        { title: "动漫", path: "billmovie", type: "4" }
      ]
    };
  },
  created() {
     this.letright();
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
    letright(){
     let listtype = this.$route.query.listtype;
      this.active = listtype -1;

    },
  },
   watch: {
    $route: {
      handler: function(val, oldVal) {
        if(val.name == 'billmovie'){
         
          
          this.letright();
         

        }
      },
      // 深度观察监听
      deep: true
    }
  },
};
</script>
<style lang="scss" scoped>
.bill-main {
  width: 100%;
  min-height: 100%;

  background-image: url(../../common/img/billmovie.png);
}
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
.bill-main2 {
  margin-top: 0.8rem;
  overflow: hidden;
}
/deep/.van-tabs__wrap {
  width: 5rem;
  margin: 30px auto;
  height: 60px;
}
/deep/.van-tab--active {
  background-color: #fff;
  border-radius: 20PX;
  color: #000000;
}
/deep/.van-tab--active .van-ellipsis {
  color: #000;
}
/deep/.van-tab {
  line-height: 60px;
  overflow: hidden;
}
/deep/.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: 0px;
}
/deep/.van-ellipsis {
  color: #fff;
}
/deep/.van-tabs__nav {
  background-color: rgba($color: #000000, $alpha: 0);
}
/deep/.van-tabs__line {
  background-color: rgba($color: #000000, $alpha: 0);
}
</style>