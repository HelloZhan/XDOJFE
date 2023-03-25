<template>
<el-row class="tac">
	<el-col :span="3">
	<h5 class="mb-2">Default colors</h5>
	<el-menu
		default-active="2"
		class="el-menu-vertical-demo"
		@open="handleOpen"
		@close="handleClose"
	>
		<el-menu-item index="1">
			<el-icon><icon-menu /></el-icon>
			<router-link to="/admin/adminproblem">题目管理</router-link>
		</el-menu-item>
		<el-menu-item index="2">
			<el-icon><icon-menu /></el-icon>
			<router-link to="/admin/adminuser">用户管理</router-link>
		</el-menu-item>
		<el-menu-item index="3">
			<el-icon><icon-menu /></el-icon>
			<router-link to="/admin/admindiscuss">讨论管理</router-link>
		</el-menu-item>
		<el-menu-item index="4">
			<el-icon><icon-menu /></el-icon>
			<router-link to="/admin/adminannouncement">公告管理</router-link>
		</el-menu-item>
		<el-menu-item index="5">
			<el-icon><icon-menu /></el-icon>
			<router-link to="/admin/adminsolution">题解管理</router-link>
		</el-menu-item>
	</el-menu>
	</el-col>
	<el-col :span="21">
		<router-view></router-view>
	</el-col>
</el-row>
</template>

<script lang="ts" setup>
import {
	Document,
	Menu as IconMenu,
	Location,
	Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>
  