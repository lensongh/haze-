<template>
  <div class="changeMsg">
      <van-nav-bar
      title="完善信息"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <p class="person">个人资料</p>
    <div class="usericon">
      <span>头像</span>
      <el-upload
        :data="upLoadData"
        class="avatar-uploader"
        :action="action"
        :headers="token"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div class="nickname">
      <span style="margin-left:0.5rem">昵称</span>
      <input type="text" name="nickname" v-model="nickname" />
    </div>

    <div class="gender">
      <span style="margin-left:-0.1rem">性别</span>
      <van-radio-group class="radio" style="margin-top:10px" v-model="radio">
        <van-radio name="M">男</van-radio>
        <van-radio name="F">女</van-radio>
      </van-radio-group>
    </div>

    <div class="indro">
      <p>个人简介</p>
      <van-cell-group>
        <van-field
          v-model="message"
          style="font-size:14px;padding-top:20px; line-height:20px;"
          rows="2"
          autosize
          type="textarea"
        />
      </van-cell-group>
    </div>

    <div class="btns">
      <button class="later" @click="later">以后再说</button>
      <button class="save" @click="save">保存</button>
    </div>
   
    <loading v-show="thisloading"></loading>
  </div>
</template>

<script>
import { userinfo, updateUser, upload } from "@/api/index.js";
import { Divider } from "vant";
import { Field } from "vant";
import { Toast } from "vant";
import { Uploader } from "vant";
import { log } from "util";
import listone from "../../components/VideoOne";
// import Cookies from 'js-cookie'
export default {
  data() {
    return {
      action: "http://103.100.142.208:8022/videosite/user/upload/portrait",
      imageUrl: require("../../common/img/270x405.jpg"),
      nickname: "",
      radio: "",
      message: "",
      upLoadData: {
        oldFilePath: null
      },
      token: {
        token:localStorage.getItem('token')
      },
      filedata: "",
      thisloading:true,
    };
  },
   components: {
    listone,
   
  },
  created() {
    this.getUserMsg();
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
    getUserMsg() {
      userinfo().then(res => {
        this.thisloading=false;
        this.nickname = res.data.nickname;
        if (res.data.userIcon == null) {
          return;
        } else {
          this.imageUrl = 'http://'+res.data.userIcon;
        }
        this.message = res.data.profile;
        this.radio = res.data.gender;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;
      let flag = true;
      if (!isJPG && !isPNG) {
        flag = false;
        this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return flag && isLt2M;
    },
    later() {
      window.history.go(-1);
    },
    save() {
      updateUser(this.nickname, this.radio, this.imageUrl, this.message).then(
        res => {
          if (res.code == 1000) {
            Toast.success("修改成功");
            window.history.go(-1);
          } else {
            Toast.success("修改失败，请稍后再试");
            window.history.go(-1);
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.changeMsg {
  height: 100%;
  width: 100%;
  background-color: #f5f9fa;
  .header {
    background-color: #000;
    font-size: 0.4rem;
    color: #fff;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .person {
    font-size: 0.3rem;
    text-align: left;
    height: 0.6rem;
    width: 100%;
    line-height: 0.6rem;
    text-indent: 0.2rem;
    color: #d3d5d6;
  }
  .usericon {
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    font-size: 0.3rem;
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1PX solid #eee;
    .avatar-uploader {
      border-radius: 50%;
    }
    .avatar {
      margin-top: 20px;
      width: 150px;
      height: 150px;
      border-radius: 75px;
    }
  }
  .nickname {
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1rem;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    border-bottom: 1PX solid #eee;
    input {
      border: none;
      text-indent: 1rem;
    }
  }
  .gender {
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1rem;
    .radio {
      display: flex;
      justify-content: space-around;
    }
  }
  .indro {
    font-size: 0.3rem;
    color: #000;
    text-align: left;
    text-indent: 0.2rem;
    height: 0.5rem;
    line-height: 0.5rem;
    margin-bottom: 2rem;
  }
  .btns {
    width: 100%;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-around;
    .later {
      background-color: #e4e3e8;
      border: none;
      width: 3rem;
      height: 0.8rem;
      border-radius: 0.2rem;
      color: #a9a9a9;
    }
    .save {
      background-color: #42b983;
      border: none;
      width: 3rem;
      height: 0.8rem;
      border-radius: 0.2rem;
      color: #fff;
    }
  }
}
</style>