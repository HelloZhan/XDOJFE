<template>
	<el-card class="box-card">
		<div>
			<h2>标题：{{ title }}</h2>
			<el-avatar :size="50" :src="useravatar" />
			<h2>作者：{{ usernickname }}</h2>
		</div>
		<div>
			<v-md-preview :text=content></v-md-preview>
		</div>
		<el-button v-if="showbutton" type="primary" @click="UpdateArticle">修改</el-button>
		<el-button v-if="showbutton" type="primary" @click="DeleteArticle">删除</el-button>
		<Comment :ParentId=$route.query.SolutionId ArticleType="Solution" ></Comment>
	</el-card>
</template>

<script setup>
import Comment from '../components/Comment.vue'
import {ref,onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import service from '../axios'

const router = useRouter()
const route = useRoute()

const solutionid = ref(0)

const title = ref('')
const content = ref('')
const views = ref(0)
const comments = ref(0)
const usernickname = ref('')
const useravatar = ref('')

const showbutton = ref(true)

function GetServerInfo() {
	service
	.get(`/api/solution/content`, {
		params: {
			SolutionId: solutionid.value,
		},
	})
	.then(
		(response) => {
            console.log("请求成功了！！！",response.data)
            if(response.data.Result == "Success"){
                SetServerData(response.data)
            }
		},
		(error) => {
			console.log("请求失败了！！！");
			console.log(error.data);
		}
	);
}
function SetServerData(data)
{
    title.value = data.Title
    content.value = data.Content
    views.value = data.Views
    comments.value = data.Comments
    usernickname.value = data.User[0].NickName
    useravatar.value = data.User[0].Avatar

}

function UpdateArticle(){
	router.push({name:"SolutionEditor",query: { 
        EditType:"Update",
        SolutionId:solutionid.value,
		ParentId:"0"
    }})
}

function DeleteArticle(){
	service
	.delete(`/api/solution`, {
        params:{
            SolutionId:solutionid.value,
        }
	})
	.then(
		(response) => {
			console.log("请求成功了！！！",response.data)
			router.go(-1)
		},
		(error) => {
			console.log("请求失败了！！！");
			console.log(error.data);
		}
	);
}

onMounted(()=>{
	solutionid.value = route.query.SolutionId
	GetServerInfo()
})
</script>
  
<style>
</style>
  