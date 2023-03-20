<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h1>个人主页：{{ NickName }}</h1>
            </el-header>
            <el-container>
                <el-aside width="150px">
                    <el-avatar :size="150" :src="Avatar" />
                </el-aside>
                <el-main>
                    个性签名：{{ PersonalProfile }}
                    <el-divider />
                    学校：{{ School }}
                    <el-divider />
                    专业：{{ Major }}
                    <el-divider />
                    通过次数：{{ ACNum }}
                    <el-divider />
                    提交次数：{{ SubmitNum }}
                    <el-divider />
                    加入时间：{{ JoinTime }}
                    <el-divider />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script setup>
import service  from '../axios'
import { ref,reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userid = router.currentRoute.value.query.UserId
const pointmessage = ref('')

const NickName = ref('')
const Avatar = ref('')
const PersonalProfile = ref('')
const School = ref('')
const Major = ref('')
const JoinTime = ref('')
const ACNum = ref(0)
const ACProblems = reactive({array:[]})
const SubmitNum = ref()

function GetInfo(){
    console.log('调用函数')
    service
        .get(`/api/user/userhome`, {
          params: {
            UserId: userid,
          },
        })
        .then(
            (response) => {
                if(response.data.Result == "Success"){
                    console.log('请求数据',response.data)
                    setinfo(response.data)
                }else{
                    pointmessage.value = response.data.Reason
                    ErrorMessage()
                }
            },
            (error) => {
                console.log("请求失败了！！！");
                pointmessage.value = "网络似乎出现了问题！";
                ErrorMessage()
            }
        );
}
function setinfo(info)
{
    NickName.value = info.NickName
    Avatar.value = info.Avatar
    PersonalProfile.value = info.PersonalProfile
    School.value = info.School
    Major.value = info.Major
    JoinTime.value = info.JoinTime
    ACNum.value = info.ACNum
    ACProblems.array = info.ACProblems
    SubmitNum.value = info.SubmitNum
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
    // 调用函数
    GetInfo()
})
</script>

<style scoped>
.h1{
    font-size:50px;
}
</style>
  