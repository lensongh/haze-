<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
            </keep-alive>
           
        </transition>
        <transition :name="transitionName">
                 <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
         </transition>
         <!-- <transition :name="transitionName" >

<keep-alive >

<router-view  v-if="$route.meta.keepAlive"></router-view>

<router-view  v-if="!$route.meta.keepAlive" :key="'time'+new Date().getTime()"></router-view>

</keep-alive>

</transition> -->

    </div>
</template>

<script>


import {encrypt,getStore,setStore} from "./common/js/util";
import {userinfo} from '@/api/index.js'
export default {
    name: 'app',
    computed: {
        transitionName() {
            return this.$store.state.direction
        }
    },
    created() {
      
    },
    methods: {
        getuserinfo(){
       userinfo({}).then(res=>{
         
        localStorage.setItem("user", JSON.stringify(res.data));
       })
     },
    },
    watch: {
    '$route': function(to,from){ 
        if(getStore('token')){
            this.getuserinfo();

        }
    }
  },
};
</script>
<style lang="scss">
@import "./node_modules/normalize.css/normalize";
@import "style/common.scss";
// @import "style/_variables.scss";
html,body{
    height: 100%;
}



#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100%;
    color: #2c3e50;
}
#nav {
    a {
        font-weight: bold;
        color: #2c3e50;
        font-size: 32px;
        &.router-link-exact-active {
            color: $color-main;
        }
    }
}
h3 {
    font-size: 18px;
}

.router{
  width: 100%;
  height: 100%;
  height: 100vh;
  overflow: scroll;
  position: absolute;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  background: #f0f0f0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f2f2f2;
}
</style>
