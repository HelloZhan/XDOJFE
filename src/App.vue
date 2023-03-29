<template>
	<div class="header">
		<el-menu id="nav"
			:default-active="$route"
			class="el-menu-demo"
			mode="horizontal"
			v-bind:router="true"
		>
			<el-menu-item index="/">
				<el-icon><HomeFilled /></el-icon>
				首页
			</el-menu-item>
			<el-menu-item index="/problemlist">
				<el-icon><Grid /></el-icon>
				题库
			</el-menu-item>
			<el-menu-item index="/statusrecord">
				<el-icon><Tools /></el-icon>
				测评
			</el-menu-item>
			<el-menu-item index="/discusslist">
				<el-icon><Comment /></el-icon>
				讨论
			</el-menu-item>
			<el-menu-item index="/userrank">
				<el-icon><Histogram /></el-icon>
				排名
			</el-menu-item>
			<el-menu-item index="/test">
				测试
			</el-menu-item>
			<div class="flex-grow" />
			<el-button id="button" type="primary" @click="openlogindialog">登录</el-button>
			<el-button id="button" type="primary" @click="openregisterdialog">注册</el-button>
			<el-dropdown @command="handleCommand" id="user">
				<el-button type="primary">
					<el-icon><User /></el-icon>{{store.state.NickName}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="userhome">
							<el-icon><User /></el-icon>个人主页
						</el-dropdown-item>
						<el-dropdown-item command="statusrecord">
							<el-icon><Edit /></el-icon>我的提交
						</el-dropdown-item>
						<el-dropdown-item command="discuss">
							<el-icon><Edit /></el-icon>我的讨论
						</el-dropdown-item>
						<el-dropdown-item command="solution">
							<el-icon><Edit /></el-icon>我的题解
						</el-dropdown-item>
						<el-dropdown-item command="usersetting">
							<el-icon><Setting /></el-icon>设置
						</el-dropdown-item>
						<el-dropdown-item command="admin">
							<el-icon><Odometer /></el-icon>管理员
						</el-dropdown-item>
						<el-dropdown-item>
							<el-icon><SwitchButton /></el-icon>退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</el-menu>
	</div>
	<div class="main">
		<login ref="logindialog"></login>
		<register ref="registerdialog"></register>
		<router-view></router-view>
	</div>
	<div class="footer">
		<p>
			Powered by
			<a href="https://github.com/HelloZhan/XDOJ.git"
			target="_blank"
			style="text-decoration: none;color:#409EFF;">HelloZhan</a>
		</p>
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
	}else if(command == "discuss"){
		router.push({
			name:"DiscussList",
			query:{
				UserId:store.state.UserId
			}
		})
	}else if(command == "solution"){
		router.push({
			name:"SolutionList",
			query:{
				UserId:store.state.UserId
			}
		})
	}

}

</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}


#button {
  float: right;
  margin: 20px;
}
#user {
  float: right;
  margin: 10px;
}
#nav {
  background-color: #ffffff;
  position: relative;
  margin: 5px;
  /* left: 0px; */
  /* top: 0px; */
  z-index: 5;
  width: 100%;
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
.footer {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: small;
}
</style>
