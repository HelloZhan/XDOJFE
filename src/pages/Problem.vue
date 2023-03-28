<template>
	<el-card class="box-card">
	<el-row>
		<el-col :span="20">
			<div class="content">
				<v-md-preview :text="problemdata"></v-md-preview>
			</div>
			<h1>Problem</h1>

			<h3>题目描述</h3>
			<h4>题目ID：{{ $route.query.ProblemId }}</h4>
			<h4>题目名字：{{ $route.query.Title }}</h4>
			<MonacoEditor ref="monacoeditor"></MonacoEditor>
			<hr />
			<h4>结果是 {{ result }}</h4>
			<h4>原因是 {{ reason }}</h4>
			<button @click="SubmitCode()">提交</button>
		</el-col>
		<el-col :span="4">
			<el-affix :offset="120">
				<el-button type="primary" @click="ClickStatusRecord">提交记录</el-button>
				<el-button type="primary" @click="ClickSolution">题解</el-button>
				<el-button type="primary" @click="ClickDiscuss">讨论</el-button>
			</el-affix>
		</el-col>
	</el-row>
	</el-card>
</template>

<script setup>
import MonacoEditor from '../components/Problem/MonacoEditor.vue'
import service from '../axios'
import { ref,onMounted } from "vue"
import store from '../store'
import axios from 'axios'
import { useRoute,useRouter} from 'vue-router'

const monacoeditor = ref()
const route = useRoute()
const router = useRouter()
// 创建题目描述，是否显示，获取题目数据
let problemdata = ref("# 题目列表");
let result = ref("");
let reason = ref("");
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
	let Info = {
		ProblemId: route.query.ProblemId,
		UserId: store.state.UserId,
		UserNickName: store.state.NickName,
		Code: monacoeditor.value.GetCode(),
		Language: monacoeditor.value.GetLanguage(),
	}
	console.log(Info)
	// service
	// .post(`/api/problemcode`, { 
	// 	ProblemId: route.query.ProblemId,
	// 	UserId:store.state.UserId,
	// 	UserNickName:store.state.NickName,
	// 	Code: Code.value,
	// 	Language:"C++" 
	// })
	// .then(
	// 	(response) => {
	// 		console.log("提交成功了！！！", response.data);
	// 		result.value = response.data.Status;
	// 		reason.value = response.data.CompilerInfo;
	// 		// TODO:如果AC成功 需要添加到表中
	// 	},
	// 	(error) => {
	// 		console.log("提交失败了！！！");
	// 		console.log(error.data);
	// 	}
	// );
}

function ClickStatusRecord()
{
	router.push({
		name:"StatusRecord",
		query:{
			ProblemId:route.query.ProblemId
		}
	})
}
function ClickSolution()
{
	router.push({
		name:"SolutionList",
		query:{
			ParentId:route.query.ProblemId
		}
	})
}

function ClickDiscuss()
{
	router.push({
		name:"DiscussList",
		query:{
			ParentId:route.query.ProblemId
		}
	})
}
onMounted(()=>{
	GetProblem();
})
</script>

<style>
.content{
	width: 1000px
}
</style>
