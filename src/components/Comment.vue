<template>
    <div class="comment-view">
        <u-comment
            :config="config"
            :show-size="3"
            page
            style="width: 820px; margin-left: 2rem"
            @submit="submit"
            @like="like"
            @remove="remove"
            @report="report"
            @reply-page="replyPage"
        ></u-comment>
    </div>
</template>

<script setup lang="ts">
	import store from '../store'
	import service from '../axios'
  	import { reactive, ref } from 'vue'
  	import { UToast, ConfigApi, CommentApi, ReplyPageParam, CommentSubmitParam, ReplyApi } from 'undraw-ui'
	// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases
	// static文件放在public下,引入emoji.ts文件可以移动到自定义位置
  	import emoji from '../../public/emoji'
	// 父亲ID（讨论ID或者题解ID）
	const props = defineProps(['ParentId','ArticleType'])
	// 保存父评论信息
	let commentinfo = reactive({'array':[]})
	// 保存父评论个数
  	let commetnum = ref(0)
	// 获取父评论信息
	function getCommentInfo(ParentId:string){
		service
			.get(`/api/comment`, {
			params: {
				Type:"Father",
				ParentId: ParentId,
				Skip:0,
				Limit:10,
				SonNum:5,
			},
			})
			.then(
			(response) => {
				console.log("请求成功了！！！",response.data);
				commentinfo.array = response.data.ArryInfo;
        		commetnum.value = response.data.TotalNum;
				if(response.data.ArryInfo!=null) setCommentInfo()
			},
			(error) => {
				console.log("请求失败了！！！");
				console.log(error.data);
			}
		);
	}
	// 调用函数
	getCommentInfo(props.ParentId)
  	// 本人的信息 id，name，头像，点赞的
	const config = reactive<ConfigApi>({
		user: {
			id: store.state.UserId,
			username: store.state.NickName,
			avatar: store.state.Avatar,
			// 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
			likeIds: store.state.CommentLikes
		},
		emoji: emoji,
		comments: []
	})
	function setCommentInfo(){
    console.log('setCommentInfo')
		for(var i=0;i<commentinfo.array.length;i++){
			let commentone: CommentApi = {
				id: String(commentinfo.array[i]["_id"]),
				parentId: commentinfo.array[i]["ParentId"],
				uid: commentinfo.array[i]["User"][0]["_id"],
				address: '',
				content: commentinfo.array[i]["Content"],
				likes: commentinfo.array[i]["Likes"],
				createTime: commentinfo.array[i]["CreateTime"],
				user: {
					username: commentinfo.array[i]["User"][0]["NickName"],
					avatar: commentinfo.array[i]["User"][0]["Avatar"],
					level: 0,
					homeLink: ``
				},
				reply: null
    		}
			let child_total = commentinfo.array[i]["Child_Total"];
			let replayinfo:ReplyApi={
				total:child_total,
				list:[]
			}
			if(child_total > 0){
				var tmpinfo = commentinfo.array[i]["Child_Comments"];
				for(var tmp in tmpinfo){
					let info={
						id: tmpinfo[tmp]["_id"],
						parentId: String(commentinfo.array[i]["_id"]),
						uid: tmpinfo[tmp]["User"][0]["_id"],
						address: '',
						content: tmpinfo[tmp]["Content"],
						likes: tmpinfo[tmp]["Likes"],
						createTime: tmpinfo[tmp]["CreateTime"],
						user: {
							username: tmpinfo[tmp]["User"][0]["NickName"],
							avatar:tmpinfo[tmp]["User"][0]["Avatar"],
							level: 0,
							homeLink: ''
						}
					}
					replayinfo.list.push(info)
				}
				commentone.reply = replayinfo
			}
			config.comments.push(commentone)
		}
	}
	//获取文件url
	// function createObjectURL(blob: any) {
	// 	if (window.URL) {
	// 	return window.URL.createObjectURL(blob)
	// 	} else if (window.webkitURL) {
	// 	return window.webkitURL.createObjectURL(blob)
	// 	} else {
	// 	return ''
	// 	}
	// }
  
	// 提交评论事件
	const submit = ({ content, parentId, files, finish }: CommentSubmitParam) => {
		console.log('提交评论: ' + content, parentId, files)
		let info={}
		if(parentId == null){ // 父评论
			info={
				Type:"Father",
				ArticleType:props.ArticleType,
				ArticleId:props.ParentId,
				ParentId: props.ParentId,
				Content:content,
				UserId:config.user.id,
			}
		}else{ // 子评论
			info={
				Type:"Son",
				ArticleType:props.ArticleType,
				ArticleId:props.ParentId,
				ParentId: parentId,
				Content:content,
				UserId:config.user.id,
			}
		}

		// Type:Father,ParentId:props.ParentId,
		service
			.post(`/api/comment/insert`, {
			Info: info,
			})
			.then(
			(response) => {
				console.log("请求成功了！！！",response.data);
				/**
				 * 上传文件后端返回图片访问地址，格式以', '为分割; 如:  '/static/img/program.gif, /static/img/normal.webp'
				 */
				//let contentImg = files.map((e: any) => createObjectURL(e)).join(', ')
				let comment: CommentApi = {
					id: String((response.data._id)),
					parentId: parentId,
					uid: config.user.id,
					address: '',
					content: content,
					likes: 0,
					createTime: response.data.CreateTime,
					contentImg: '',
					user: {
						username: config.user.username,
						avatar: config.user.avatar,
						level: 0,
						homeLink: ``
					},
					reply: null
				}
				finish(comment)
				UToast({ message: '评论成功!', type: 'info' })
			},
			(error) => {
				console.log("请求失败了！！！");
				console.log(error.data);
			}
		);
  	}
  
	// 删除评论
	const remove = (id: number, finish: () => void) => {
		service
			.post(`/api/comment/delete`, {
				ArticleType:props.ArticleType,
				ArticleId:props.ParentId,
				CommentId:id
			})
			.then(
			(response) => {
				console.log("请求成功了！！！",response.data);
				finish()
				alert(`删除成功: ${id}`)
			},
			(error) => {
				console.log("请求失败了！！！");
				console.log(error.data);
			}
		);
	}
  
  	//举报用户
	const report = (id: number, finish: () => void) => {
		console.log(id)
		setTimeout(() => {
		finish()
		alert(`举报成功: ${id}`)
		}, 200)
	}
  
  	// 点赞按钮事件 TOOD:暂时不能做，因为涉及到删除评论时，用户的数据也要删除
	const like = (id: number, finish: () => void) => {
		console.log(id)
		setTimeout(() => {
		finish()
		}, 200)
	}
  
	//子评论回复分页
	const replyPage = ({ parentId, pageNum, pageSize, finish }: ReplyPageParam) => {
		let childcommentinfo = reactive({'array':[]})
		let childcommentnum = ref(0)
		service
			.get(`/api/comment`, {
			params: {
				Type:"Son",
				ParentId: parentId,
				Skip:(pageNum - 1) * pageSize,
				Limit:pageSize,
				SonNum:5,
			},
			})
			.then(
			(response) => {
				console.log("请求成功了！！！",response.data);
				childcommentinfo.array = response.data.Child_Comments;
        		childcommentnum.value = response.data.Child_Total;
				let tmp :ReplyApi= {
					total: childcommentnum.value,
					list: []
				}
				for(var tmpindex in childcommentinfo.array)
				{
					let tmpinfo = childcommentinfo.array[tmpindex]
					let info={
						id: tmpinfo["_id"],
						parentId: String(parentId),
						uid: tmpinfo["User"][0]["_id"],
						address: '',
						content: tmpinfo["Content"],
						likes: tmpinfo["Likes"],
						createTime: tmpinfo["CreateTime"],
						user: {
							username: tmpinfo["User"][0]["NickName"],
							avatar:tmpinfo["User"][0]["Avatar"],
							level: 0,
							homeLink: ''
						}
					}
					tmp.list.push(info)
				}
				finish(tmp)
			},
			(error) => {
				console.log("请求失败了！！！");
				console.log(error.data);
			}
		);
		console.log('回复分页')
	}
</script>


  
<style lang="scss">
.comment-view{
    margin-top: 2rem;
  display: flex;
}

  .vp-doc ul {
    list-style: none !important;
  }
  
  .vp-doc ul,
  .vp-doc ol {
    padding-left: 0 !important;
    margin: 0 !important;
  }
  
  .vp-doc li + li {
    margin-top: 0px !important;
  }
  
  </style>
  