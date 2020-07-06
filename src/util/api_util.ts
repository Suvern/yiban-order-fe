import Taro from '@tarojs/taro'
import {commitRequest} from "./http_util";
import userInfoStore from "../store/user_info";
import orderStore from "../store/order";

const baseUrl = 'https://yibanorder.91cumt.com/api/'

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
    data: JSON.stringify(data)
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
    data: JSON.stringify(data)
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
    header: {'token': userInfoStore.token},
    data: params
  }

  return commitRequest(requestArgs)
}

// 申请预约
export const addOrder = async (
  data: {
    content: string,
    date: string,
    time: string,
    last_time: string,
    unit: string,
    extra: string
  }
) => {
  const requestArgs = {
    url: baseUrl + 'order/add',
    method: 'POST',
    header: {'token': userInfoStore.token},
    data: data,
  }
  return commitRequest(requestArgs)
}
