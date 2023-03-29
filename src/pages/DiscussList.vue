<template>
    <el-card class="box-card">
        <h1>DiscussList</h1>
        <el-button type="primary" @click="AddDiscussion">写讨论</el-button>
        <el-table :data="serverdata.array" style="width: 100%" @cell-click="cellclick">
            <el-table-column prop="User[0].Avatar" label="头像" width="100">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-avatar :size="50" :src="scope.row.User[0].Avatar" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="User[0].NickName" label="作者" width="100"/>
            <el-table-column prop="Title" label="标题" width="700" />
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
import service from '../axios'
import {reactive,ref,onMounted} from 'vue'

import { useRouter,useRoute,onBeforeRouteUpdate } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 上层id 默认为 0
const searchinfo = reactive({
    ParentId:'0',
    UserId:'0'
})

let serverdata = reactive({'array':[]})
let TotalNum = ref(0)

let currentPage = ref(1) // 当前页数
let pageSize = ref(10) // 当前页的数量

// 请求服务器获取信息
function GetServerInfo(ParentId,UserId){
    if(ParentId!=null){
        searchinfo.ParentId = ParentId
    }else{
        searchinfo.ParentId = 0
    }

    if(UserId!=null){
        searchinfo.UserId = UserId
    }else{
        searchinfo.UserId = 0
    }
    service.get(`/api/discusslist`,{
        params: {
            SearchInfo:JSON.stringify(searchinfo),
            Page : currentPage.value,
            PageSize : pageSize.value
        },
    }).then(
        response => {
            console.log('请求成功了',response.data)
            serverdata.array = response.data.ArrayInfo
            TotalNum.value = Number(response.data.TotalNum)
        },
        error => {
            console.log('请求失败了',error.data)
        }
    )
}

function cellclick(row, column, cell, event) {
    router.push({
        name: "Discuss",
        query: {
            DiscussId: row._id,
        }
    });
}
function AddDiscussion(){
    router.push({name:"DiscussEditor",query: { 
        EditType:"Insert",
        ParentId:searchinfo.ParentId,
        DiscussId:"0"
    }})
}
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    pageSize.value = val;
    GetDiscussInfo(searchinfo.ParentId,searchinfo.UserId)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentPage.value = val;
    GetDiscussInfo(searchinfo.ParentId,searchinfo.UserId)
}

// 路由更改前
onBeforeRouteUpdate(to=>{
    GetServerInfo(to.query.ParentId,to.query.UserId)
})
// 组件初始化
onMounted(()=>{
    GetServerInfo(route.query.ParentId,route.query.UserId)
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