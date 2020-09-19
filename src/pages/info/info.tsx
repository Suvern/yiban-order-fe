import {Image, View} from "@tarojs/components";
import React, {useState} from "react";
import {AtDivider, AtSteps, AtTag} from "taro-ui";
import Taro from '@tarojs/taro'
import '../../app.css'
import {flyingInfo, peopleInfo1, peopleInfo2, peopleInfo3, qqGroup, yibanInfo} from "./info_text";

const Info = () => {

  const [step, setStep] = useState(0)
  const stepItems = [
    {
      'title': '申请预约',
      'desc': '注册登录小程序并申请预约'
    },
    {
      'title': '管理员审核',
      'desc': '管理员后台审核预约,请提前联系易班指导老师或工作人员'
    },
    {
      'title': '审核结果',
      'desc': '审核结果可通过\"我的预约\"查询'
    }
  ]

  const toClipBoard = (phone: string) => {
    Taro.setClipboardData({
      data: phone,
    }).then(async r => {
      if (r.errMsg.includes('ok')) {
        await Taro.showToast({
          title: '复制成功!',
        })
      }
    })
  }

  return (
    <View
      className='page-wrapper'
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'start',
          marginTop: '8%',
          marginBottom: '8%'
        }}
      >
        <View className='at-article__h1'>
          易班大厅预约流程
        </View>
      </View>
      <AtSteps
        items={stepItems}
        current={step}
        onChange={value => setStep(value)}
      />

      <View
        className='at-article'
        style={{
          marginTop: '12%',
          marginBottom: '10%'
        }}
      >
        <View className='at-article__h2'>
          中国矿业大学易班简介
        </View>

        <View className='at-article__p'>
          {yibanInfo}
        </View>

        <View className='at-article__p' style={{color: '#4F79E3'}}>
          {peopleInfo1.text}
          <AtTag onClick={() => {
            toClipBoard(peopleInfo1.phone)
          }} type='primary' circle>点击复制Tel：{peopleInfo1.phone}</AtTag>
        </View>

        <View className='at-article__p' style={{color: '#228B22'}}>
          {peopleInfo2.text}
          <AtTag onClick={() => {
            toClipBoard(peopleInfo2.phone)
          }} type='primary' circle>点击复制Tel：{peopleInfo2.phone}</AtTag>
        </View>

        <View className='at-article__p' style={{color: '#228B22'}}>
          {peopleInfo3.text}
          <AtTag onClick={() => {
            toClipBoard(peopleInfo3.phone)
          }} type='primary' circle>点击复制Tel：{peopleInfo3.phone}</AtTag>
        </View>
      </View>

      <AtDivider/>

      <View className='at-article'>
        <View style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <View className='at-article__h2'>
            中国矿业大学翔工作室简介
          </View>
          <View className='at-article__img'>
            <Image
              style={{
                marginTop: '3vh',
                marginBottom: '3vh',
                width: '150px',
                height: '30px',
              }}
              src={'https://s1.ax1x.com/2020/09/19/wIp6v8.png'}
            />
          </View>
        </View>
        <View className='at-article__p'>
          {flyingInfo}
        </View>
        <View className='at-article__p' style={{color: '#0000ff'}}>
          小程序开发、后端开发： 王昭君
        </View>
        <View className='at-article__p' style={{color: '#aabb00'}}>
          矿小助统一认证服务开发：刘浩
        </View>

        <View
          style={{
            marginTop: '2vh',
            marginBottom: '8vh',
            marginLeft: '3vw'
          }}
        >
          <AtTag
            onClick={() => {
              toClipBoard(qqGroup)
            }}
            type='primary'
            circle
          >
            加入QQ群：{qqGroup} (点击复制群号)
          </AtTag>
        </View>
      </View>
    </View>
  )
}

export default Info
