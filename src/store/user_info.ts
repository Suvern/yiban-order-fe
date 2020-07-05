import Taro from '@tarojs/taro'
import {observable} from "mobx";

const userInfoStore = observable({
  userInfo: null,
  token: null,

  setUserInfo(userInfo: any) {
    this.userInfo = userInfo
    this.saveAll()
  },

  setToken(token: string) {
    this.token = token;
    this.saveAll()
  },

  saveAll() {
    Taro.setStorageSync('userInfo', this.userInfo)
    Taro.setStorageSync('token', this.token)
  },

  readAll() {
    this.userInfo = Taro.getStorageSync('userInfo')
    this.token = Taro.getStorageSync('token')
  },

  clearAll() {
    this.userInfo = null
    this.token = null
  },

  show() {
    console.log(this)
  }
})

export default userInfoStore
