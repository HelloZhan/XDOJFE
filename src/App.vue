<template>
	<div class="common-layout">
	  	<el-container>
			<el-header>
				<el-menu
						:default-active="activeIndex"
						class="el-menu-demo"
						mode="horizontal"
						@select="handleSelect"
					>
						<el-menu-item index="1">
							<router-link to="/homepage">首页</router-link>
						</el-menu-item>
						<el-menu-item index="2">
							<router-link to="/problemset">题库</router-link>
						</el-menu-item>
						<el-menu-item index="3">
							<router-link to="/statusrecord">提交记录</router-link>
							<!-- <el-button :type="primary" link @click="ClickStatusRecord">提交记录</el-button> -->
						</el-menu-item>
						<el-menu-item index="4">
							<router-link to="/discusslist">讨论</router-link>
						</el-menu-item>
						<el-menu-item index="5">
							<router-link to="/userrank">排名</router-link>
						</el-menu-item>
						<el-menu-item index="6">
							<router-link to="/test">测试</router-link>
						</el-menu-item>
						<el-menu-item index="7">
							<el-button type="primary" @click="openlogindialog">登录</el-button>
						</el-menu-item>
						<el-menu-item index="8">
							<el-button type="primary" @click="openregisterdialog">注册</el-button>
						</el-menu-item>
						<el-menu-item index="9">
							<el-dropdown @command="handleCommand">
								<el-button type="primary">
									你好！{{store.state.NickName}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
								</el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item command="userhome">个人主页</el-dropdown-item>
										<el-dropdown-item command="statusrecord">我的提交</el-dropdown-item>
										<el-dropdown-item command="usersetting">设置</el-dropdown-item>
										<el-dropdown-item command="admin">管理员</el-dropdown-item>
										<el-dropdown-item>退出登录</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-menu-item>
				</el-menu>
			</el-header>
			<el-main>
				<login ref="logindialog"></login>
				<register ref="registerdialog"></register>
				<router-view></router-view>
			</el-main>
	  	</el-container>
	</div>
</template>
<script setup>
import Register from './components/Dialog/Register.vue'
import Login from './components/Dialog/Login.vue'
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import store from './store'
import { useRouter } from 'vue-router'
const router = useRouter();

const logindialog = ref()
const registerdialog = ref()

function openlogindialog(){
	logindialog.value.open()
}
function openregisterdialog(){
	registerdialog.value.open()
}
function handleCommand(command){
	console.log('Command',command)
	if(command == "userhome"){
		console.log('调用userhome')
		router.push({name:"UserHome",query:{UserId:store.state.UserId}})
	}else if(command == "usersetting"){
		console.log('调用usersetting')
		router.push({name:"UserSetting",query:{UserId:store.state.UserId}})
	}else if(command == "admin"){
		router.push({name:"Admin"})
		
	}else if(command == "statusrecord"){
		router.push({
			name:"StatusRecord",
			query:{
				UserId:store.state.UserId
			}
		})
	}

}

</script>
<style scoped>
.el-container{
    padding: 0;
    margin: 0;
	height: 100vh;
	width: 1280px;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
