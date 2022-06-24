<template>
  <el-row :gutter="20" class="usertable">
        <el-col>
          <div>
            <el-table height="600" :data="user" border size="mini">
              <el-table-column prop="user_id" label="ID" width="80">
              </el-table-column>
              <el-table-column prop="user_name" label="昵称" width="180">
              </el-table-column>
              <el-table-column prop="user_phone" label="Phone">
              </el-table-column>
              <el-table-column prop="user_type" label="状态">
                <template #default="scope">
                  <el-tag type="success" v-if="scope.row.user_type == 1"
                    >正常</el-tag
                  >
                  <el-tag type="info" v-else-if="scope.row.user_type == 2"
                    >冻结</el-tag
                  >
                  <el-tag type="danger" v-else>封禁</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="user_sex" label="性别">
                <template #default="scope">
                  <el-tag color="#E9F6F4" v-if="scope.row.user_sex == 1"
                    >男孩子</el-tag
                  >
                  <el-tag color="#F8E4E5" v-else-if="scope.row.user_sex ==2">女孩子</el-tag>
                  <el-tag color="#F8E4E5" v-else>未知星人</el-tag>
                </template>
              </el-table-column>

              <el-table-column prop="reg_time" label="注册时间">
              </el-table-column>
              <el-table-column prop="aa" label="操作">
                <template #default="scope">
                  <el-row class="userelrow">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      circle
                      @click="openupdata(scope.row)"
                    ></el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      circle
                      @click="deleteuser(scope.row.user_id)"
                    ></el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
</template>

<script setup>
import { ref, toRefs } from "@vue/reactivity"
import { createApp } from "@vue/runtime-dom"
defineProps({
    user:Array,
})
const emit = defineEmits()
const openupdateuser = (user) => {
  data.userupdate = user;
  data.userdialog = true;
};
const openupdata=(data)=>{
    emit('upuser', data)
}
const deleteuser=(data)=>{
    console.log(data)
    emit('deuser', data)
}
</script>

<style>

</style>