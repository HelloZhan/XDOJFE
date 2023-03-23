<template>
    <el-row>
        <el-col :span="18">
            <h1>ProblemSet</h1>
            <ProblemSearch ref="problemsearch" :SearchProblemSet="SearchProblemSet"></ProblemSearch>
            <el-table :data="problemsetdata.array" style="width: 100%" 
                @cell-click="problemclick"
                @cell-mouse-enter="changepiechart"
                >
                <el-table-column prop="ProblemId" label="ID" width="180" />
                <el-table-column prop="Title" label="Title" width="180" />
                <el-table-column
                    prop="Tags"
                    label="Tag"
                    width="200"
                    >
                    <template #default="scope">
                        <el-tag
                        v-for="(name,index) in scope.row.Tags"
                        :key="index"
                        disable-transitions
                        size="medium"
                        >{{ name }}</el-tag>
                    </template>
                </el-table-column>
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
        </el-col>
        <el-col :span="6">
            <el-affix :offset="120">
                <PieChart ref="piechart"></PieChart>
            </el-affix>
        </el-col>
    </el-row>

</template>

<script setup>
import axios from 'axios'
import {reactive,ref,onMounted} from 'vue'
import { useRouter} from 'vue-router'
import PieChart from '../components/Chart/PieChart.vue'
import ProblemSearch from '../components/Problem/ProblemSearch.vue'
const router = useRouter()

// 子组件
const piechart = ref()
const problemsearch = ref()

let currentPage = ref(1) // 当前页数
let pageSize = ref(20) // 当前页的数量
let totalsize = ref(20)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const searchinfo = reactive({
    Id:'',
    Title:'',
    Tags:[]
})

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

function GetProblemSetInfo(){
    axios.get(`/api/problemset`,{
        params: {
            SearchInfo : JSON.stringify(searchinfo),
            Page : currentPage.value,
            PageSize : pageSize.value
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
}
// 子组件的搜索按钮调用父组件的方法
function SearchProblemSet()
{
    let Info = problemsearch.value.GetSearchInfo()
    searchinfo.Id = Info.Id
    searchinfo.Title = Info.Title
    searchinfo.Tags = Info.Tags

    GetProblemSetInfo()
}
// 跳转函数
function problemclick(row, column, cell, event) {
    router.push({
        name: "Problem",
        query: { ProblemId: row.ProblemId }
    });
}
function changepiechart(row, column, cell, event){
    let info = {
        CENum : row.CENum,
        ACNum : row.ACNum,
        WANum : row.WANum,
        TLENum: row.TLENum,
        MLENum: row.MLENum,
        SENum : row.SENum
    }
    piechart.value.SetDataInfo(info)
}
onMounted(()=>{
    GetProblemSetInfo()
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