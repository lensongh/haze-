<template>
  <layouts>
       <!-- <transition :name="transitionName"> -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" ></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" ></router-view>
        <!-- </transition>      -->
  </layouts>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import layouts from "../layouts/index.vue";
// import { getIndex } from "api/index";
// import { Toast } from "mint-ui";
export default {
  name: "home",
  components: {
    HelloWorld,
    layouts
  },
  computed: {
        transitionName() {
            return this.$store.state.direction
        }
    },
  //   async created() {
  //     try {
  //       await getIndex({ pageSiza: 100, num: 10 });
  //     } catch (err) {
  //       Toast({
  //         message: "这里是home页面的error提示",
  //         position: "bottom",
  //         duration: 2000
  //       });
  //     }
  //   },
  mounted() {},
  methods: {
    // async test2333() {
    //   try {
    //     await getIndex({ pageSiza: 100, num: 10 });
    //   } catch (err) {
    //     Toast({
    //       message: "这里是home页面状态码不为200的error提示",
    //       position: "bottom",
    //       duration: 7000
    //     });
    //     console.log("err", err);
    //   }
    // }
  }
};
</script>
