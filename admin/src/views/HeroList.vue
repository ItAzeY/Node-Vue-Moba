<template>
	<div class="heroes">
		<h1>英雄列表</h1>
		<el-table :data="heroes" border>
			<el-table-column label="ID" prop="_id"></el-table-column>
			<el-table-column label="头像">
				<template slot-scope="{row}">
					<img :src="row.avatar" :alt="row.avatar" style="height: 3.5rem">
				</template>
			</el-table-column>
			<el-table-column label="物品名称" prop="name"></el-table-column>
			<el-table-column>
				<template slot-scope="{row}">
					<el-button type="text" @click="handleRouter(row._id)">编辑</el-button>
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
			heroes: []
		}
	},
	created() {
		this.fetch()
	},
	methods: {
		// 点击编辑
		handleRouter(id){
			this.$router.push(`/heroes/edit/${id}`)
		},
		// 获取数据
		async fetch(){
			const items = await this.$http.get('rest/heroes')
			this.heroes = items.data
		},
		async remove(row){
			this.$confirm(`是否要删除此分类----${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
					const res = await this.$http.delete(`rest/heroes/${row._id}`)
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