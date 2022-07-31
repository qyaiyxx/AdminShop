<template>
  <div>
    <el-table :data="data.tableData" :border="false" size="small" style="width: 100%">
      <el-table-column prop="product_name" label="商品名称" width="180" />
      <el-table-column prop="single_price" label="商品单价" />
      <el-table-column prop="num" label="商品数量" width="100" />
    </el-table>
  </div>
</template>

<script setup>
import orders from "../../services/api/orders/orders";
import { reactive } from "@vue/reactivity";
import { onMounted } from "vue";
onMounted(async () => {
  if (data.tableData.length > 0) {
    return;
  }
  const result = await orders.getordersdefila({ orderid: props.itemprops });
  data.tableData = result.result;
});
const props = defineProps({
  itemprops: String,
});
const data = reactive({
  tableData: [],
});
</script>
<style lang="less"></style>
