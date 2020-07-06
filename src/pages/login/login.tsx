import React, {useState} from "react";
import {AtButton, AtForm, AtInput, AtTag} from "taro-ui";
import Taro from '@tarojs/taro'
import {Image, View} from "@tarojs/components";
import '../../app.css'
import {login} from "../../util/api_util";
import userInfoStore from "../../store/user_info";

const Login = () => {

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [showPwd, setShowPwd] = useState(false)

  const onFormSubmit = async () => {
    if (username.length == 0 || password.length == 0) {
      await Taro.showToast({
        title: '请输入用户名和密码',
        duration: 2000
      })
      return
    }

    // console.log(username)
    // console.log(password)

    setLoading(true)
    let result = await login({username: username, password: password})
    // let result = await login({username: '04171180', password: 'a821589498wmr'})
    Taro.showToast({
      title: result.message,
      duration: 2000,
    }).then(async () => {
      if (result.flag) {
        let token = result.data['token']
        let user = result.data['user']
        userInfoStore.setToken(token)
        userInfoStore.setUserInfo(user)
        setLoading(false)
        console.log(userInfoStore.userInfo)
        await Taro.navigateBack()
      }
    })
    setLoading(false)
  }

  return (
    <View
      className='page-wrapper'
    >
      <View
        style={{
          textAlign: 'center',
          font: '24px/1.5 \'Times New Roman\', Times, serif',
          marginTop: '20%',
          marginBottom: '4%'
        }}
      >
        易班大厅预约
      </View>

      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          style={{
            width: '130px',
            height: '130px'
          }}
          src='https://s1.ax1x.com/2020/07/06/UPASxK.jpg'
        />
        <Image
          style={{
            width: '130px',
            height: '130px',
          }}
          src='https://s1.ax1x.com/2020/07/06/UPEVw4.jpg'
        />
      </View>

      <View
        style={{
          paddingLeft: '8%',
          paddingRight: '8%',
          marginTop: '6%'
        }}
      >
        <AtForm>
          <AtInput
            name='username'
            disabled={loading}
            value={username}
            onChange={(value) => {
              setUsername(value.toString())
            }}
            title='用户名'
            type='text'
            placeholder='请输入用户名'
          />
          <AtInput
            name='password'
            disabled={loading}
            value={password}
            onChange={(value) => {
              setPassword(value.toString())
            }}
            title='密码'
            type={showPwd ? 'text' : 'password'}
            placeholder='请输入密码'>
            <AtTag
              size='small'
              circle
              active={showPwd}
              onClick={event => {
                setShowPwd(event.active)
              }}
            >
              {'显示'}
            </AtTag>
          </AtInput>
          <AtButton
            loading={loading}
            type='primary'
            formType='submit'
            onClick={onFormSubmit}
          >
            登录
          </AtButton>
          <AtButton
            type='secondary'
            onClick={async () => {
              await Taro.navigateTo({
                url: '../../pages/register/register'
              })
            }}
          >
            注册
          </AtButton>
        </AtForm>
      </View>

    </View>
  )
}

export default Login
