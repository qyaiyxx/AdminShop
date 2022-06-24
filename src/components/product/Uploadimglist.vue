<template>
  <el-upload
    action="http://localhost:3000/product/addproductlistimg"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="succeshandok"
    :file-list="data.fileList"
    class="picturess"
  >
    <el-icon class="uploadicon"><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "vue";
import { Plus } from "@element-plus/icons-vue";
const cmits = defineEmits(["succeshandokch","deltethandokch"]);
const props = defineProps({
  imgelist: Array,
});
const data = reactive({
  fileList: [],
  imgurllist: props.imgelist || [],
});
onMounted(()=>{
  setTimeout(() => {
      addisupdata()
  }, 100);

  
})
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const addisupdata = () => {
  if (props.imgelist.length > 0) {
    console.log("ok");
    data.imgurllist = props.imgelist;
    data.fileList = props.imgelist.map((item, index) => {
      return { name: index, url: `http://localhost:3000/imgs/${item}` };
    });
  }
};
const handleRemove = (uploadFile, uploadFiles) => {
  data.imgurllist.splice(data.fileList.findIndex(item=>{return item.name==uploadFile.name}), 1);
  cmits("deltethandokch",data.imgurllist.join(","));
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const succeshandok = (result) => {
  data.imgurllist.push(result.productimgname);
  cmits("succeshandokch", data.imgurllist.join(","));
};
</script>
<style lang="less">
.item4 {
  display: flex;
  flex-direction: column;
  .itemstate,
  .itemcount {
    display: flex;
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
}
.picturess {
  display: flex;
  .el-upload-list {
    .is-success {
      width: 100px;
      height: 100px;
    }
  }
  .el-upload {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      line-height: 0 !important;
    }
  }
}
</style>
