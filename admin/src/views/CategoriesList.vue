<template>
	<div class="categories">
		<h1>分类列表</h1>
		<el-table :data="items" border>
			<el-table-column label="ID" prop="_id"></el-table-column>
			<el-table-column label="上级分类" prop="parent.name"></el-table-column>
			<el-table-column label="分类名称" prop="name"></el-table-column>
			<el-table-column>
				<template slot-scope="{row}">
					<el-button type="text" @click="$router.push(`/categories/edit/${row._id}`)">编辑</el-button>
					<el-button type="text" @click="remove(row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-size="page.size"
      layout="total, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
	</div>
</template>

<script>
export default {
	name: 'CategoriesList',
	data(){
		return {
			items: [],
			page: {
				current:1,
				size: 10,
				total: 0
			}
		}
	},
	created() {
		this.fetch()
	},
	methods: {
		handleCurrentChange(val){
			this.page.current = val
			this.fetch()
		},
		async fetch(){
			const items = await this.$http.get(`rest/categories?current=${this.page.current}&size=${this.page.size}`)
			this.items = items.data.data
			this.page.total = items.data.total
		},
		async remove(row){
			this.$confirm(`是否要删除此分类----${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
					const res = await this.$http.delete(`rest/categories/${row._id}`)
          if(res){
						this.$message.success('删除成功')
						this.fetch()
					}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
		}
	},
}
</script>

<style lang="scss">
.el-pagination{
	text-align: center;
}
</style>