<template>
    <el-card class="box-card">
        <template #header>
        <div class="card-header">
            <span>公告</span>
        </div>
        </template>
        <el-table :data="serverdata.array" style="width: 100%" @cell-click="cellclick">
            <el-table-column prop="Title" label="标题" width="400" />
            <el-table-column prop="Comments" label="评论数" width="100"/>
            <el-table-column prop="Views" label="浏览量" width="100"/>
            <el-table-column prop="CreateTime" label="创建时间" width="360"/>
        </el-table>

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
import service from '../../axios'
import {reactive,ref,onMounted} from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter();

let serverdata = reactive({'array':[]})
let TotalNum = ref(0)

let currentPage = ref(1) // 当前页数
let pageSize = ref(10) // 当前页的数量

function GetServerInfo(){
    service.get(`/api/announcement`,{
        params: {
            Page : currentPage.value,
            PageSize : pageSize.value
        },
    }).then(
        response => {
            console.log('请求Announcement成功',response.data)
            if(response.data.Result=="Success"){
                serverdata.array = response.data.ArrayInfo
                TotalNum.value = Number(response.data.TotalNum)
            }
        },
        error => {
            console.log('请求失败了',error.data)
        }
    )
}

function cellclick(row, column, cell, event) {
    router.push({
        name: "Announcement",
        query: { 
            AnnouncementId: row._id, 
        }
    });
}
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    pageSize.value = val;
    GetServerInfo()
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentPage.value = val;
    GetServerInfo()
}
onMounted(()=>{
    // 获取信息
    GetServerInfo()
})

</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>