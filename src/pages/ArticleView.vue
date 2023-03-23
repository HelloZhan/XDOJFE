<template>
	<h2>标题：{{ title }}</h2>
	<el-avatar :size="50" :src="$route.query.UserAvatar" />
	<h2>作者：{{ $route.query.UserNickName }}</h2>
    <div>
      <v-md-preview :text=content></v-md-preview>
    </div>
	<el-button v-if="showbutton" type="primary" @click="UpdateArticle">修改</el-button>
	<el-button v-if="showbutton" type="primary" @click="DeleteArticle">删除</el-button>
    <Comment :ParentId=$route.query.ArticleId :ArticleType=$route.query.ArticleType ></Comment>
</template>

<script setup>
import Comment from '../components/Comment.vue'
import {ref,onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import service from '../axios'

const router = useRouter()
const route = useRoute()

const articleid = ref(0)
const title = ref('')
const content = ref('')
const articletype = ref('')
const parentid = ref(0)

const showbutton = ref(false)

function GetDiscussContent() {
	service
	.get(`/api/article/content`, {
		params: {
			ArticleType:"Discuss",
			ArticleId: articleid.value,
		},
	})
	.then(
		(response) => {
			console.log("请求成功了！！！");
			content.value = response.data.Content; // 赋值
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
        ArticleType:articletype.value,
        ArticleId:articleid.value,
		ParentId:"0"
    }})
}

function DeleteArticle(){
	service
	.post(`/api/article/delete`, {
		ArticleType:articletype.value,
		ArticleId: articleid.value,
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
	title.value = route.query.Title
	articleid.value = route.query.ArticleId
    articletype.value = route.query.ArticleType
    parentid.value = route.query.ParentId
	GetDiscussContent()
})
</script>
  
<style>
</style>
  