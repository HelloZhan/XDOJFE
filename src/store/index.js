import { createStore } from 'vuex'

export default createStore({
	// 存放数据
	state: {
		UserId:'0',
		NickName:'未登录',
		Avatar:'http://192.168.49.132:8081/image/1',
		CommentLikes:[],
		Solves:[],
		Authority:1,
		IsLogin:false,
		IsAdmin:false
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
		}
	},
	actions: {
		
	},
	modules: {

	}
})

