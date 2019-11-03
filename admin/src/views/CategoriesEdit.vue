<template>
	<div class="categories">
		<h1>新建分类</h1>
		<el-form label-width="120px" @submit.native.prevent="handleSave">
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
	name: 'CategoriesEdit',
	data(){
		return {
			model: {

			}
		}
	},
	methods: {
		async handleSave(){
      // eslint-disable-next-line no-unused-vars
      const res = await this.$http.post('/categories',this.model)
      this.$router.push('/categories/list')
      this.$message.success('保存成功')
		}
	}
}
</script>