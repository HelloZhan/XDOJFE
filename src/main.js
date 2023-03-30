import { createApp } from 'vue'
import App from './App.vue'
// ---------- ?? ----------
// -------------------------
// ---------- vuex ----------
import store from './store'
// -------------------------
import './assets/main.css'
// ---------- 路由 ----------
import router from './router'
// -------------------------
// ---------- element UI -------
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// -------------------------
// ---------- markdown ----------
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  	Hljs: hljs,
});

VMdEditor.use(githubTheme, {
	Hljs: hljs,
});
// -------------------------

// ---------- 评论 ----------
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
// -------------------------

// 获取本地用户信息
import service from './axios'
let account = localStorage.getItem('Account')
let password = localStorage.getItem('PassWord')
// 如果获取到用户名和密码则进行登录
if(account && password){
	service
	.post(`/api/user/login`, {
		Account:account,
		PassWord:password,
	})
	.then(
	(response) => {
		if(response.data.Result == "Success"){
			// 登录成功
			store.commit('Login',response.data.Info)
			return
		}else{
			// 登录失败
			localStorage.removeItem('Account')
			localStorage.removeItem('PassWord')
			return
		}
	},
	(error) => {
		console.log(error.data);
	}
	);
}
// 获取题目标签
store.commit('GetProblemTags')

const app = createApp(App)
app.mount('#app')
// 评论UI
app.use(UndrawUi)
// 路由
app.use(router)
// element-UI
app.use(ElementPlus)
// markdown
app.use(VMdPreview)
app.use(VMdEditor)
// vuex
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
