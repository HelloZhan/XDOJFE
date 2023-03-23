<template>
    <h1>StatusRecord</h1>
    <el-table :data="statusrecorddata.array" style="width: 100%" @cell-click="(row, column, cell, event)=>statusrecordclick(row, column, cell, event)">
        <el-table-column prop="_id" label="ID" width="180" />
        <el-table-column prop="UserNickName" label="User" width="180" />
        <el-table-column prop="ProblemTitle" label="Title" width="180"/>
        <el-table-column prop="Status" label="Status" width="180"/>
        <el-table-column prop="RunTime" label="RunTime" width="100"/>
        <el-table-column prop="RunMemory" label="Memory" width="100"/>
        <el-table-column prop="Length" label="Length" width="100"/>
        <el-table-column prop="SubmitTime" label="SubmitTime" />
    </el-table>
    <ViewStatus ref="viewstatusdialog"></ViewStatus>
    <div class="demo-pagination-block">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[25, 50, 75]"
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
import {reactive,ref,onMounted} from 'vue'
import { useRoute} from 'vue-router'
import ViewStatus from '../components/Dialog/ViewStatus.vue'
import service from '../axios'

const route = useRoute()

const viewstatusdialog = ref()
const searchinfo = reactive({
    ProblemId: '0',
    UserId : '0'
})

let currentPage = ref(1) // 当前页数
let pageSize = ref(25) // 当前页的数量
let totalsize = ref(25)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
    pageSize.value = val;
    GetStatusRecordInfo()
}
const handleCurrentChange = (val) => {
    currentPage.value = val;
    GetStatusRecordInfo()
}

// 题目信息列表
let statusrecorddata = reactive({'array':[]})

function GetStatusRecordInfo(){
    service.get(`/api/statusrecord`,{
        params: {
            SearchInfo : JSON.stringify(searchinfo),
            Page : currentPage.value,
            PageSize : pageSize.value
        },
    }).then(
        response => {
            console.log('请求成功了',response.data)
            statusrecorddata.array = response.data.Array
            totalsize.value = Number(response.data.TotalNum)
        },
        error => {
            console.log('请求失败了',error.data)
        }
    )
}
// 点击单元格
function statusrecordclick(row, column, cell, event) {
    viewstatusdialog.value.opendialog(row._id)
}

onMounted(()=>{
    if(route.query.ProblemId!=null){
        searchinfo.ProblemId = route.query.ProblemId
    }
    if(route.query.UserId!=null){
        searchinfo.UserId = route.query.UserId
    }
    GetStatusRecordInfo()
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