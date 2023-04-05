<template>
	<el-button @click="handle" :disabled="buttondis" :loading="buttonload">Default</el-button>
</template>
  
<script setup>
import { ref ,onMounted} from 'vue'
import store from '../store'

let buttondis = ref(false)
const buttonload = ref(false)

function handle()
{
	// buttondis.value = true
	buttonload.value = true
}
</script>
  