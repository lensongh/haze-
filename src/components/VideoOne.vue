<template>
  <div class="video-li">
    <!-- <img  v-lazy='title.cover' alt /> -->
    <div class="img" :style="{backgroundImage: 'url(' + title.cover + ')'}"></div>
    <span v-if="title.type == 1">{{title.sharpness=='未知' ||title.sharpness== null ?'高清':title.sharpness}}</span>
    <span v-if="title.type == 2">已更新到{{title.totalCount}}集</span>
    <span v-if="title.type == 3">已更新到{{title.totalCount}}期</span>
    <span v-if="title.type == 4">已更新到{{title.totalCount}}集</span>
    <p>{{title.title}}</p>
    <h6>{{title.grade?title.grade:'6.0'}}</h6>
    <p v-if="title.isVip" class="vip-span">
      <img src="../common/img/vip.png" alt />
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    console.log(this.title);
    
  }
};
</script>
<style lang="scss" scope>
.c {
  width: 100%;
  @include fj();
  //  justify-content:space-around;
  padding: 0 0.1rem;
}
.video-li {
  width: 30%;
  // height: 3.2rem;
  // background-color: antiquewhite;
  margin: 0.12rem;
  position: relative;
  // img{
  //    width: 100%;
  //   height: 3.2rem;
  //   border-radius: 5PX;
  // }
  .img {
    width: 100%;
    height: 3.2rem;
    border-radius: 5PX;
    background-position: 50% 50%;
    background-size: cover;
  }
  p {
    line-height: 0.56rem;
    font-size: 0.26rem;
    @include ell();
  }
  span {
    position: absolute;
    bottom: 0.56rem;
    left: 0;
    right: 0;
    font-size: 0.2rem;
    padding: 0.1rem 0;
    color: #fff;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    border-radius: 5PX;
  }
  h6 {
    position: absolute;
    top: 0.22rem;
    left: -0.1rem;
    font-weight: 600;
    color: #fff;
    font-size: 0.26rem;
    line-height: 0.32rem;
    width: 0.64rem;
    background-color: #0bbe06;
  }
  h6:before {
    content: "";
    position: absolute;
    top: 0.28rem;
    left: 0.01rem;
    border-top: 0.1rem solid #0bbe06;
    border-left: 0.1rem solid transparent;
  }
  .vip-span {
    position: absolute;
    top: 0;
    width: 0.6rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-weight: normal;
    right: 0.2rem;
    img {
      width: 100%;
    }
  }
}
</style>