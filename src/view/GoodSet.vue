<template>
  <el-card>
    <div>
      <h2>轮播图:</h2>
      <Uploadimglist
        :imgelist="data.list"
        @succeshandokch="succeshandok"
      ></Uploadimglist>
    </div>
    <div class="subbody">
      <div class="welcomebody">
        <h2 class="wetext">欢迎语:</h2>
        <el-input
          v-model="data.indexinfo.welcome"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <el-button
          class="submit"
          @click="onsuccess"
          icon="el-icon-check"
          size="mini"
          type="primary"
          >设置</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { getCurrentScope, reactive } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import Uploadimglist from "../components/product/Uploadimglist.vue";
import shopssest from '../services/api/shopsSet/index.js'
const {proxy} =getCurrentInstance()
const data = reactive({
  list: [],
  indexinfo: {},
});
onMounted(()=>{
  
})
const onsuccess = () => {
  if(data.indexinfo.welcome===undefined&&data.indexinfo.shopsimglist===undefined){return proxy.message.info("不能设置空");}
  const result=shopssest.setshopos(data.indexinfo)
  proxy.message.success("ok");
};
const succeshandok = (imglist) => {
  data.indexinfo.shopsimglist=imglist||null;
};
</script>

<style lang="less" scoped>
.subbody {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-content: center;
  .submit {
    height: 50px;
  }
  .welcomebody {
    display: flex;
    width: 300px;
    align-items: center;
      .wetext{
        min-width: 70px;
      }
  }
}
</style>