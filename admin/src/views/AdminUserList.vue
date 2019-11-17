<template>
	<div class="categories">
		<h1>管理员 列表</h1>
		<el-table :data="items" border>
			<el-table-column label="ID" prop="_id"></el-table-column>
			<el-table-column label="用户名" prop="username"></el-table-column>
			<el-table-column>
				<template slot-scope="{row}">
					<el-button type="text" @click="$router.push(`/admin_user/edit/${row._id}`)">编辑</el-button>
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
			const items = await this.$http.get(`rest/admin_user?current=${this.page.current}&size=${this.page.size}`)
			this.items = items.data.data
			this.page.total = items.data.total
		},
		async remove(row){
			this.$confirm(`是否要删除此用户----${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
					const res = await this.$http.delete(`rest/admin_user/${row._id}`)
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