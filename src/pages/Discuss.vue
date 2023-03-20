<template>
    <h1>讨论</h1>
	<h2>标题：{{ title }}</h2>
	<el-avatar :size="50" :src="$route.query.UserAvatar" />
	<h2>作者：{{ $route.query.UserNickName }}</h2>
    <div>
      <v-md-preview :text=discusstext></v-md-preview>
    </div>
	<el-button type="primary" @click="UpdateArticle">修改</el-button>
	<el-button type="primary" @click="DeleteArticle">删除</el-button>
    <Comment :ParentId=$route.query.DiscussId ArticleType="Discuss"></Comment>
  </template>
  
<script setup>
import Comment from '../components/Comment.vue'
import {reactive,ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'

import service from '../axios'

const router = useRouter()

const discusstext = ref('123')
const title = ref('')
const discussid = ref(0)
// 请求当前讨论详情
function GetDiscussContent(value) {
	console.log("GetDiscussContent id=", value);
	service
	.get(`/api/article/content`, {
		params: {
			ArticleType:"Discuss",
			ArticleId: value,
		},
	})
	.then(
		(response) => {
			console.log("请求成功了！！！");
			discusstext.value = response.data.Content; // 赋值
		},
		(error) => {
			console.log("请求失败了！！！");
			console.log(error.data);
		}
	);
}

function UpdateArticle(){
	router.push({name:"TextEditor",query: { 
        EditType:"Update",
        ArticleType:"Discuss",
        ArticleId:discussid.value,
		ParentId:"0"
    }})
}

function DeleteArticle(){
	service
	.post(`/api/article/delete`, {
		ArticleType:"Discuss",
		ArticleId: discussid.value,
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
	title.value = router.currentRoute.value.query.Title
	discussid.value = router.currentRoute.value.query.DiscussId
	GetDiscussContent(discussid.value)
})
</script>
  
<style>
</style>
  