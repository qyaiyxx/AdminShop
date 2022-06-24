<!--
 * @Author: qqq
 * @Date: 2021-10-08 10:28:29
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-18 01:22:58
 * @Description: file content
-->
<template>
  <div class="drawerform">
    <el-form
      class="prodfrom"
      ref="product"
      :model="data.product"
      label-width="80px"
    >
      <div>
        <el-form-item label="商品分类:" class="adfa">
          <el-select
            size="mini"
            v-model="data.product.category_id"
            filterable
            placeholder="Select"
            :change="selproclass()"
          >
            <el-option
              v-for="item in data.productclass"
              :key="item.category_id"
              :label="item.category_name"
              :value="item.category_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称:">
          <el-input size="mini" v-model="data.product.product_name"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item class="elfromupimgs" label="商品图片">
          <div class="scop">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/product/addproductimg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                :src="
                  'http://localhost:3000/imgs/' + data.product.product_image
                "
                class="avatar"
                alt=""
              />
              <span class="elfromupimgsspna">点击更换</span>
              <!-- <i  class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="商品简介:">
          <el-input
            size="mini"
            type="textarea"
            maxlength="100"
            rows="6"
            v-model="data.product.product_intro"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="图片详情:">
          <Uploadimglist
            :imgelist="data.imglistch"
            @succeshandokch="succeshandok"
            @deltethandokch="deletehandok"
          ></Uploadimglist>
        </el-form-item>
      </div>
      <div class="item4">
        <div class="itemcount">
          <el-form-item label="计价单位:">
            <el-input
              size="mini"
              v-model="data.product.product_unit"
            ></el-input>
          </el-form-item>
          <el-form-item label="售价:">
            <el-input
              size="mini"
              v-model="data.product.product_price"
            ></el-input>
          </el-form-item>
        </div>
        <div class="itemstate">
          <el-form-item label="库存:">
            <el-input size="mini" v-model="data.product.product_num"></el-input>
          </el-form-item>
          <el-form-item label="商品状态:">
            <el-switch
              v-model="data.product.product_state"
              active-text="立马上架"
              inactive-text="暂不上架"
              active-value="1"
              inactive-value="2"
            ></el-switch>
          </el-form-item>
        </div>
      </div>

      <el-form-item>
        <el-button size="mini" type="primary" @click="onSubmit"
          >立即修改</el-button
        >
        <el-button @click="onclosedrawer" size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 123 -->
  {{ data.product }}
</template>

<script setup>
import Uploadimglist from "../../components/product/Uploadimglist.vue";
import { reactive } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import {
  getproductclass,
  getproductone,
  updateproduct,
} from "@/services/api/product/produc.js";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const data = reactive({
  product: {},
  productclass: [],
  imageUrl: "",
  imglistch:[]
});
const selproclass = async () => {};
const selfocus = (e) => {};
onMounted(async () => {
  const result1 = await getproductone({ productid: route.params.id });
  data.product = result1.data;
  data.imglistch=data.product.product_image_infolist.split(',')
  data.imageUrl != ""
    ? `http://localhost:3000/imgs/${data.product.product_product_image}`
    : data.imageUrl;
  console.log(data.product);
  const result = await getproductclass();
  data.productclass = result.category;
});
const onclosedrawer = () => {
  router.go(-1);
};

const onSubmit = async () => {
   //data.product.product_image_infolist==undefined||
  //  return console.log(data.product)
  //  console.log(data.product)
  const result = await updateproduct({ product: data.product });
  console.log(result);
  if (result.code == "001") {
    proxy.message.success(result.msg);
    router.go(-1);
  } else {
    proxy.message.warning("添加失败");
  }
};
const handleAvatarSuccess = (res, file) => {
  data.imageUrl = URL.createObjectURL(file.raw);
  const reulst = res;
  if ((reulst.code = "1")) {
    data.imageUrl, (data.product.product_product_image = reulst.productimgname);
    proxy.message.success(reulst.msg);
  } else {
    proxy.message.warning(reulst.msg);
  }
};
const succeshandok = (imglistch) => {
  data.product.product_image_infolist = imglistch;
  console.log(imglistch)
};
const deletehandok=(imglistch)=>{
data.product.product_image_infolist = imglistch;
  console.log(imglistch)
}
</script>

<style lang="less" scoped>
.item4 {
  display: flex;
  flex-direction: column;
  .itemstate {
    justify-content: space-between;
    width: 100%;
  }
}
.setshopbody {
  margin-top: 25px;
}
.drawerform {
  height: fit-content;
  width: 95%;
  margin: auto;
  background: #fff;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
}
.prodfrom {
  div {
    margin: 10px 0 10px 0;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
.elfromupimgs{
  position: relative;
}
.elfromupimgsspna{
  position: absolute;
}
.scop{
      justify-content: space-between;
}
</style>