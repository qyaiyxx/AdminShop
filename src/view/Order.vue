<template>
  <div class="userbody">
    <el-row class="sercahuser">
      <el-col :span="8" :offset="15">
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
      <el-col>
        <Orderlist @openedit="openedit" :orderlist="data.orderlist"></Orderlist>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import orders from "../services/api/orders/orders";
import Orderlist from "../components/order/OrderList.vue";
import { onMounted } from "@vue/runtime-core";
const data = reactive({
  selectuser: "",
  tableData: [],
  orderlist: [],
  drawer:false,
  orderdetail:null,
});
onMounted(() => {
 getorderslist(); 
});
const openedit=(opt)=>{
  data.drawer=opt.drawer;
  data.orderdetail=opt.order;
}
const getorderslist = async () => {
  const result = await orders.getorders();
  data.orderlist=result.result;
};
const getuserlist = () => {};
const seluser = () => {};
</script>

<style lang="less" scoped>
.userbody {
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .sercahuser {
  }
}
.userelcol {
  margin-top: 20px;
  display: flex;
}
</style>
