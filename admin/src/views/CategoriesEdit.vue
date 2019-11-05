<template>
  <div class="categories" :key="Math.random()">
    <h1>{{id ? '编辑分类' : '新建分类'}}</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="父级分类">
        <el-select v-model="model.parent" placeholder="请选择父级分类" :disabled="eidtDiabled">
          <el-option v-for="item in parentsOption" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
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
      parentsOption: [],
      eidtDiabled: false
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchParents()
    // eslint-disable-next-line no-console
    this.eidtDiabled = this.$route.query.eidtDiabled
  },
  methods: {
    // 保存
    async handleSave() {
      // eslint-disable-next-line no-unused-vars
      let res;
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message.success("保存成功");
    },
    // 获取回显的数据
    async fetch() {
      const res = await this.$http.get(`/categories/${this.id}`);
      this.model = res.data;
    },
    // 获取 select
    async fetchParents() {
      const res = await this.$http.get(`/categories/parent`);
      this.parentsOption = res.data;
    }
  }
};
</script>