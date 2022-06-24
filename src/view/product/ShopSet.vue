<!--
 * @Author: qqq
 * @Date: 2021-09-20 01:57:33
 * @LastEditors: qqqq
 * @LastEditTime: 2021-09-24 09:10:50
 * @Description: file content
-->
<template>
    <div>
          <div class="drawerform">
    <el-form
      class="prodfrom"
      ref="product"
      :model="data.product"
      label-width="80px"
    >
      <el-form-item label="商品分类">
        <el-select
          size="mini"
          v-model="data.product.category_id"
          filterable
          placeholder="洗衣机"
          :change="selproclass()"
          @focus="selfocus()"
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
      <el-form-item class="elfromupimgs" label="商品图片">
        <div>
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/product/addproductimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img :src="'http://localhost:3000/imgs/' + data.product.product_image" class="avatar" alt="" />
            <span class="elfromupimgsspna">点击更换</span>
            <!-- <i  class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input size="mini" v-model="data.product.product_name"></el-input>
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input
          size="mini"
          type="textarea"
          maxlength="100"
          rows="6"
          v-model="data.product.product_intro"
        ></el-input>
      </el-form-item>
      <el-form-item label="计价单位">
        <el-input size="mini" v-model="data.product.product_unit"></el-input>
      </el-form-item>
      <el-form-item label="售价">
        <el-input size="mini" v-model="data.product.product_price"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input size="mini" v-model="data.product.product_num"></el-input>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-switch
          v-model="data.product.product_state"
          active-text="立马上架"
          inactive-text="暂不上架"
          active-value="1"
          inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="onSubmit"
          >立即修改</el-button
        >
        <el-button @click="onclosedrawer" size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
    </div>
      <router-view></router-view>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>