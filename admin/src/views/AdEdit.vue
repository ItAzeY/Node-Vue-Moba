<template>
  <div class="categories">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="handleSave">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name" placeholder="请输入广告位名称"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap;">
          <el-col :md="24 " v-for="(item, index ) of model.items" :key="index" class="el-col-border">
            <el-form-item label="URL">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:1rem"> 
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar banner" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: []
      }
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async handleSave() {
      // eslint-disable-next-line no-unused-vars
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message.success("保存成功");
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  }
};
</script>

<style>
.banner{
  width: auto;
  height: 10rem;
}
</style>