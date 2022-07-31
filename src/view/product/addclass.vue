<!--
 * @Author: qqq
 * @Date: 2021-09-23 10:48:36
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-17 15:12:42
 * @Description: file content
-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addbody">
      <el-card>
        <el-button @click="openofclosedrawer" type="primary" plain
          >添加分类</el-button
        >
        <el-table
          :data="data.category"
          stripe
          style="width: 100%"
          max-height="650"
        >
          <el-table-column prop="category_id" label="id" width="300" />
          <el-table-column prop="category_name" label="Name" width="180" />
          <el-table-column prop="category_info" label="info" width="180" />
          <el-table-column label="操作" width="min-width">
            <template #default="scope">
              <el-button
                type="text"
                @click="delpro(scope.row.category_id)"
                size="small"
                >Detail</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <ProductDrawer @closedrawer="onclosedrawer" @upprodut="onSubmit"  :drawer="data.drawer"></ProductDrawer>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, onMounted } from "vue";
//import ProductDrawer from '@c/product/ProductDrawer.vue'
import ProductDrawer from "../../components/product/ProductDrawer.vue";
import {
  getproductclass,
  setproductclass,
  delproductclass,
} from "@/services/api/product/produc.js";

onMounted(() => {
  getproclass();
});
const { proxy } = getCurrentInstance();
const data = reactive({
  drawer: false,
  category: [],
  search: "123",
  productcalss:{}
});
//获取商品分类列表
const getproclass = async () => {
  let { category } = await getproductclass();
  data.category = category;
  console.log(data.category);
};
//打开添加商品列表抽屉
const openofclosedrawer = async () => {
  data.drawer = true;
  console.log(await getproductclass().category);
};
//提交商品列表数据
const onSubmit = async (productcalss) => {
  const reulst = await setproductclass(productcalss);
  console.log(reulst);
  getproclass();
  if (reulst.code == "100011") {
    proxy.message.success(reulst.msg);
    
  } else {
    proxy.message.warning(reulst.msg);
  }
};
//关闭添加商品列表抽屉
const onclosedrawer = () => {data.drawer = false;};
//删除商品分类
const delpro = async (id) => {
  const relust = await delproductclass({ id });
  if (relust.code == "100016") {
    getproclass();
    proxy.message.success("ok");
  } else {
    proxy.message.warning("13");
  }
};
</script>

<style lang="less" scoped>
.addbody {
  margin-top: 25px;
}
.drawerform {
  width: 30%;
  margin: auto;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  height: 320px;
}
.prodfrom {
  div {
    margin: 15px 0 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-form-item__label,
    label {
      line-height: 58px;
      font-size: 12px;
    }
  }
}
</style>