<template>
  <div class="layout-container">
    <footBar class="top-nav"></footBar>
    <div class="content-container" id="content-container">
      <slot></slot>
    </div>
    <TabBar class="bottem-nav" />
  </div>
</template>

<script>
import TabBar from "./tabBar";
import footBar from "./footerBar";
export default {
  name: "Layout",
  components: {
    TabBar,
    footBar
  },
  data() {
    return {};
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  .top-nav {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
  }
  .content-container {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .bottem-nav {
    display: flex;
    display: -webkit-flex;
  }
}
</style>
