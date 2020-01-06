<template>
  <div class="cl" style="background-color: #fff;">
    <div class="cl">
      <div class="logo" @click="gotologo()">
        <img src="../common/img/logo.jpg" alt />
      </div>
      <div class="history" @click="history = !history">
        <svg-icon iconClass="history" class="icon" />
      </div>
      <div class="seach" @click="gotoseach()">
        <svg-icon iconClass="search" class="icon" />
      </div>
      <div v-show="myShow" class="my-logo" @click="gotomylogin()">
        <svg-icon iconClass="my" class="icon" />
      </div>
      <div v-show="!myShow" class="my" @click="gotomy()">
        <svg-icon iconClass="my" class="icon" />
      </div>
      <div class="billboard" @click="gotobillboard()">
        <svg-icon iconClass="billboard" class="icon" />
      </div>
    </div>

    <div class="cl">
      <div class="tab-left">
        <ly-tab v-model="selectedId" :items="items" :options="options" @change="handleChange"></ly-tab>
      </div>
      <div class="tab-right" @click="topnav = !topnav">
        <svg-icon iconClass="more" class="icon" />
      </div>
    </div>
    <transition
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated fadeOutDown"
    >
      <div class="titer-nav" v-show="topnav">
        <span v-for="(item,i) in items" :key="i" @click="gotohandleChange(item)">{{item.label}}</span>
      </div>
    </transition>
    <van-action-sheet v-model="history" title="观看记录">
      <div class="clear cl">
        <span>历史记录</span>
        <span class="clear-right" @click="Clearhistory">清空</span>
      </div>
      <p class="clear-p" @click="gopayvideo(item)" v-for="(item,i) in hois" :key="i">{{item.title}}</p>
    </van-action-sheet>
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="block-img">
            <img :src="blockimg" alt />
          </div>
          <div class="block-xx" @click="show = false">
            <van-icon name="cross" />
          </div>
          <div class="bolck-cooder">
            <h2>登录/注册</h2>
            <van-field
              class="input"
              type="tel"
              v-model="phone"
              label="+86 "
              autofocus
              clearable
              placeholder="请输入手机号"
            />
            <div class="input-div">
              <input class="input" type="text" maxlength="6" placeholder="请输入验证码" v-model="code" />
              <div v-show="Verification" class="cooder" @click="handleClick">获取验证码</div>
              <div v-show="!Verification" class="cooder">{{timer}}S</div>
            </div>
            <div class="input-div2">
              <input type="text" maxlength="6" placeholder="请输入邀请码，可不填" v-model="Invitation" />
            </div>
            <button class="btn" @click="sumbit" :disabled="isdisabledFn">登录/注册</button>
            <p>输入手机号获取验证码自动注册哦！！！</p>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
import { loginByPhone, sendCode } from "@/api/index.js";
import { setStore, getStore } from "../common/js/util.js";
export default {
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "首页", name: "homeone", type: "0" },
        { label: "电视剧", name: "movie", type: "2" },
        { label: "电影", name: "movie", type: "1" },
        { label: "综艺", name: "movie", type: "3" },
        { label: "动漫", name: "movie", type: "4" },
        // { label: "会员", name: "member", type: "5" },
        { label: "留言", name: "message", type: "6" },
        { label: "APP下载", name: "appdown", type: "7" }
      ],
      options: {
        activeColor: "#0bbe06"
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      topnav: false,
      history: false,
      show: false,
      blockimgList: [
        require("../common/img/one.png"),
        require("../common/img/two.png"),
        require("../common/img/there.png")
      ],
      blockimg: require("../common/img/one.png"),
      Verification: true,
      phone: "",
      code: "",
      timer: 60, //定义初始时间为60s
      myShow: true,
      hois: JSON.parse(getStore("hoisObj")),
      isdisabledFn: false,
      Invitation: ""
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        
        if(val.name == 'home' || val.name == 'movie'){
          document.getElementById('content-container').scrollTop=0;  
        }
        this.hois=JSON.parse(getStore("hoisObj"));
        this.getchannelall();
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.getchannelall();
    if (getStore("token")) {
      this.myShow = false;
    } else {
      this.myShow = true;
    }
  },
  methods: {
    handleClick() {
      this.blockimg = this.blockimgList[1];
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.phone)) {
        Toast({
          message: "手机格式不正确",
          duration: 3000
        });
        return false;
      }
      this.Verification = false; //点击button改变v-show的状态
      this.timer = 60;
      this.blockimg = this.blockimgList[2];
      let auth_timer = setInterval(() => {
        //定时器设置每秒递减
        this.timer--; //递减时间
        if (this.timer <= 0) {
          this.blockimg = this.blockimgList[0];
          this.Verification = true; //60s时间结束还原v-show状态并清除定时器
          clearInterval(auth_timer);
        }
      }, 1000);
      sendCode(this.phone).then(res => {
        Toast({
          message: res.message,

          duration: 3000
        });
      });
    },

    sumbit() {
      this.isdisabledFn = true;
      this.blockimg = this.blockimgList[2];
      var reg = /^1[3456789]\d{9}$/;
      if (this.code != "" && this.phone != "") {
        if (reg.test(this.phone)) {
          loginByPhone({
            phone: this.phone,
            verifyCode: this.code,
            inviteCode: this.Invitation
          }).then(res => {
            if (res.code == 1000) {
              this.isdisabledFn = false;
              setStore("user", res.data.userInfo);
              setStore("token", res.data.token);
              // Cookies.set("token", res.data.token, { expires: 2 });
              //  sessionStorage.setItem("token", res.data.token);
              // localStorage.setItem("user", JSON.stringify(res.data.userInfo));
              this.show = false;
              this.myShow = false;
            }
          });
        } else {
          Toast({
            message: "手机格式不正确",

            duration: 3000
          });
        }
      } else {
        Toast({
          message: "请输入手机号或验证码",

          duration: 3000
        });
      }
    },

    getchannelall() {
      var type = this.$route.query;

      if (type.type) {
        var list = this.items;
        for (let i in list) {
          if (list[i].type == type.type) {
            this.selectedId = i * 1;
          }
        }
      } else {
        //  this.selectedId=0;
      }
    },

    gotologo() {
      this.$router.push({
        name: `home`
      });
    },

    gotoseach() {
      this.$router.push({ name: "search" });
    },
    gotomylogin() {
      this.show = true;
    },
    gotomy() {
      this.$router.push({
        name: `my`
      });
    },
    gotobillboard() {
      this.$router.push({
        name: `billmovie`,
        query: {
          listtype: "1"
        }
      });
    },
    gotohandleChange(item) {
      this.$router.push({
        name: item.name,
        query: {
          type: item.type
        }
      });
      this.topnav = !this.topnav;
    },
    handleChange(item, index) {
      this.$router.push({
        name: item.name,
        query: {
          type: item.type
        }
      });
    },
    Clearhistory() {
      this.hois = [];
      setStore("hoisObj", []);
    },
    gopayvideo(item) {
      var user = JSON.parse(getStore("user"));
      if (item.isVip) {
        if (getStore("token")) {
          if (user.viewCount >= 1) {
            this.$router.push({
              name: "playvideo",
              query: {
                codeNum: item.codeNum,
                videoCode: item.code,
                fant: item.code
              }
            });
            // 观看次数
          } else {
            Dialog.confirm({
              title: "温馨提示",
              message:
                "您的会员观影次数不够，是否邀请更多好友，获得会员观影次数？"
            })
              .then(() => {
                this.$router.push({
                  name: "my"
                });

                // on confirm
              })
              .catch(() => {
                // on cancel
              });

            // 没有观看次数
          }
        } else {
          Dialog.confirm({
            title: "温馨提示",
            message: "尊敬的用户，会员视频登录后开放"
          })
            .then(() => {
              // this.$router.push({
              //   name: "member"
              // });

              // on confirm
            })
            .catch(() => {
              // on cancel
            });
        }
      } else {
        this.$router.push({
          name: "playvideo",
          query: {
            codeNum: item.codeNum,
            videoCode: item.code
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scope>
.ly-tab {
  background-color: #fff;
  // height: 1rem;
  width: 100%;
  z-index: 999;
  .ly-tabbar {
    background-color: rgb(255, 255, 255);
    border-bottom: 0;
    box-shadow: none;
    color: #000;
    // line-height: 1rem;
    //  height: 1rem;
  }
  .ly-tab-list {
    padding: 8px 6px;
  }
  .ly-tab-item {
    color: #000;
    font-size: 0.36rem;
    line-height: 0.6rem;
  }
  .ly-tab-active-bar {
    bottom: 0.06rem;
  }
  // .ly-tab-item {
  //   font-size: 0.36rem;
  // }
  .ly-tab-item {
    margin-left: 0.3rem;
  }
  .ly-tab-item:not(:first-child) {
    margin-left: 0.3rem;
  }
}
.tab-left {
  float: left;
  width: calc(100% - 0.82rem);
}
.tab-right {
  margin: 4px 0;
  padding: 16px 0;
  width: 0.8rem;
  float: right;
  font-size: 35px;
  line-height: calc(0.85rem - 48px);
  box-shadow: -0.1rem 0rem 0.1rem -0.1rem rgba(0, 0, 0, 0.3);
}
.logo {
  float: left;
  // width: 1rem;
  height: 80px;
  line-height: 80px;
  img {
    margin-top: 0.1rem;
    height: 0.8rem;
    margin-left: 0.3rem;
  }
}
.seach {
  float: right;
  line-height: 1rem;
  font-size: 0.4rem;
  color: #000;
  margin-right: 0.3rem;
}
.my-logo {
  float: right;
  line-height: 1rem;
  font-size: 0.4rem;
  color: #000;
  margin-right: 0.3rem;
}
.billboard {
  float: right;
  line-height: 1rem;
  font-size: 0.42rem;
  color: #000;
  margin-right: 0.3rem;
}
.history {
  float: right;
  line-height: 1rem;
  font-size: 0.43rem;
  color: #000;
  margin-right: 0.3rem;
}
.titer-nav {
  // background-color: aqua;
  @include fj();
  border-top: 1PX solid #e2e2e2;
  span {
    width: 25%;
    line-height: 0.8rem;
    box-sizing: border-box;
    font-size: 0.3rem;
    border-bottom: 1PX solid #e2e2e2;
    border-right: 1PX solid #e2e2e2;
  }
}

.van-action-sheet {
  min-height: 60%;
  font-size: 0.3rem;
}
.clear {
  padding: 0 30px;
  line-height: 80px;
  border-bottom: 1PX solid #ebedf0;
  span {
    float: left;
  }
  .clear-right {
    float: right;
  }
}
.clear-p {
  line-height: 80px;
  border-bottom: 1PX solid #ebedf0;
  padding: 0 30px;
  text-align: left;
  @include ell();
}

.my {
  float: right;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.25rem;
  border-radius: 50%;
  font-size: 0.43rem;
  color: #000;
  margin-right: 0.3rem;
  overflow: hidden;
  border: 1PX solid #000;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 85%;
  // height: 120px;
  background-color: #fff;
  font-size: 0.3rem;
  position: relative;
  border-radius: 8PX;
  .block-img {
    position: absolute;
    top: -1.6rem;
    left: 0;
    right: 0;
    img {
      width: 2.4rem;
    }
  }
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.block-xx {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  font-size: 0.4rem;
}
.bolck-cooder {
  padding: 30px 40px;

  h2 {
    text-align: left;
    font-size: 0.32rem;
    line-height: 0.8rem;
  }
  .input {
    margin-top: 0.2rem;
    border: 1PX solid #e9e9e9;
    padding: 20px;
    border-radius: 4PX;
    width: 100%;
  }
  .input-div {
    position: relative;
  }
  .cooder {
    position: absolute;
    right: 0.2rem;
    top: 0.45rem;
  }
  .btn {
    margin: 20px 0;
    width: 100%;
    color: #fff;
    background-color: #007fff;
    border-radius: 4PX;
    outline: none;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 0.8rem;
  }
  p {
    margin: 10px 0;
    font-size: 0.2rem;
    text-align: left;
  }
}
.van-cell {
  line-height: 0.3rem !important;
  font-size: 0.3rem !important;
}
.van-field__label {
  width: 0.6rem !important;
  margin-top: 0.04rem;
  color: rgb(11, 190, 6);
}
.van-field__control {
  padding-left: 0.2rem !important;
}
.input-div2 {
  input {
    border: 0;
    margin-top: 0.2rem;
    border: 1PX solid #e9e9e9;
    padding: 0.2rem;
    border-radius: 4PX;
    width: 100%;
  }
}
</style>