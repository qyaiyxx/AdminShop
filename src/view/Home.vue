<!--
 * @Author: qqq
 * @Date: 2021-09-20 01:56:51
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-17 15:17:30
 * @Description: file content
-->
<template>
  <div>
    <el-container>
      <el-aside class="homeleft">
        <div class="homeimage">
          <img src="/image/logo.gif" />
        </div>
        <div class="rot-list">
          <el-menu router menu-trigger="click">
            <el-menu-item index="/water">
              <i class="el-icon-pie-chart"></i>
              <span>店铺流水</span>
            </el-menu-item>
            <el-menu-item index="/order">
              <i class="el-icon-s-operation"></i>
              <span>订单列表</span>
            </el-menu-item>
            <el-menu-item index="#" @click="anitem">
              <i class="el-icon-sell"></i>
              <span>商品管理</span>
              <i
                style="margin-left: 25px"
                :class="!isshow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
              ></i>
            </el-menu-item>
            <div>
              <el-collapse-transition>
                <div class="children" v-show="isshow">
                  <el-menu-item index="/setshop">
                    <i class="el-icon-more"></i>
                    <span>商品设置</span>
                  </el-menu-item>
                  <el-menu-item index="/addshopclass">
                    <i class="el-icon-more"></i>
                    <span>商品列表</span>
                  </el-menu-item>
                </div>
              </el-collapse-transition>
            </div>
            <el-menu-item index="/shopcart">
              <i class="el-icon-shopping-cart-2"></i>
              <span>购物车</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <i class="el-icon-place"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/goodset">
              <i class="el-icon-news"></i>
              <span>店铺设置</span>
            </el-menu-item>
            <el-menu-item index="/#">
              <i class="el-icon-refresh-right"></i>
              <span>退出登录</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="bodymain">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "today",
  setup() {
    const isshow = ref(false);
    const anitem = () => {
       isshow.value = !isshow.value;
    };
    return {
      isshow,
      anitem,
    };
  },
};
</script>

<style lang="less" scoped>
.homeleft {
  width: 160px;
  border-right: solid 1px #e6e6e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 100vh;
  .el-menu {
    border: 0;
  }
}
.homeimage {
  display: flex;
  justify-content: center;
}
.rot-list {
  i {
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.bodymain {
  background: #f2f2f2;
  height: 100vh;
  width: 100%;
}
</style>