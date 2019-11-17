<template>
  <div class="categories">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="subbmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "CategoriesEdit",
  props: {
    id: String
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  components: {
    VueEditor
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async handleSave() {
      if (this.id) {
        await this.$http.put(`rest/article/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/article", this.model);
      }
      this.$router.push("/articles/list");
      this.$message.success("保存成功");
    },
    async fetch() {
      const res = await this.$http.get(`rest/article/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  }
};
</script>