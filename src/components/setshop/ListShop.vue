<!--
 * @Author: qqq
 * @Date: 2021-09-23 19:07:12
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-19 15:52:41
 * @Description: file content
-->

<template>
  <div class="shopset">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="setshopbody">
      <el-card>
        <div style="display: flex; justify-content: space-between">
          <div>
            <el-button size="mini" type="primary" plain @click="salesclick"
              >销量排行</el-button
            >
            <el-button size="mini" type="primary" plain @click="inventoryclick"
              >库存排行</el-button
            >
            <el-button size="mini" type="primary" plain @click="priceclick"
              >售价排行</el-button
            >
          </div>
          <el-button size="mini" type="primary" @click="opendrawer"
            >添加商品</el-button
          >
        </div>
        <div>
          <el-tabs v-model="data.dialogImageUrl" @tab-click="productstateclick">
            <el-tab-pane class="tabls" label="全部" name="0"></el-tab-pane>
            <el-tab-pane label="在售" name="1"></el-tab-pane>
            <el-tab-pane label="售完" name="4"></el-tab-pane>
            <el-tab-pane label="已下架" name="2"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="selectproduct">
          <span>商品名称:</span>
          <el-input
            v-model="data.productname"
            placeholder="搜索商品"
            size="mini"
          />
          <el-button
            type="primary"
            @click="searchproducts"
            icon="el-icon-search"
            size="mini"
          ></el-button>
        </div>
        <div class="productlist">
          <el-table
            :data="data.productdata"
            height="450"
            stripe
            style="width: 100%"
            class="shoptable"
            size="mini"
          >
            <el-table-column prop="product_id" label="id" width="100" />
            <el-table-column prop="product_name" label="名称" width="180" />
            <el-table-column prop="product_image" label="图片" width="100">
              <template #default="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="'http://localhost:3000/imgs/' + scope.row.product_image"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="product_num" label="库存" width="80" />
            <el-table-column prop="product_price" label="价格" width="80" />
            <el-table-column prop="product_sales" label="销量" width="80" />
            <el-table-column prop="product_state" label="状态" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.product_state == 1" type="success"
                  >在售</el-tag
                >
                <el-tag v-else type="info">未上架</el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button size="mini" @click="updateproduct(scope.row.product_id)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="delprodcut(scope.row.product_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="demo-pagination-block">
            <el-pagination
              v-model:currentPage="data.currentPage"
              :page-size="10"
              layout="prev,total, pager, next, jumper"
              :total="data.pagetotal"
              @prev-click="prevpage"
              @next-click="nextpage"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { proxyRefs, reactive } from "@vue/reactivity";
import {
  getproduct,
  getproductsales,
  getproductstate,
  searchproductdata,
  deleteproduct,
} from "@/services/api/product/produc.js";
import {getCurrentInstance, onMounted,ref}from 'vue'
import  { useRoute,useRouter } from 'vue-router';
const router=useRouter()

const { proxy } = getCurrentInstance();
const data = reactive({
  addrawer: false,
  updrawer: false,
  productdata: [], //商品列表
  activeName: "one", //选项卡
  currentPage: 1, //分页
  product: {}, //商品信息
  pagetotal: 0, //条数
  dialogImageUrl: "", //切换面板的值
  listtype: 0, //页面列表的状态控制 0为全部 1为销量类排行 2 在售类 3 搜索类
  selproductlisttype: null, //分页时筛选列表数据的类型key
  producttype: "", //商品
  rankingtype: "", //根据商品状态分类的key售价库存
  productname: "",
  productid:null,
});

onMounted(async () => {
  //加载时获取商品列表
  getproductlist();
});

const updateproduct = (id) => {
  router.push({path:"/updataproduct/"+id})
};
const delprodcut = async (val) => {
  const result = await deleteproduct({ productid: val });
  if (result.code == "001") {
    proxy.message.success("成功了喔");
    getproductlist();
  } else {
    proxy.message.warning("失败了喔");
  }
};
//切换商品面板时val.props.name==3为全部，
const productstateclick = async (val) => {
  data.listtype = 1;
  data.currentPage = 1;
  data.producttype = val.props.name;
  if (val.props.name == "0") {
    data.listtype = 0;
    console.log(val.props.name);
    getproductlist();
    return;
  }
  comprehensivelist();
};
const comprehensivelist = async () => {
  const result = await getproductstate({
    currentPage: data.currentPage,
    producttype: data.producttype,
  });
  data.productdata = result.data.Product;
  data.pagetotal = result.data.total;
};
//根据销售排行
const salesclick = async () => {
  data.listtype = 2;
  data.currentPage = 1;
  data.rankingtype = "ps.product_sales";
  comprehensiveclick();
};
//根据库存排行
const inventoryclick = async () => {
  data.listtype = 2;
  data.currentPage = 1;
  data.rankingtype = "ps.product_num";
  comprehensiveclick();
};
//根据售价排行
const priceclick = async () => {
  data.currentPage = 1;
  data.listtype = 2;
  data.rankingtype = "pa.product_price";
  comprehensiveclick();
};
//查寻商品
const searchproducts = async () => {
  data.currentPage = 1;
  data.listtype = 3;
  getsearchdata();
};
//查询商品的多余操作
const getsearchdata = async () => {
  const result = await searchproductdata({
    currentPage: data.currentPage,
    productname: data.productname,
  });
  console.log(result);
  data.productdata = result.data.Product;
  data.pagetotal = result.data.total;
};
//排行数据源
const comprehensiveclick = async () => {
  const result = await getproductsales({
    currentPage: data.currentPage,
    rankingtype: data.rankingtype,
  });
  data.productdata = result.data.Product;
  data.pagetotal = result.data.total;
};

//调整至多少页
const handleCurrentChange = async (val) => {
  data.currentPage = val;
  iftype();
  console.log(data.currentPage + "v");
};
//下一页
const nextpage = async () => {
  console.log(data.currentPage);

  iftype();
};
//上一页
const prevpage = async () => {
  iftype();
};
//打开添加商品卡片
const opendrawer = async () => {
   router.push({path:"/add"})
};
//关闭添加商品卡片
const onclosedrawer = () => {
  data.addrawer = false;
  data.updrawer=false
};
//
const iftype = async () => {
  if (data.listtype == 1) {
    comprehensivelist();
  } else if (data.listtype == 2) {
    comprehensiveclick();
  } else if (data.listtype == 3) {
    searchproducts();
  } else {
    getproductlist();
  }
};
//获取所有商品
const getproductlist = async () => {
  const result = await getproduct({
    currentPage: data.currentPage,
    liststate: data.selproductlisttype,
  });
  data.productdata = result.data.Product;
  data.pagetotal = result.data.total;
};
</script>

<style lang="less" scoped>
.setshopbody {
  margin-top: 25px;
}
.drawerform {
  width: 35%;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
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
.selectproduct {
  display: flex;
  width: 30%;
  height: 28px;
  justify-content: space-evenly;
  align-items: center;
  span {
    white-space: nowrap;
  }
  .el-input {
    width: 40%;
  }
}
.shoptable {
  .cell {
    text-align: center;
  }
}
.tabls {
  div {
    font-size: 12px;
  }
}
</style>