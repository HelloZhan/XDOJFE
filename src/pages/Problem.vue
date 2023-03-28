<template>
	<el-card class="box-card">
	<el-row>
		<el-col :span="20">
			<h1>ID: {{data.problemid}}</h1>
			<h1>题目：{{data.title}}</h1>
			<div class="content">
				<v-md-preview :text="data.content"></v-md-preview>
			</div>
			<MonacoEditor ref="monacoeditor"></MonacoEditor>
			<hr />
			<h4>结果是 {{ result }}</h4>
			<h4>原因是 {{ reason }}</h4>
			<button @click="SubmitCode()">提交</button>
		</el-col>
		<el-col :span="4">
			<div class="demo-collapse">
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item title="作者" name="1">
						<div>
							{{ data.nickname }}
						</div>
					</el-collapse-item>
					<el-collapse-item title="时间限制" name="2">
						<div>
							{{ data.timelimit }} MS
						</div>
					</el-collapse-item>
					<el-collapse-item title="空间限制" name="3">
						<div>
							{{ data.memorylimit }} MB
						</div>
					</el-collapse-item>
					<el-collapse-item title="标签" name="4">
						<div>
							<el-tag v-for="(tag,index) in data.tags" :key="index">{{ tag }}</el-tag>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>

			<el-button type="primary" @click="ClickStatusRecord">提交记录</el-button>
			<el-button type="primary" @click="ClickSolution">题解</el-button>
			<el-button type="primary" @click="ClickDiscuss">讨论</el-button>
		</el-col>
	</el-row>
	</el-card>
</template>

<script setup>
import MonacoEditor from '../components/Problem/MonacoEditor.vue'
import service from '../axios'
import { ref,onMounted,reactive } from "vue"
import store from '../store'
import axios from 'axios'
import { useRoute,useRouter} from 'vue-router'

const monacoeditor = ref()
const route = useRoute()
const router = useRouter()
// 创建题目描述，是否显示，获取题目数据
const data = reactive({
	problemid:'',
	title:'',
	content:'',
	timelimit:0,
	memorylimit:0,
	submitnum:0,
	acnum:0,
	nickname:'',
	tags:[]
})

let result = ref("");
let reason = ref("");
// 请求当前题目详情
function GetProblem() {
	axios
	.get(`/api/problem`, {
		params: {
			ProblemId: data.problemid,
		},
	})
	.then(
		(response) => {
			if(response.data.Result == "Success"){
				console.log("请求成功了！！！",response.data);
				SetDataInfo(response.data)
			}else{
				console.log('出错啦！')
			}
			
		},
		(error) => {
			console.log("请求失败了！！！");
			console.log(error.data);
		}
	);
}
function SetDataInfo(Info)
{
	data.title = Info.Title
	data.content = Info.Description
	data.timelimit = Info.TimeLimit
	data.memorylimit = Info.MemoryLimit
	data.submitnum = Info.SubmitNum
	data.acnum = Info.ACNum
	data.nickname = Info.UserNickName
	data.tags = Info.Tags
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
	data.problemid = route.query.ProblemId
	GetProblem();
})
</script>

<style>
.content{
	width: 1000px
}
</style>
