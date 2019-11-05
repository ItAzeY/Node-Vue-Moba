<template>
  <div class="categories">
    <h1>分类列表</h1>
    <el-table :data="items" border>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="上级分类" prop="parent.name"></el-table-column>
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column>
        <template slot-scope="{row}">
          <el-button type="text" @click="handleClickEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CategoriesList",
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {	
		handleClickEdit(row){
			// eslint-disable-next-line no-unused-vars
			let eidtDiabled = false
			row.parent ? eidtDiabled = false : eidtDiabled = true
			this.$router.push({
				path: `/categories/edit/${row.id}`,
				query: {
					eidtDiabled: eidtDiabled
				}
			})
		},
		// 获取分类
    async fetch() {
      const items = await this.$http.get("categories");
      this.items = items.data;
		},
		// 删除分类
    async handleRemove(row) {
      this.$confirm(`是否要删除此分类----${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`/categories/query/${row.id}`);
          if (res) {
            this.$message.success("删除成功");
            this.fetch();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>