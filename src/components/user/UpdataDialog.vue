<template>
  <el-dialog v-model="userdialogch" width="70%">
        <el-descriptions title="修改信息">
          <el-descriptions-item label="id">{{
            userupdatech.user_id
          }}</el-descriptions-item>
          <el-descriptions-item label="电话"
            ><el-input
              size="mini"
              class="twopxinput"
              v-model="userupdatech.user_phone"
          /></el-descriptions-item>
          <el-descriptions-item label="昵称"
            ><el-input
              size="mini"
              class="twopxinput"
              v-model="userupdatech.user_name"
          /></el-descriptions-item>
          <el-descriptions-item label="性别">
            <el-tag
              size="mini"
              color="#E9F6F4"
              v-if="userupdatech.user_sex == 1"
              >男孩子</el-tag
            >
            <el-tag size="mini" color="#F8E4E5" v-else-if="userupdatech.user_sex ==2">女孩子</el-tag>
            <el-tag size="mini" color="#FFF" v-else>未知星人</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="账号状态"
            ><el-radio-group  v-model="userupdatech.user_type" size="mini">
              <el-radio-button label="1">正常</el-radio-button>
              <el-radio-button label="2">冻结</el-radio-button>
              <el-radio-button label="3">封禁</el-radio-button>
            </el-radio-group
          ></el-descriptions-item>
          <el-descriptions-item>
            <el-button
              style="margin-top: 20px"
              size="small"
              @click="updateuser()"
              type="primary"
              >修改</el-button
            >
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
</template>

<script setup>
const props=defineProps({
  userdialogch: Boolean,
  userupdatech:Object
})
const emits=defineEmits(['ch-upuser'])
const updateuser=()=>{
  emits('ch-upuser',props.userupdatech)
}
</script>

<style>

</style>