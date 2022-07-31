<!--
 * @Author: qqq
 * @Date: 2021-09-23 10:42:48
 * @LastEditors: qqqq
 * @LastEditTime: 2021-09-23 10:42:48
 * @Description: file content
-->
<template>
  <div class="shiocartbody">
    <el-table
      :data="data.tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="height" label="身高" />
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";

const data = reactive({
  tableData: [
    {
      id: "12987122",
      name: "za",
      height: "194",
    },
    {
      id: "12987122",
      name: "zb",
      height: "194",
    },
    {
      id: "12987122",
      name: "zc",
      height: "194",
    },
    {
      id: "12987123",
      name: "ls",
      height: "165",
    },
    {
      id: "12987124",
      name: "ww",
      height: "174",
    },
  ],
});
const objectSpanMethod = (opt, rowspan, colspan) => {
  console.log(opt);
  if (opt.row.id === "12987122") {
    return {
      rowspan: 2,
      colspan: 1,
    };
  }else{
      return {
      rowspan: 1,
      colspan: 1,
    };
  }
};
</script>

<style lang="less" scoped>
.shiocartbody {
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
