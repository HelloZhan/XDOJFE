<template>
    <el-card class="box-card">
        <h1>用户Rank排名</h1>
        <el-table :data="userrankdata.array" style="width: 100%" @cell-click="(row, column, cell, event)=>rankclick(row, column, cell, event)">
            <el-table-column prop="Rank" label="排名" width="180" />
            <el-table-column prop="NickName" label="NickName" width="180" />
            <el-table-column prop="PersonalProfile" label="PersonalProfile" width="360"/>
            <el-table-column prop="ACNum" label="ACNum" width="100"/>
            <el-table-column prop="SubmitNum" label="SubmitNum" width="180"/>
        </el-table>
        <ViewStatus ref="viewstatusdialog"></ViewStatus>
        <div class="demo-pagination-block">
            <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[15, 30, 50]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="TotalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
        </div>
    </el-card>
</template>

<script setup>
import {reactive,ref,onMounted} from 'vue'
import service from '../axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
let currentPage = ref(1) // 当前页数
let pageSize = ref(15) // 当前页的数量
let TotalNum = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const pointmessage = ref('')

const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    pageSize.value = val;
    GetUserRank()
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentPage.value = val;
    GetUserRank()
}

// 用户排名信息列表
let userrankdata = reactive({'array':[]})

/*
    功能：获取用户的Rank排名
    传入：Json(Page,PageSize)
    传出：Json(ArrayInfo[_id,Rank,Avatar,NickName,PersonalProfile,SubmitNum,ACNum],TotalNum)
*/
function GetUserRank(){
    service.get(`/api/user/rank`,{
        params: {
            Page : currentPage.value,
            PageSize : pageSize.value
        },
    }).then(
        response => {
            if(response.data.Result == "Success"){
                userrankdata.array = response.data.ArrayInfo
                TotalNum.value = Number(response.data.TotalNum)
            }else{
                pointmessage.value = response.data.Reason
                ErrorMessage()
            }
        },
        error => {
            pointmessage.value = "网络似乎出现了问题！";
            ErrorMessage()
        }
    )
}

function rankclick(row, column, cell, event){
    router.push({name:"UserHome",query:{UserId:row._id}})
}

// 发送错误消息
const ErrorMessage = () => {
    ElMessage({
        showClose: true,
        message: pointmessage.value,
        type: 'error',
    })
}

onMounted(()=>{
    GetUserRank()
})
</script>

<style scoped>
.demo-pagination-block{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center
}
</style>