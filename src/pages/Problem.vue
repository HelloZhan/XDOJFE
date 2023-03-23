<template>
	<div>
		<v-md-preview :text="problemdata"></v-md-preview>
	</div>
	<h1>Problem</h1>

	<h3>题目描述</h3>
	<h4>题目ID：{{ $route.query.ProblemId }}</h4>
	<h4>题目名字：{{ $route.query.Title }}</h4>
	<el-input
		v-model="Code"
		:rows="10"
		type="textarea"
		placeholder="请输入代码！"
	/>
	<hr />
	<h4>结果是 {{ result }}</h4>
	<h4>原因是 {{ reason }}</h4>
	<button @click="SubmitCode()">提交</button>
</template>

<script setup>
import service from '../axios'
import { ref,onMounted } from "vue"
import store from '../store'
import axios from 'axios'
import { useRoute} from 'vue-router'

const route = useRoute()
// 创建题目描述，是否显示，获取题目数据
let problemdata = ref("# 题目列表");
let result = ref("");
let reason = ref("");
let Code = ref("");
// 请求当前题目详情
function GetProblem() {
	axios
	.get(`/api/problem`, {
		params: {
			ProblemId: route.query.ProblemId,
		},
	})
	.then(
		(response) => {
			console.log("请求成功了！！！");
			problemdata.value = response.data; // 赋值
			console.log('请求数据',response.data)
		},
		(error) => {
			console.log("请求失败了！！！");
			console.log(error.data);
		}
	);
}

// 提交代码
function SubmitCode() {
	console.log("获取代码", Code.value);
	service
	.post(`/api/problemcode`, { 
		ProblemId: route.query.ProblemId,
		UserId:store.state.UserId,
		UserNickName:store.state.NickName,
		Code: Code.value,
		Language:"C++" 
	})
	.then(
		(response) => {
			console.log("提交成功了！！！", response.data);
			result.value = response.data.Status;
			reason.value = response.data.CompilerInfo;
			// TODO:如果AC成功 需要添加到表中
		},
		(error) => {
			console.log("提交失败了！！！");
			console.log(error.data);
		}
	);
}
onMounted(()=>{
	GetProblem();
})
</script>

<style></style>
