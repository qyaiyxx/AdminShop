<!--
 * @Author: qqq
 * @Date: 2021-09-21 02:19:12
 * @LastEditors: qqqq
 * @LastEditTime: 2021-09-23 19:08:44
 * @Description: file content
-->
<template>
  <div class="login">
    <div class="opacity">
      <div class="fromlogo">
        <img src="/image/logo.gif" />
      </div>
      <div class="formbody">
        <div style="margin-bottom: 25px; font-family: Hiragino Sans GB">
          星星后台
        </div>
        <el-form  :model="user" label-width="80px">

          <el-input
            v-model="user.iphone"
            size="small"
            placeholder="请输入账号"
          ></el-input>
  
          <el-input
            placeholder="请输入密码"
            size="small"
            v-model="user.password"
            show-password
          ></el-input>
          <el-button type="primary" @keydown.enter="submit" @click="submit" size="small" 
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {  reactive,getCurrentInstance } from "vue";
import users from "../services/api/user/user.js";
import { useRouter } from "vue-router";
import {setloca} from '../uitls/storageuitl'

export default {

  setup() {
    const {proxy}=getCurrentInstance()
    const router=useRouter()
    const user = reactive({
      user: { iphone: "", password:"" },
    });

    const submit = async() => {
      const result=await users.userlogin(user);
      if(result.code==="200"){
        setloca('token',result.token)
        router.push({path:'/home'})
      }else{
        proxy.message.warning(result.msg)
      }
    };

    return { user, submit };
  },
};
</script>

<style lang="less" scoped>
.login {
  background-image: url("/image/backlogin.jpeg");
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.opacity {
  width: 250px;
  height: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  opacity: 0.6;
  background: #87cefa;
}
.fromlogo {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.fromlogo {
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
}
.formbody {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .el-form {
    width: 85%;
    button {
      width: 212.5px;
    }
    div {
      margin-bottom: 22px;
    }
  }
}
</style>