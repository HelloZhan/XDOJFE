<template>
	<h2>标题：{{ title }}</h2>
    <div>
      <v-md-preview :text=content></v-md-preview>
    </div>
    <Comment :ParentId=$route.query.AnnouncementId ArticleType="Announcement" ></Comment>
</template>

<script setup>
import Comment from '../components/Comment.vue'
import {ref,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import service from '../axios'

const route = useRoute()

const announcementid = ref(0)
const title = ref('')
const content = ref('')
const views = ref(0)
const comments = ref(0)
const createtime = ref('')
const updatetime = ref('')
function GetServerInfo() {
	service
	.get(`/api/announcement/content`, {
		params: {
			AnnouncementId: announcementid.value
		},
	})
	.then(
		(response) => {
			console.log("请求成功了！！！")
			if(response.data.Result == "Success"){
				SetServerData(response.data)
			}else{
				console.log('请求失败')
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
	createtime.value = data.CreateTime
	updatetime.value = data.UpdateTime
}
onMounted(()=>{
	announcementid.value = route.query.AnnouncementId
	GetServerInfo()
})
</script>
  
<style>
</style>
  