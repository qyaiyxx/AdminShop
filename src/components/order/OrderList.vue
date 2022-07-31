<template>
  <div class="orderlistbody">
    <el-table :data="orderlist" border style="width: 100%">
      <el-table-column type="expand" label="订单详情" width="100">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2" class="imgname">
              <childerlistVue :itemprops="props.row.order_id"></childerlistVue>
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column class="el-table__cell" prop="order_id" label="订单id" width="200">
      </el-table-column>
      <el-table-column prop="pay_money" label="订单总价" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="280">
      </el-table-column>
      <el-table-column prop="user_phone" label="所属用户" width="160">
      </el-table-column>
      <el-table-column prop="create_order_time" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="remarks_info" label="备注" width="200">
      </el-table-column>
      <el-table-column label="订单状态" width="80">
        <template #default="props">
          <el-tag v-if="props.row.order_state == '2'">以支付</el-tag>
          <el-tag
            v-else-if="props.row.order_state == '3'"
            color="#e4f9f5"
            class="ml-2"
            >未发货</el-tag
          >
          <el-tag
            v-else-if="props.row.order_state == '1'"
            class="ml-2"
            type="info"
            >未支付</el-tag
          >
          <el-tag v-else class="ml-2" type="success">已发货</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="logistics" label="订单物流" width="180">
        <template #default="props">
          <p v-if="props.row.logistics == null">暂未发货</p>
          <div style="font-size: 12px" v-else>
            <p>{{ props.row.logistics }}</p>
            <p >{{props.row.logistics_id}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="140" label="操作">
        <template #default="scope">
          <el-tooltip content="发货" placement="top">
            <el-button
              @click="sendorder()"
              size="mini"
              icon="el-icon-s-promotion"
              circle
            />
          </el-tooltip>
          <el-tooltip content="修改订单" placement="top">
            <el-button
              @click="updateorder()"
              size="mini"
              icon="el-icon-s-help"
              circle
            />
          </el-tooltip>

          <el-tooltip content="删除订单" placement="top">
            <el-button
              @click="delorder()"
              size="mini"
              icon="el-icon-s-release"
              circle
          /></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import childerlistVue from "./childerlist.vue";

const emits = defineEmits(["openedit"]);
defineProps({
  orderlist: Array,
});
const openeditorder = (opt) => {
  emits("openedit", { drawer: true, order: opt });
};
</script>

<style lang="less" scoped>
.orderlistbody {
  width: 98%;
  margin: 20px auto;
}
.orderimg {
  width: 100px;
  height: 80px;
}
.imgname {
  display: flex;
  align-items: center;
}
.el-table__cell{
  padding: 6px 0 !important;
  background-color: aqua;
}
</style>
