import React, {useState} from "react";
import Taro from '@tarojs/taro'
import {Picker, View} from "@tarojs/components";
import {observer} from "mobx-react";
import {AtButton, AtForm, AtInput, AtList, AtListItem, AtMessage, AtTextarea} from "taro-ui";
import {useUserInfoStore} from "../../store";
import {dateFormat} from "../../util/date_util";
import {addOrder} from "../../util/api_util";

const Order = () => {

  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [lastTime, setLastTime] = useState('')
  const [unit, setUnit] = useState('')
  const [timeQuantum, setTimeQuantum] = useState('')
  const [extra, setExtra] = useState('')

  const timeQuantums = ['早上(8:00-12:00)', '下午(14:00-18:00)', '晚上(19:00-21:00)']

  const {userInfo} = useUserInfoStore()

  const onFormSubmit = async () => {
    if (content.length == 0) {
      Taro.atMessage({
        'message': '请输入活动内容',
        'type': 'error',
      })
      return
    }
    if (unit.length == 0) {
      Taro.atMessage({
        'message': '请输入主办单位',
        'type': 'error',
      })
      return
    }
    if (timeQuantum.length == 0) {
      Taro.atMessage({
        'message': '请选择时间段',
        'type': 'error',
      })
      return
    }
    if (date.length == 0) {
      Taro.atMessage({
        'message': '请选择日期',
        'type': 'error',
      })
      return
    }
    if (lastTime.length == 0) {
      Taro.atMessage({
        'message': '请选择活动时长',
        'type': 'error',
      })
      return
    }

    Taro.showLoading({
      title: '提交中...'
    }).then(async () => {
      let result = await addOrder({
        content: content,
        date: date,
        last_time: lastTime,
        time: timeQuantum,
        unit: unit,
        extra: extra
      })
      Taro.hideLoading()
      Taro.showToast({
        title: result.message,
        icon: result.flag ? 'success' : 'none'
      }).then(async () => {
        if (result.flag) {
          setContent('')
          setUnit('')
          setExtra('')
        }
      })
    })
  }

  return (
    <View
      className='page-wrapper'
    >
      <AtMessage/>
      <AtForm>
        <AtInput
          name='name'
          // @ts-ignore
          value={userInfo ? userInfo['name'] : '请登录'}
          onChange={() => {
          }}
          editable={false}
          title='姓名'
          type='text'
        />

        <AtInput
          name='content'
          value={content}
          onChange={value => setContent(value.toString())}
          type='text'
          title='活动内容'
          placeholder='请输入活动内容'
        />

        <AtInput
          name='unit'
          value={unit}
          onChange={value => setUnit(value.toString())}
          type='text'
          title='主办单位'
          placeholder='请输入活动主办单位'
        />

        <View
          style={{
            paddingLeft: '1%'
          }}
        >
          <Picker
            mode='selector'
            range={timeQuantums}
            value={0}
            onChange={event => setTimeQuantum(timeQuantums[event.detail.value].slice(0, 2))}
          >
            <AtList>
              <AtListItem
                title='时间段'
                extraText={timeQuantum}
              />
            </AtList>
          </Picker>

          <Picker
            mode='date'
            value={date}
            onChange={event => {
              let value = new Date(event.detail.value)
              if (value <= new Date()) {
                Taro.showToast({
                  title: '请选择今天以后的时间',
                }).then(() => {
                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  setDate(dateFormat(tomorrow, 'YYYY-mm-dd'))
                })
              } else {
                setDate(event.detail.value)
              }
            }}
          >
            <AtList>
              <AtListItem
                title='预约日期'
                extraText={date ? date : '请选择日期'}
              />
            </AtList>
          </Picker>

          <Picker
            mode='time'
            value={lastTime}
            onChange={event => {
              let value = event.detail.value
              let time = new Date(dateFormat(new Date(), 'YYYY-mm-dd ') + value)
              let fourHour = new Date(dateFormat(new Date(), 'YYYY-mm-dd ') + '04:00')
              if (time > fourHour) {
                console.log('时间不得超过4小时')
                setLastTime('04:00')
              } else {
                setLastTime(event.detail.value.toString())
              }
            }}
          >
            <AtList>
              <AtListItem
                title='活动时长'
                extraText={lastTime ? lastTime : '不超过4小时'}
              />
            </AtList>
          </Picker>
        </View>

        <AtTextarea
          value={extra}
          onChange={value => setExtra(value.toString())}
          placeholder='备注'
        />

        <AtButton
          type='primary'
          onClick={onFormSubmit}
        >
          提交预约
        </AtButton>
      </AtForm>
    </View>
  )
}
export default observer(Order)
