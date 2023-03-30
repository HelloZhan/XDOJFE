<template>
	<MonacoEditor></MonacoEditor>
</template>
  
<script setup>
import { ref ,onMounted} from 'vue'
import MonacoEditor from '../components/Problem/MonacoEditor.vue'
import store from '../store'

onMounted(()=>{
	console.log('tags',store.state.ProblemTags)
})
</script>
  