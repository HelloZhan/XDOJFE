<template>
    <div class="m-4">
		<el-select
			v-model="value4"
			multiple
			collapse-tags
			collapse-tags-tooltip
			:max-collapse-tags="3"
			placeholder="Select"
			style="width: 240px"
		>
			<el-option
			v-for="item in options.array"
			:key="item.value"
			:label="item.label"
			:value="item.value"
			/>
		</el-select>
	</div>
    <el-tag
      v-for="tag in options.array"
      :key="tag.value"
      class="mx-1"
      closable
    >
      {{ tag.value }}
    </el-tag>
</template>
  
<script lang="ts" setup>
import { ref ,reactive,onMounted} from 'vue'
import service from '../axios'
import { ElMessage } from 'element-plus'
const options = reactive({array:[{value:'',label:''}]})
const pointmessage = ref('')

const value4 = ref([])

function GetServerInfo()
{
    service
        .get(`/api/tags`, {
            params:{
                TagType:"Problem"
            }
        })
        .then(
            (response) => {
                console.log('tags',response.data)
                setdatainfo(response.data.Tags)
                pointmessage.value = "请求信息成功！";
                SuccessMessage()
            },
            (error) => {
                pointmessage.value = "网络似乎出现了问题！";
                ErrorMessage()
            }
        );
}
function setdatainfo(info:Array<string>)
{
    options.array.splice(0)
    for(var i = 0; i < info.length; i++){
        options.array.push({value:info[i],label:info[i]})
    }
    // tags.array.splice(0)
    // console.log('setdatainfo',info)
    // for(var i = 0; i < info.length; i++){
    //     tags.array.push(info[i])
    // }

}
onMounted(()=>{
    GetServerInfo()
})
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
</script>
  