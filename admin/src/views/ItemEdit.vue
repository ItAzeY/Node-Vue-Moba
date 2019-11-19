<template>
  <div class="items">
    <h1>{{id ? '编辑物品' : '新建物品'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <!-- <el-form-item label="上次分类">
        <el-input v-model="model.parent" placeholder="请输入名称"></el-input>
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="subbmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoriesEdit",
  props: {
    id: String
  },
  data() {
    return {
      model: {}
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    // 创建分类
    async handleSave() {
      // eslint-disable-next-line no-unused-vars
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message.success("保存成功");
    },
    // 获取分类
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    // 保存成功
    handleAvatarSuccess(res){
      this.$set(this.model,'icon', res.url)
    },
    // 上传之前
    beforeAvatarUpload(){

    }
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>