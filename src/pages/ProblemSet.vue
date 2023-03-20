<template>
    <h1>ProblemSet</h1>
    <Tags></Tags>
    <el-table :data="problemsetdata.array" style="width: 100%" @cell-click="(row, column, cell, event)=>problemclick(row, column, cell, event)">
        <el-table-column prop="ProblemId" label="ID" width="180" />
        <el-table-column prop="Title" label="Title" width="180" />
        <el-table-column prop="SubmitNum" label="提交次数" width="180"/>
        <el-table-column prop="ACNum" label="通过次数" />
    </el-table>

    <div class="demo-pagination-block">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[20, 40, 60]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalsize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup>
import axios from 'axios'
import {reactive,ref,onMounted} from 'vue'
import { useRouter} from 'vue-router'
import Tags from '../components/Tags.vue'
const router = useRouter()

let currentPage = ref(1) // 当前页数
let pageSize = ref(20) // 当前页的数量
let totalsize = ref(20)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    pageSize.value = val;
    GetProblemSetInfo("common",currentPage.value,pageSize.value)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentPage.value = val;
    GetProblemSetInfo("common",currentPage.value,pageSize.value)
}

// 题目信息列表
let problemsetdata = reactive({'array':[]})

function GetProblemSetInfo(m_querytype,m_page, m_pagesize){
    axios.get(`/api/problemset`,{
        params: {
            QueryType : m_querytype,
            Page : m_page,
            PageSize : m_pagesize
        },
    }).then(
        response => {
            console.log('请求成功了',response.data)
            problemsetdata.array = response.data.Array
            totalsize.value = Number(response.data.TotalNum)
        },
        error => {
            console.log('请求失败了',error.data)
        }
    )
    console.log(m_page,m_pagesize)
}
// 跳转函数
function problemclick(row, column, cell, event) {
    router.push({
        name: "Problem",
        query: { ProblemId: row.ProblemId }
    });
}

onMounted(()=>{
    GetProblemSetInfo("common",currentPage.value,pageSize.value)
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