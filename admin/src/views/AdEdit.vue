<template>
  <div class="categories">
    <h1>{{id ? '编辑分类' : '新建分类'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="上级分类">
        <!-- <el-input v-model="model.parent" placeholder="请输入名称"></el-input> -->
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name" placeholder="请输入名称"></el-input>
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
      model: {},
      parents:[]
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchParents()
  },
  methods: {
    async handleSave() {
      // eslint-disable-next-line no-unused-vars
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message.success("保存成功");
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  }
};
</script>