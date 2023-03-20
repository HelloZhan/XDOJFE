import { createStore } from 'vuex'

export default createStore({
	// 存放数据
	state: {
		UserId:'0',
		NickName:'未登录',
		Avatar:'http://192.168.49.132:8081/image/1',
		CommentLikes:[],
		ACProblems:[],
		PersonalProfile:'',
		School:'',
		Major:'',
		Authority:1,
		isloading:false,
	},
	mutations: {
		// 登录 保存信息
		Login(state,userinfo){
			state.UserId = userinfo._id
			state.NickName = userinfo.NickName
			state.Avatar = userinfo.Avatar
			state.CommentLikes = userinfo.CommentLikes
			state.ACProblems = userinfo.ACProblems
			state.PersonalProfile = userinfo.PersonalProfile
			state.School = userinfo.School
			state.Major = userinfo.Major
			state.Authority = userinfo.Authority
			state.isloading = true
		}
	},
	actions: {
		
	},
	modules: {

	}
})

