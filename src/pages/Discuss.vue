<template>
	<el-card class="box-card">

		<div id="top">
			<el-avatar :size="50" :src="useravatar" /> &nbsp
			<h2>{{ title }}</h2>
		</div>
		
		
		<h2>作者：{{ usernickname }}</h2>
		<el-row>
			<el-col :span="2"></el-col>

			<el-col :span="20">
				<div>
					<v-md-preview :text=content></v-md-preview>
				</div>
				<el-button v-if="showbutton" type="primary" @click="UpdateArticle">修改</el-button>
				<el-button v-if="showbutton" type="primary" @click="DeleteArticle">删除</el-button>
				<Comment :ParentId=$route.query.DiscussId ArticleType="Discuss" ></Comment>
			</el-col>

			<el-col :span="2"></el-col>
		</el-row>
		
	</el-card>
	
</template>

<script setup>
import Comment from '../components/Comment.vue'
import {ref,onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import service from '../axios'

const router = useRouter()
const route = useRoute()

const discussid = ref(0)

const title = ref('')
const content = ref('')
const views = ref(0)
const comments = ref(0)
const usernickname = ref('')
const useravatar = ref('')

const showbutton = ref(true)

function GetServerInfo() {
	service
	.get(`/api/discuss`, {
		params: {
			DiscussId: discussid.value,
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
	router.push({name:"DiscussEditor",query: { 
        EditType:"Update",
        DiscussId:discussid.value,
		ParentId:"0"
    }})
}

function DeleteArticle(){
	service
	.delete(`/api/discuss`, {
        params:{
            DiscussId:discussid.value,
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
	discussid.value = route.query.DiscussId
	GetServerInfo()
})
</script>
  
<style scoped>
#top{
	display: flex;
    justify-content: center;
    align-items: center
}
</style>
  