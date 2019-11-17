<template>
	<div class="categories">
		<h1>文章 列表</h1>
		<el-table :data="items" border>
			<el-table-column label="ID" prop="_id"></el-table-column>
			<el-table-column label="文章标题" prop="title"></el-table-column>
			<el-table-column>
				<template slot-scope="{row}">
					<el-button type="text" @click="$router.push(`/articles/edit/${row._id}`)">编辑</el-button>
					<el-button type="text" @click="remove(row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'CategoriesList',
	data(){
		return {
			items: []
		}
	},
	created() {
		this.fetch()
	},
	methods: {
		async fetch(){
			const items = await this.$http.get('rest/articles')
			this.items = items.data.data
		},
		async remove(row){
			this.$confirm(`是否要删除此文章----${row.title}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
					const res = await this.$http.delete(`rest/articles/${row._id}`)
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