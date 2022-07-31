<!--
 * @Author: qqq
 * @Date: 2021-09-20 01:57:54
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-20 04:49:46
 * @Description: file content
-->
<template>
  <div>
    <el-breadcrumb separator="/user">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="userbody">
      <el-row class="sercahuser">
        <el-col :span="12" :offset="16">
          <div class="userelcol">
            <el-input
              v-model="data.selectuser"
              size="mini"
              placeholder="用户搜索"
              clearable
              @clear="getuserlist"
              prefix-icon="el-icon-search"
              class="twoinput"
            />
            <el-button type="primary" size="mini" @click="seluser" plain
              >搜索</el-button
            >
          </div>
        </el-col>
      </el-row>
      <UserList :user="data.userlist" @deuser="deleteuser" @upuser="openupdateuser"></UserList>
      <el-row>
        <el-col :span="12" :offset="12"
          ><el-pagination
            small
            background
            v-model:currentPage="data.currentPage"
            :page-size="100"
            layout="total,prev, pager, next, jumper"
            :total="data.total"
            @current-change="currentpage"
          >
          </el-pagination
        ></el-col>
      </el-row>
      <UpdatDialog :userdialogch="data.userdialog" @ch-upuser="updateuser" :userupdatech="data.userupdate"></UpdatDialog>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "vue";
import user from "@/services/api/user/user.js";
import UserList from '../components/user/UserLsit.vue';
import UpdatDialog from '../components/user/UpdataDialog.vue';
const { proxy } = getCurrentInstance();
const cityOptions = [
  { name: "正常", id: 1 },
  { name: "1正常", id: 2 },
  { name: "2正常", id: 3 },
];
const data = reactive({
  userlist: [],
  currentPage: 1,
  total: 0,
  selectuser: "",
  userdialog: false,
  userupdate: {},
});

onMounted(async () => {
  getuserlist();
});
const openupdateuser = (user) => {
  data.userupdate = user;
  data.userdialog = true;
};
const updateuser =async (userupdate) => {
  const result = await user.updateuser({user:userupdate});
  if (result.code == "200") {
    proxy.message.success(result.msg);
    data.userdialog = false;
    getuserlist();
  } else {
    proxy.message.seuccess(result.msg);
  }
};
const deleteuser = async (userid) => {
  const result = await user.deleteuser({ userid });
  if (result.code == "1") {
    proxy.message.success(result.msg);
    getuserlist();
  } else {
    proxy.message.seuccess(result.msg);
  }
};
const getuserlist = async () => {
  const result = await user.getuserlist({ page: data.currentPage });
  data.userlist = result.data.result;
  data.total = result.data.total;
};
const seluser = async () => {
  data.currentPage = 1;
  const result = await user.selectuser({
    page: data.currentPage,
    seluser: data.selectuser,
  });
  data.userlist = result.data.result;
  data.total = result.data.total;
};
const currentpage = async (valpage) => {
  data.currentPage = valpage;
  if (data.selectuser == "") {
    getuserlist();
    return;
  }
  seluser();
};
</script>

<style lang="less" scoped>
.twopxinput {
  width: 200px;
}
.userbody {
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.userelrow {
  display: flex;
  justify-content: space-evenly;
}
.userelcol {
  margin: 15px 0 15px 0;
  width: 300px;
  display: flex;
  justify-content: space-evenly;
  div {
    width: auto;
  }
}
.usertable {
  margin: 0 !important;
}
.sercahuser{
  justify-content: flex-end;
  .el-col{
    flex: inherit;
    margin:10px  5px 10px 0;
    
  }
}
</style>