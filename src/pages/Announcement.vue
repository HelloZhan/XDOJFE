<template>
	<h2>标题：{{ title }}</h2>
	<el-avatar :size="50" :src="$route.query.UserAvatar" />
	<h2>作者：{{ $route.query.UserNickName }}</h2>
    <div>
      <v-md-preview :text=content></v-md-preview>
    </div>
    <Comment :ParentId=$route.query.ArticleId :ArticleType=$route.query.ArticleType ></Comment>
</template>

<script setup>
import Comment from '../components/Comment.vue'
import {ref,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import service from '../axios'

const route = useRoute()

const articleid = ref(0)
const title = ref('')
const content = ref('')
const articletype = ref('')

function GetAnnouncementContent() {
	service
	.get(`/api/article/content`, {
		params: {
			ArticleType:"Announcement",
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

onMounted(()=>{
	title.value = route.query.Title
	articleid.value = route.query.ArticleId
    articletype.value = route.query.ArticleType
	GetAnnouncementContent()
})
</script>
  
<style>
</style>
  