<!--
 * @Author: qqq
 * @Date: 2021-10-08 10:28:29
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-17 15:07:27
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
          <el-input size="mini" v-model="data.product.name"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="商品图片:">
          <div>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/product/addproductimg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="商品简介:">
          <el-input
            size="mini"
            type="textarea"
            maxlength="100"
            rows="6"
            v-model="data.product.introduce"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="图片详情:">
          <Uploadimglist
            :imgelist="data.imgelist"
            @succeshandokch="succeshandok"
          ></Uploadimglist>
        </el-form-item>
      </div>
      <div class="item4">
        <div class="itemcount">
          <el-form-item label="计价单位:">
            <el-input size="mini" v-model="data.product.unit"></el-input>
          </el-form-item>
          <el-form-item label="售价:">
            <el-input size="mini" v-model="data.product.price"></el-input>
          </el-form-item>
        </div>
        <div class="itemstate">
          <el-form-item label="库存:">
            <el-input size="mini" v-model="data.product.num"></el-input>
          </el-form-item>
          <el-form-item label="商品状态:">
            <el-switch
              v-model="data.product.product_state"
              active-text="立马上架"
              inactive-text="暂不上架"
              active-value="1"
              inactive-value="2"
              class="addstate"
            ></el-switch>
          </el-form-item>
        </div>
      </div>

      <el-form-item>
        <el-button size="mini" type="primary" @click="onSubmit"
          >立即添加</el-button
        >
        <el-button @click="onclosedrawer" size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import { getproductclass, addproduct } from "@/services/api/product/produc.js";
import { useRouter } from "vue-router";
import Uploadimglist from "../../components/product/Uploadimglist.vue";
const router = useRouter();
const { proxy } = getCurrentInstance();
const data = reactive({
  product: {},
  productclass: [],
  imageUrl: "",
  imgelist: [],
});
const selproclass = async () => {
  //   data.product.category_id = data.selproductclass.val;
  //   console.log(data.selproductclass.val);
};
onMounted(async () => {
  const result = await getproductclass();
  data.productclass = result.category;
});
const onclosedrawer = () => {
  router.go(-1);
};

const onSubmit = async () => {
  //添加商品数据添加
  console.log(data.product)
 
  const result = await addproduct(data.product);
  if (result.code == "200") {
    proxy.message.success("添加成功");
    data.product = {};
    data.drawer = false;
    data.imageUrl=""
  } else {
    proxy.message.warning("添加失败");
  }
};
const handleAvatarSuccess = (res, file) => {//上传商品图片
  data.imageUrl = URL.createObjectURL(file.raw);
  const reulst = res;
  if ((reulst.code = "1")) {
    data.product.image = reulst.productimgname;
    proxy.message.success(reulst.msg);
  } else {
    proxy.message.warning(reulst.msg);
  }
};
const succeshandok = (imglistch) => {
  data.product.imgeurllist = imglistch;
};
</script>

<style lang="less" scoped>
.drawerform {
  padding: 50px 0 50px 0;
  height: fit-content;
  width: 95%;
  margin: auto;
  background: #fff;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
}

.prodfrom > div {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form-item__label,
  label {
    line-height: 58px;
    font-size: 12px;
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
.addstate {
  margin: 0;
  .el-switch__core {
    div {
      margin: 0;
    }
  }
}
</style>