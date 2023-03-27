<template>
    <el-card class="box-card">
        <h1>用户Rank排名</h1>
        <el-table :data="userrankdata.array" style="width: 100%" @cell-click="(row, column, cell, event)=>rankclick(row, column, cell, event)">
            <el-table-column prop="Rank" label="排名" width="180" />
            <el-table-column prop="NickName" label="NickName" width="180" />
            <el-table-column prop="PersonalProfile" label="PersonalProfile" width="360"/>
            <el-table-column prop="SubmitNum" label="SubmitNum" width="180"/>
            <el-table-column prop="ACNum" label="ACNum" width="100"/>
        </el-table>
        <ViewStatus ref="viewstatusdialog"></ViewStatus>
        <div class="demo-pagination-block">
            <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30]"
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

const router = useRouter()
let currentPage = ref(1) // 当前页数
let pageSize = ref(10) // 当前页的数量
let TotalNum = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    pageSize.value = val;
    GetUserRank(currentPage.value,pageSize.value)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentPage.value = val;
    GetUserRank(currentPage.value,pageSize.value)
}

// 用户排名信息列表
let userrankdata = reactive({'array':[]})

function GetUserRank(m_page, m_pagesize){
    service.get(`/api/userrank`,{
        params: {
            Page : m_page,
            PageSize : m_pagesize
        },
    }).then(
        response => {
            console.log('请求成功了',response.data)
            userrankdata.array = response.data.ArrayInfo
            TotalNum.value = Number(response.data.TotalNum)
        },
        error => {
            console.log('请求失败了',error.data)
        }
    )
}

function rankclick(row, column, cell, event){
    router.push({name:"UserHome",query:{UserId:row._id}})
}

onMounted(()=>{
    GetUserRank(currentPage.value,pageSize.value)
})
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>