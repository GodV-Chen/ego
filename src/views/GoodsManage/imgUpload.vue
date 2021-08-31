<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success='upLoadSuccess'
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from '../../../api/config'
export default {
    data() {
      return {
        fileList: [],
        url:base.baseUrl+base.imgUpLoadUrl
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    //   上传成功的函数
      upLoadSuccess(response){
        //   console.log(response);
          console.log('上传成功');
          let imgUrl=base.baseUrl+'/'+response.url.slice(7)
          console.log(imgUrl);
          this.$emit('imgurlData',imgUrl)
          this.fileList= []
      }
    }
};
</script>

<style>
</style>