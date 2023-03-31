<template>
	<n-pagination
		v-model:page="currentPage"
		v-model:page-size="pageSize"
		:item-count="commentnum"
		show-size-picker
		:page-sizes="pageSizes"
		@update:page="handlepage"
		@update:page-size="handlpagesize"
	/>
</template>
  
<script lang="ts" setup>
import { ref ,onMounted} from 'vue'
import store from '../store'
import { NPagination } from 'naive-ui'

const currentPage = ref(1)
const pageSize = ref(5)
const commentnum = ref(15)
const pageSizes = [
	{
		label: '5 每页',
		value: 5
	},
	{
		label: '10 每页',
		value: 10
	},
	{
		label: '15 每页',
		value: 15
	}
]
function handlepage(page: number){
	console.log('handlenext',page)
}
function handlpagesize(pageSize: number)
{
	console.log('handlpagesize',pageSize)
}
onMounted(()=>{
	console.log('tags',store.state.ProblemTags)
})
</script>
  