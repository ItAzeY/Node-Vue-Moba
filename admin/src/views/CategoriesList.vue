<template>
	<div class="categories">
		<h1>分类列表</h1>
		<el-table :data="items" border>
			<el-table-column label="ID" prop="_id"></el-table-column>
			<el-table-column label="分类名称" prop="name"></el-table-column>
			<el-table-column>
				<template slot-scope="{row}">
					<el-button type="text" @click="$router.push(`/categories/edit/${row._id}`)">编辑</el-button>
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
			const items = await this.$http.get('categories')
			this.items = items.data
		}
	},
}
</script>