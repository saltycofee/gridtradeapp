import request from '@/utils/request-c'



//获取用户信息
export function getuserinfo(data) {
  return request({
    url: '/trade/getaccountinfo',
    method: 'post',
    data
  })
}

//获取用户apikey
export function getapikey(data) {
  return request({
    url: '/trade/getapikey',
    method: 'post',
    data
  })
}

//登录
export function login(data) {
  return request({
    url: '/trade/login',
    method: 'post',
    data
  })
}


//创建任务
export function CreatTask(data) {
  return request({
    url: '/trade/create_task',
    method: 'post',
    data
  })
}

//获取任务列表
export function gettasks(data) {
  return request({
    url: '/trade/get_taskinfo',
    method: 'post',
    data
  })
}

//开始或者停止任务,移除任务
export  function action(data) {
  return request({
    url:'/trade/contorltask',
    method: 'post',
    data
  })
}

//查询已完成的订单
export  function searchorder(data) {
  return request({
    url:'/trade/querylist',
    method: 'post',
    data
  })
}

//查询收益情况
export  function searchprofit(data) {
  return request({
    url:'/trade/queryrecord',
    method: 'post',
    data
  })
}
