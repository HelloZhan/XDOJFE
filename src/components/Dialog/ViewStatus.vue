<template>  
    <el-dialog v-model="dialogVisible" title="测评详情">
		<h3>{{ problemtitle }}</h3>
		<h5>{{ submitd }}</h5>
		<h5>{{ problemid }}</h5>
		<h5>{{ usernickname }}</h5>
		<h5>{{ status }}</h5>
		<h5>{{ runtime }}</h5>
		<h5>{{ runmemory }}</h5>
		<h5>{{ length }}</h5>
		<h5>{{ submitd }}</h5>
		<h5>{{ language }}</h5>
		<h5>{{ submittime }}</h5>
		<h5>{{ code }}</h5>
		<h5>{{ complierinfo }}</h5>
		<li v-for="(info,index) in testinfo.array" :key="index" >{{ info }}</li>
    </el-dialog>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import service from '../../axios'
// 是否打开
const dialogVisible = ref(false)

const submitd = ref('')
const problemid = ref('')
const usernickname = ref('')
const problemtitle = ref('')
const status = ref(0)
const runtime = ref('')
const runmemory = ref('')
const length = ref('')
const language = ref('')
const submittime = ref('')
const code = ref('')
const complierinfo = ref('')
const testinfo = reactive({array:[]})

function opendialog(submitid){
	dialogVisible.value = true;
	console.log('submitid',submitid)
	service
		.get(`/api/statusrecord/info`, {
			params:{
				SubmitId:submitid
			}
		})
		.then(
		(response) => {
			console.log(response.data)
			SetDataInfo(response.data)
		},
		(error) => {
			console.log(error.data);
		}
	);
}

function SetDataInfo(statusinfo)
{
	submitd.value = statusinfo._id
 	problemid.value = statusinfo.ProblemId
 	usernickname.value = statusinfo.UserNickName
 	problemtitle.value = statusinfo.ProblemTitle
 	status.value = statusinfo.Status
	runtime.value = statusinfo.RunTime
 	runmemory.value = statusinfo.RunMemory
 	length.value = statusinfo.Length
 	language.value = statusinfo.Language
 	submittime.value = statusinfo.SubmitTime
 	code.value = statusinfo.Code
 	complierinfo.value = statusinfo.ComplierInfo
	testinfo.array = statusinfo.TestInfo
}
defineExpose({
	opendialog
})
</script>
<style scoped>
.el-button--text {
margin-right: 15px;
}
.el-select {
width: 300px;
}
.el-input {
width: 300px;
}
.dialog-footer button:first-child {
margin-right: 10px;
}
</style>
  