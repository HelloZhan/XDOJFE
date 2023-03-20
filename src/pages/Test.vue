<template>
	<div class="m-4">
		<p>use max-collapse-tags</p>
		<el-select
			v-model="value4"
			multiple
			collapse-tags
			collapse-tags-tooltip
			:max-collapse-tags="5"
			placeholder="Select"
			style="width: 240px"
		>
			<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
			/>
		</el-select>
	</div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const value4 = ref([])
  const options = [
	{
	  value: 'Option1',
	  label: 'Option1',
	},
	{
	  value: 'Option2',
	  label: 'Option2',
	},
	{
	  value: 'Option3',
	  label: 'Option3',
	},
	{
	  value: 'Option4',
	  label: 'Option4',
	},
	{
	  value: 'Option5',
	  label: 'Option5',
	},
  ]
  </script>
  