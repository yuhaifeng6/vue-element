<template>
  <div class="add_file">
    <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :http-request="submitFile"
        :file-list="fileList">
        <el-button size="small" type="primary">大文件切片上传</el-button>
    </el-upload>
    <div class="process" v-if="fileing">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="percentage" status="success"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "addfile",
  data() {
    return {
        fileList: [],
        percentage: 0,
        fileing: false
    };
  },
  created() {},

  mounted() {},

  methods: {
      /** 文件移除时的钩子 */
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      /** 点击已经上传的文件时的钩子 */
      handlePreview(file) {
        console.log(file);
      },
      /** 文件状态改变的钩子 */
      handleChange(file, fileList) {
        this.fileList = fileList
      },
      /** 提交文件 */
      submitFile() {
        console.log('输出', this.fileList)
      }
  },
};
</script>

<style lang="scss" scoped>

</style>
