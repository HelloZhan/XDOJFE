<template>
    <h1>题解编辑器</h1>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-input v-model="title" placeholder="请输入标题！" maxlength = "50" show-word-limit/>
            </el-header>
            <el-main>
                <v-md-editor v-model="content" height="400px"></v-md-editor>
            </el-main>
            <el-footer>
                <el-switch v-model="ispublic" />是否公开
                <el-button type="primary" @click="Affirm">发布</el-button>
                <el-button type="primary" @click="Cancel">取消</el-button>
            </el-footer>
        </el-container>
  </div>
</template>
  
<script setup>
import { ElMessage } from 'element-plus'
import {ref,onMounted} from 'vue'
import store from '../../store';
import service from '../../axios'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const parentid = ref(0)
const edittype = ref('')
const solutionid = ref('')
const content = ref('')
const title = ref('')
const ispublic = ref(true)

// 提示消息
const pointmessage = ref('')
// 确认提交
function Affirm(){
    if(edittype.value == "Insert"){
        InsertArticle()
    }else if(edittype.value == "Update"){
        UpdateArticle()
    }
}
function InsertArticle(){
    console.log('InsertArticle')
    if(title.value.length < 1){
        pointmessage.value = "请输入标题！"
        WaringMessage()
        return
    }
    if(content.value.length < 2){
        pointmessage.value = "内容不能少于两个字！"
        WaringMessage()
        return
    }
    service.post(`/api/solution/insert`,{
        Title:title.value,
        Content:content.value,
        ParentId:parentid.value,
        UserId:store.state.UserId,
        Public:ispublic.value
    }).then(
        response => {
            console.log('请求成功了',response.data)
            if(response.data.Result == "Success"){
                pointmessage.value = "发布成功！"
                SuccessMessage()
                router.go(-1)
            }else{
                pointmessage.value = "发布失败，系统可能出现问题！"
                ErrorMessage()
            }
        },
        error => {
            console.log('请求失败了',error.data)
            pointmessage.value = "发布失败，网络可能出现问题！"
            ErrorMessage()
        }
    )
}

function UpdateArticle(){
    if(title.value.length < 1){
        pointmessage.value = "请输入标题！"
        WaringMessage()
        return
    }
    if(content.value.length < 2){
        pointmessage.value = "内容不能少于两个字！"
        WaringMessage()
        return
    }
    service.post(`/api/solution/update`,{
        SolutionId:solutionid.value,
        Title:title.value,
        Content:content.value,
        Public:ispublic.value
    }).then(
        response => {
            console.log('请求成功了',response.data)
            if(response.data.Result == "Success"){
                pointmessage.value = "修改成功！"
                SuccessMessage()
                router.go(-1)
            }else{
                pointmessage.value = "修改失败，系统可能出现问题！"
                ErrorMessage()
            }
        },
        error => {
            console.log('请求失败了',error.data)
            pointmessage.value = "修改失败，网络可能出现问题！"
            ErrorMessage()
        }
    )
}
// 取消提交
function Cancel(){
    router.go(-1)
}

// 发送成功消息
const SuccessMessage = () => {
    ElMessage({
        showClose: true,
        message: pointmessage.value,
        type: 'success',
    })
}
// 发送警告消息
const WaringMessage = () => {
    ElMessage({
        showClose: true,
        message: pointmessage.value,
        type: 'warning',
    })
}
// 发送错误消息
const ErrorMessage = () => {
    ElMessage({
        showClose: true,
        message: pointmessage.value,
        type: 'error',
    })
}
function GetServerInfo()
{
    service.get(`/api/solution/select`,{
        params: {
            SolutionId:solutionid.value
        },
    }).then(
        response => {
            if(response.data.Result == "Success"){
                pointmessage.value = "获取信息成功！"
                SuccessMessage()
                SetServerData(response.data)
            }else{
                pointmessage.value = "获取信息失败！"
                ErrorMessage()
            }
        },
        error => {
            pointmessage.value = "网络可能出现问题！"
            ErrorMessage()
        }
    )
}
function SetServerData(data)
{
    title.value = data.Title
    content.value = data.Content
    ispublic.value = data.Public
}

onMounted(()=>{
    edittype.value = route.query.EditType
    solutionid.value = route.query.SolutionId
    parentid.value = route.query.ParentId
    if(edittype.value == "Update")
    {
        GetServerInfo()
    }else if(edittype.value == "Insert"){

    }
})
</script>