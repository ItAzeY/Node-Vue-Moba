import axios from 'axios'
import Vue from 'vue'
import router from './router'

// 基本地址
const http = axios.create({
	baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截器
http.interceptors.request.use(
	config => {
		// 如果 token 存在的话就设置请求头
		if(localStorage.token){
			// 设置 token
			config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
		}
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

// 响应拦截器
http.interceptors.response.use(
	res => {
		return res
	},
	err => {
		// 判断有没有值
		if(err.response.data.message){
			// 提示框信息
			Vue.prototype.$message.error(err.response.data.message)
		}
		// 判断后端返回的状态码
		if(err.response.status === 401){
			// 这里不用 vue 是因为访问不到.所以引入一下 router ,通过 router 进行 push
			router.push('/login')
		}
		// 返回 reject
		return Promise.reject(err)
	}
)

export default http 