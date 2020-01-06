<template>
  <div>
    <van-nav-bar
      title="APP下载"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="xiaza" @click="downmh()">
      <img src="../../common/img/xiazaiye.jpg" alt />
    </div>
  </div>
</template>
<script>
export default {
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
    downmh() {
      window.open("https://mhys.app/");

    }
  }
};
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
.xiaza {
  margin-top: 0.8rem;
  img {
    width: 100%;
  }
}
</style>