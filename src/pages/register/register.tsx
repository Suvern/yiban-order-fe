import React, {useEffect, useState} from "react";
import {Picker, View} from "@tarojs/components";
import {AtButton, AtForm, AtInput, AtList, AtListItem, AtMessage} from "taro-ui";
import Taro from '@tarojs/taro'
import '../../app.css'
import {register} from "../../util/api_util";
import userInfoStore from "../../store/user_info";

const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [unit, setUnit] = useState('')
  const [position, setPosition] = useState('')
  const [cumtValidated, setCUMTValidated] = useState(false)
  const [validateLoading, setValidateLoading] = useState(false)

  useEffect(() => {
    // componentDidMount
    Taro.showModal({
      title: '注册须知',
      content: '请使用中国矿业大学统一认证登录的学号/工号和密码注册，点击"验证"按钮认证通过后才能继续注册'
    }).then(() => {
    })
  }, [])

  const onFormSubmit = async () => {
    if (!validateFields()) {
      return
    }
    Taro.showLoading({
      title: '注册中...'
    }).then(async () => {
      let result = await register({
        username: username,
        password: password,
        name: name,
        phone: phone,
        gender: gender,
        unit: unit,
        position: position
      })
      Taro.hideLoading()
      Taro.showToast({
        title: result.message,
        icon: result.flag ? 'success' : 'none'
      }).then((async () => {
        if (result.flag) {
          let token = result.data['token']
          let user = result.data['user']
          userInfoStore.setToken(token)
          userInfoStore.setUserInfo(user)
          await Taro.navigateBack({
            delta: 2
          })
        }
      }))
    })
  }

  // 验证CUMT统一认证
  const validateAccount = async () => {
    if (username.length == 0 || password.length == 0) {
      Taro.atMessage({
        'message': '请输入账号和密码',
        'type': 'error'
      })
      return
    }
    setValidateLoading(true)
    setCUMTValidated(true)
    setValidateLoading(false)

    // setValidateLoading(true)
    // let result = await validateCUMT({
    //   username: username,
    //   password: password,
    // })
    // Taro.atMessage({
    //   'message': result ? '认证成功' : '认证失败',
    //   'type': result ? 'success' : 'error'
    // })
    // setValidateLoading(false)
    // setCUMTValidated(result)
  }

  const validateFields = () => {
    if (username.length == 0) {
      Taro.atMessage({
        'message': '请输入学号/工号',
        'type': 'error'
      })
      return false
    }
    if (password.length == 0) {
      Taro.atMessage({
        'message': '请输入密码',
        'type': 'error'
      })
      return false
    }
    if (name.length == 0) {
      Taro.atMessage({
        'message': '请输入姓名',
        'type': 'error'
      })
      return false
    }
    if (phone.length == 0) {
      Taro.atMessage({
        'message': '请输入手机号',
        'type': 'error'
      })
      return false
    }
    if (gender.length == 0) {
      Taro.atMessage({
        'message': '请选择性别',
        'type': 'error'
      })
      return false
    }
    if (unit.length == 0) {
      Taro.atMessage({
        'message': '请输入单位',
        'type': 'error'
      })
      return false
    }
    return true
  }

  return (
    <View
      className='page-wrapper'
    >

      <View>
        <AtMessage/>
        <AtForm>
          <AtInput
            name='username'
            disabled={validateLoading}
            editable={!cumtValidated}
            value={username.toString()}
            onChange={(value) => {
              setUsername(value.toString())
            }}
            title='用户名'
            type='number'
            placeholder='请输入学号/工号'
          />

          <AtInput
            name='password'
            disabled={validateLoading}
            editable={!cumtValidated}
            value={password.toString()}
            onChange={(value) => {
              setPassword(value.toString())
            }}
            title='密码'
            type='password'
            placeholder='请使用统一身份认证密码'
          >
            {
              cumtValidated
                ?
                <View>验证通过</View>
                :
                <AtButton
                  type='secondary'
                  size='small'
                  loading={validateLoading}
                  onClick={validateAccount}
                >
                  验证
                </AtButton>
            }
          </AtInput>

          <AtInput
            name='realName'
            value={name}
            onChange={(value) => {
              setName(value.toString())
            }}
            title='姓名'
            type='text'
            placeholder='请输入姓名'
          />

          <AtInput
            name='phone'
            value={phone.toString()}
            onChange={(value) => {
              setPhone(value.toString())
            }}
            title='手机号码'
            type='phone'
            placeholder='请输入11位手机号'
          />

          <View style={{paddingLeft: '1%'}}>
            <Picker
              mode='selector'
              range={['男', '女']}
              onChange={(event) => {
                setGender(event.detail.value == 0 ? '男' : '女')
              }}
              value={0}
            >
              <AtList>
                <AtListItem
                  title='性别'
                  extraText={gender}
                />
              </AtList>
            </Picker>
          </View>

          <AtInput
            name='unit'
            value={unit.toString()}
            onChange={(value) => {
              setUnit(value.toString())
            }}
            title='单位'
            type='text'
            placeholder='请输入工作单位'
          />

          <AtInput
            name='position'
            value={position.toString()}
            onChange={(value) => {
              setPosition(value.toString())
            }}
            title='职务'
            type='text'
            placeholder='请输入职务'
          />

          <View
            style={{marginTop: '8%',}}
          >
            <AtButton
              className='button-normal'
              type='primary'
              disabled={!cumtValidated}
              onClick={onFormSubmit}
            >
              注册
            </AtButton>

            <AtButton
              className='button-normal'
              type='secondary'
              onClick={() => {
                setUsername('')
                setPassword('')
                setCUMTValidated(false)
                setName('')
                setPhone('')
                setGender('')
                setUnit('')
                setPosition('')
              }}
            >
              重新填写
            </AtButton>
          </View>

        </AtForm>
      </View>

    </View>
  )
}

export default Register
