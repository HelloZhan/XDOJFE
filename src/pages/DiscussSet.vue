<template>
    <h1>DiscussSet</h1>
    <el-button type="primary" @click="AddDiscussion">写讨论</el-button>
    <el-table :data="discussdata.array" style="width: 100%" @cell-click="(row, column, cell, event)=>problemclick(row, column, cell, event,$router)">
        <el-table-column prop="Title" label="标题" width="400" />
        <el-table-column prop="User[0].NickName" label="作者" width="180"/>
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
</template>


<script setup>
import service from '../axios'
import {reactive,ref} from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter();

let discussdata = reactive({'array':[]})
let TotalNum = ref(0)

let currentPage = ref(1) // 当前页数
let pageSize = ref(10) // 当前页的数量

function GetDiscussInfo(m_page, m_pagesize){
    console.log(m_page,m_pagesize)
    service.get(`/api/article`,{
        params: {
            ArticleType:"Discuss",
            ParentId : 0,
            Page : m_page,
            PageSize : m_pagesize
        },
    }).then(
        response => {
            console.log('请求成功了',response.data)
            discussdata.array = response.data.ArrayInfo
            TotalNum.value = Number(response.data.TotalNum)
        },
        error => {
            console.log('请求失败了',error.data)
        }
    )
    console.log(m_page,m_pagesize)
}

function problemclick(row, column, cell, event,router) {
    console.log('请求讨论ID：',row._id)
    router.push({
        name: "Discuss",
        query: { 
            DiscussId: row._id, 
            UserNickName:row.User[0].NickName, 
            UserAvatar:row.User[0].Avatar,
            Title:row.Title
        }
    });
}
function AddDiscussion(){
    router.push({name:"TextEditor",query: { 
        EditType:"Insert",
        ArticleType:"Discuss",
        ParentId:"0",
        ArticleId:"0"
    }})
}
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    pageSize.value = val;
    GetDiscussInfo(currentPage.value,pageSize.value)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    currentPage.value = val;
    GetDiscussInfo(currentPage.value,pageSize.value)
}

// 获取信息
GetDiscussInfo(currentPage.value,pageSize.value)
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>