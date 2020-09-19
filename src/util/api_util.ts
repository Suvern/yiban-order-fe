import Taro from '@tarojs/taro'
import {commitRequest} from "./http_util";
import userInfoStore from "../store/user_info";
import orderStore from "../store/order";

const baseUrl = 'https://yibanorder.91cumt.com/api/'
const metBaseUrl = 'https://api.liuh321.club'

// 登录
export const login = async (
  data: {
    username: string,
    password: string
  }
) => {
  const requestArgs = {
    url: baseUrl + 'user/login',
    method: 'POST',
    data: JSON.stringify(data),
    header: {'content-type': 'application/json'}
  }
  return commitRequest(requestArgs)
}

// 注销
export const logout = () => {
  userInfoStore.clearAll()
  orderStore.clearAll()
  Taro.clearStorageSync()
}

// 注册
export const register = async (
  data: {
    username: string,
    password: string,
    name: string,
    phone: string,
    gender: string,
    unit: string,
    position: string
  }
) => {
  const requestArgs = {
    url: baseUrl + 'user/register',
    method: 'POST',
    data: JSON.stringify(data),
    header: {'content-type': 'application/json'}
  }
  return commitRequest(requestArgs)
}

// 获取预约
export const getOrder = async (
  data: {
    phone: string | any,
    name: string | any
  }
) => {
  let params = {}
  if (data.phone) {
    params['phone'] = data.phone
  }
  if (data.name) {
    params['person_name'] = data.name
  }
  const requestArgs = {
    url: baseUrl + 'order',
    method: 'GET',
    header: {'token': userInfoStore.token, 'content-type': 'application/json'},
    data: params
  }

  return commitRequest(requestArgs)
}

// 申请预约
export const addOrder = async (
  data: {
    content: string,
    date: string,
    start_time: string,
    end_time: string,
    people: number,
    unit: string,
    extra: string
  }
) => {
  const requestArgs = {
    url: baseUrl + 'order/add',
    method: 'POST',
    header: {'token': userInfoStore.token, 'content-type': 'application/json'},
    data: data,
  }
  return commitRequest(requestArgs)
}

// CUMT统一认证 返回bool
export const validateCUMT = async (
  data: {
    username: string,
    password: string,
  }
) => {

  let result = await Taro.request({
    url: `${metBaseUrl}/login`,
    method: 'POST',
    header: {'content-type': 'application/x-www-form-urlencoded'},
    data: data,
  })

  return result.data['msg'] === '登陆成功'
}

const JSONToURLEncoded = (element, key, list) => {
  list = list || [];
  if (typeof (element) == 'object') {
    for (let idx in element)
      JSONToURLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
  } else {
    list.push(key + '=' + encodeURIComponent(element));
  }
  return list.join('&');
}
