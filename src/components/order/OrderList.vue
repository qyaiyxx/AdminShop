<template>
  <div class="orderlistbody">
    <el-table :data="orderlist" border style="width: 100%">
      <el-table-column fixed prop="date" label="订单id" width="150">
      </el-table-column>
      <el-table-column prop="name" label="商品图片" width="120">
      </el-table-column>
      <el-table-column prop="product_name" label="商品名称" width="220">
      </el-table-column>
      <el-table-column prop="city" label="订单总价" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="所属用户" width="160">
      </el-table-column>
      <el-table-column prop="zip" label="创建时间" width="120">
      </el-table-column>
       <el-table-column prop="zip" label="备注" width="220">
      </el-table-column>
      <el-table-column fixed="right" width="220" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
defineProps({
  orderlist:Array
})
</script>

<style lang="less" scoped>
.orderlistbody{
    width: 98%;
    margin: 20px auto;
}

</style>