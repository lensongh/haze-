<template>
  <div class="tab-bar">
    <div
      v-for="(item, idx) in tabs"
      :key="idx"
      :class="['bar-item', tabBar === item.name ? 'active':'']"
      @click="clickHandler(item.name)"
    >
      <svg-icon :iconClass="item.icon" class="icon" />

      <div class="label">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
import { sessionGetItem } from "../common/js/util";

export default {
  data() {
    return {
      tabs: [
        {
          label: "首页",
          icon: "homeone",
          name: "home"
        },
        {
          label: "APP下载",
          icon: "appdownloadone",

          name: "app"
        }
      ],
      tabBar: sessionGetItem("tabBar") || "home"
    };
  },
  watch: {
    $route(to, from) {
      if (["home", "app"].includes(to.name)) {
        this.tabBar = to.name;
      }
    }
  },
  methods: {
    clickHandler(routerName) {
      this.tabBar = routerName;
      if (routerName == "app") {
        this.$router.push({ name: "appdown" });
      } else {
        this.$router.push({ name: routerName ,query: {
             type: "0"
          }});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90px;
  background-color: #fff;
  //  @include border-top();
  .bar-item {
    flex: 1;
    font-size: 24px;
    text-align: center;
    .icon {
      font-size: 46px;
    }
    .label {
      margin-top: 0.03rem;
    }
  }
  .bar-item.active {
    color: #0bbe06;
  }
}
</style>
