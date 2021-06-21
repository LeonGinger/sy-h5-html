import request from "@/config/http.js"
//请求数据
export function getCode(){
	return request.baseRequest(
		'usersave',
		'POST',
	)
}
//登录授权
export function wxlogin(data){
	return request.baseRequest(
		'user/user/Login',
		'GET',
		data
	)
}
//获取用户信息
export function userinfo(){
	return request.baseRequest(
		'this_user',
		'POST',
	)
}

//用户信息修改
export function usersave(data){
	return request.baseRequest(
		'usersave',
		'POST',
		data
	)
}
//操作员注销
export function my_quit(){
 return request.baseRequest(
  'my_quit',
  'POST',
 )
}

//请求商家信息接口
export function business_selectall(){
	return request.baseRequest(
		'business_selectall',
		'POST',
	)
}
//商家申请入驻
export function business_applyad(data){
	return request.baseRequest(
		'business_applyad',
		'POST',
		data
	)
}

//sd-sdk信息接口
export function sdsdk(data){
	return request.baseRequest(
		'getConfig',
		'POST',
		data
	)
}

//图片上传接口
export function upFile(file){
	return request.uploadFile(
		'upload_headimg',
		'POST',
		file
	)
}

//员工扫码添加
export function join_my(data){
 return request.baseRequest(
  'join_my',
  'GET',
  data
 )
}

//刷新token
export function token(data){
 return request.baseRequest(
  'token',
  'POST',
  data
 )
}

//踢出员工
export function out_my_user(data){
 return request.baseRequest(
  'out_my_user',
  'POST',
  data
 )
}

//发送验证码
export function iphone_code(data){
 return request.baseRequest(
  'iphone_code',
  'POST',
  data
 )
}
//商家入驻发送验证码
export function iphonebs_code(data){
 return request.baseRequest(
  'iphonebs_code',
  'POST',
  data
 )
}
//员工目录
export function my_user(data){
 return request.baseRequest(
  'my_user',
  'POST',
  data
 )
}


//商家入住不通过后修改 
export function business_updateall(data){
 return request.baseRequest(
  'business_updateall',
  'POST',
  data
 )
}



//修改部分商家信息
export function business_update(data){
 return request.baseRequest(
  'business_update',
  'POST',
  data
 )
}


//商家注销
export function business_delete(data){
 return request.baseRequest(
  'business_delete',
  'POST',
  data
 )
}

//添加商品
export function create_menu(data){
 return request.baseRequest(
  'create_menu',
  'POST',
  data
 )
}

//删除商品
export function delete_menu(data){
 return request.baseRequest(
  'delete_menu',
  'POST',
  data
 )
}

//修改商品
export function update_menu(data){
 return request.baseRequest(
  'update_menu',
  'POST',
  data
 )
}

//商品列表信息接口
export function my_menu(){
 return request.baseRequest(
  'my_menu',
  'POST',
 )
}


//溯源记录
export function this_source_log(){
 return request.baseRequest(
  'this_source_log',
  'POST',
 )
}

//出入库记录
export function opend_list(){
 return request.baseRequest(
  'opend_list',
  'POST',
 )
}


//溯源信息判断接口
export function SelectAll(data){
 return request.baseRequest(
  'SelectAll',
  'POST',
  data
 )
}


//溯源信息查看操作接口
export function open_source(data){
 return request.baseRequest(
  'open_source',
  'POST',
  data
 )
}

//查询单个商品
export function find_menu(data){
 return request.baseRequest(
  'find_menu',
  'POST',
  data
 )
}


//常见问题查询
export function common_problem(){
 return request.baseRequest(
  'common_problem',
  'POST',
 )
}

//查询商家接口
export function businessfind(data){
 return request.baseRequest(
  'businessfind',
  'POST',
  data
 )
}

//商家须知
export function business_notice(){
 return request.baseRequest(
  'business_notice',
  'POST',
 )
}


//入住不通过后提交
export function business_open(data){
 return request.baseRequest(
  'business_open',
  'POST',
	data
 )
}


//快递修改
export function goto_update(data){
 return request.baseRequest(
  'goto_update',
  'POST',
	data
 )
}