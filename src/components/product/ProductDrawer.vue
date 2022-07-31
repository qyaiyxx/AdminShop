<template>
  <el-drawer
    size="60%"
    v-model="drawer"
    title="I am the title"
    :with-header="false"
    direction="ttb"
  >
    <div class="drawerform">
      <el-form
        class="prodfrom"
        ref="data.productcalss"
        :model="data.productcalss"
        label-width="80px"
      >
        <el-form-item label="列表名称">
          <el-input size="mini" v-model="data.productcalss.category_name"></el-input>
        </el-form-item>
        <el-form-item label="列表描述">
          <el-input size="mini" v-model="data.productcalss.category_info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit"
            >立即添加</el-button
          >
          <el-button @click="onclosedrawer" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
const emits = defineEmits(["closedrawer","upprodut"]);
const data = reactive({
  productcalss:{}
});
defineProps({
  drawer: Boolean,
});
const onSubmit = () => {
  emits("upprodut",data.productcalss);
  data.productcalss = {};
};
const onclosedrawer = () => {
  emits("closedrawer");
};
</script>

<style>
.drawerform {
  width: 30%;
  margin: auto;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  height: 320px;
  align-items: center;
}
.ttb{
  height: fit-content;
}
</style>