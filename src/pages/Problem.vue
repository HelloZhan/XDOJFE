<template>
	<el-container>
		<el-header>
			<el-menu
				:default-active="activeIndex"
				class="el-menu-demo"
				mode="horizontal"
				@select="handleSelect"
			>
				<el-menu-item index="1">
					<el-button type="primary" @click="problemcode">做题</el-button>
				</el-menu-item>
			</el-menu>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
    </el-container>
</template>

<script setup>
import service from '../axios'
import { ref,onMounted } from "vue"
import store from '../store'
import axios from 'axios'
import { useRoute,useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
function problemcode()
{
	router.push({name:"ProblemCode",query:{ProblemId:route.query.ProblemId}})
}
onMounted(()=>{

})
</script>

<style></style>
