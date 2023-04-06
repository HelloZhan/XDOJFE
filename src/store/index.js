import { createStore } from 'vuex'
import service from '../axios'

export default createStore({
	// 存放数据
	state: {
		UserId:'0',
		NickName:'未登录',
		// Avatar:'http://192.168.49.132:8081/image/1',    // 本地
		Avatar:'http://175.178.54.194:8081/image/1', // 云服务器
		CommentLikes:[],
		Solves:[],
		Authority:1,
		IsLogin:false,
		IsAdmin:false,
		ProblemTags:[]
	},
	mutations: {
		/*
			功能：登录用户
			传入：Json(Account,PassWord)
			传出：Json(Result,Reason,Info(_id,NickName,Avatar,CommentLikes,Solves,Authority))
		*/
		Login(state,userinfo){
			state.UserId = userinfo._id
			state.NickName = userinfo.NickName
			state.Avatar = userinfo.Avatar
			state.CommentLikes = userinfo.CommentLikes
			state.Solves = userinfo.Solves
			state.Authority = userinfo.Authority
			state.IsLogin = true
			if(state.Authority==5)
				state.IsAdmin=true
		},
		Logout(state){
			state.UserId = '0'
			state.NickName = '未登录'
			// state.Avatar = 'http://192.168.49.132:8081/image/1' // 本地
			state.Avatar = 'http://175.178.54.194:8081/image/1' // 云服务器
			state.CommentLikes = []
			state.Solves = []
			state.Authority = 1
			state.IsLogin = false
			state.IsAdmin = false
			localStorage.removeItem('Account')
			localStorage.removeItem('PassWord')
		},
		GetProblemTags(state){
			service
			.get(`/api/tags`, {
				params:{
					TagType:"Problem"
				}
			})
			.then(
				(response) => {
					state.ProblemTags = response.data.Tags
				},
				(error) => {
					
				}
			);
		}
	},
	actions: {
		
	},
	modules: {

	}
})

