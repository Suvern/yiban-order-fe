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
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [people, setPeople] = useState(0)
  const [unit, setUnit] = useState('')
  const [extra, setExtra] = useState('')

  const {userInfo} = useUserInfoStore()

  const onFormSubmit = async () => {
    if (!checkFields()) {
      return
    }

    Taro.showLoading({
      title: '提交中...'
    }).then(async () => {
      let result = await addOrder({
        content: content,
        date: date,
        start_time: startTime,
        end_time: endTime,
        people: people,
        unit: unit,
        extra: extra,
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

  const checkFields = () => {
    if (content.length == 0) {
      Taro.atMessage({
        'message': '请输入活动内容',
        'type': 'error',
      })
      return false
    }
    if (unit.length == 0) {
      Taro.atMessage({
        'message': '请输入主办单位',
        'type': 'error',
      })
      return false
    }
    if (people == 0) {
      Taro.atMessage({
        'message': '请输入活动人数',
        'type': 'error',
      })
      return false
    }
    if (startTime.length == 0) {
      Taro.atMessage({
        'message': '请选择开始时间',
        'type': 'error',
      })
      return false
    }
    if (endTime.length == 0) {
      Taro.atMessage({
        'message': '请选择结束时间',
        'type': 'error',
      })
      return false
    }
    if (date.length == 0) {
      Taro.atMessage({
        'message': '请选择日期',
        'type': 'error',
      })
      return false
    }
    if (startTime.length == 0) {
      Taro.atMessage({
        'message': '请选择活动时长',
        'type': 'error',
      })
      return false
    }
    return true
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

        <AtInput
          name='people'
          value={people == 0 ? '' : String(people)}
          onChange={value => {
            if (Number(value) >= 50) {
              Taro.atMessage({
                type: 'info',
                message: '人数不得大于50'
              })
              setPeople(50)
            } else if (Number(value) <= 0) {
              Taro.atMessage({
                type: 'info',
                message: '最少输入1人'
              })
              setPeople(1)
            }
          }}
          type='number'
          title='活动人数'
          placeholder='请输入不超过50的数字'
        />

        <View
          style={{
            paddingLeft: '1%'
          }}
        >

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
            value={startTime}
            onChange={event => {
              let value = event.detail.value
              let time = new Date(dateFormat(new Date(), 'YYYY-mm-dd ') + value)
              let fourHour = new Date(dateFormat(new Date(), 'YYYY-mm-dd ') + '08:00')
              if (time < fourHour) {
                console.log('开始时间不早于08:00')
                setStartTime('08:00')
              } else {
                setStartTime(event.detail.value.toString())
              }
            }}
          >
            <AtList>
              <AtListItem
                title='开始时间'
                extraText={startTime ? startTime : '不早于08:00'}
              />
            </AtList>
          </Picker>
        </View>

        <Picker
          mode='time'
          value={endTime}
          onChange={event => {
            let value = event.detail.value
            let time = new Date(dateFormat(new Date(), 'YYYY-mm-dd ') + value)
            let fourHour = new Date(dateFormat(new Date(), 'YYYY-mm-dd ') + '21:30')
            if (time > fourHour) {
              console.log('结束时间不得晚于21:30')
              setEndTime('21:30')
            } else {
              setEndTime(event.detail.value.toString())
            }
          }}
        >
          <AtList>
            <AtListItem
              title='结束时间'
              extraText={endTime ? endTime : '不晚于21:30'}
            />
          </AtList>
        </Picker>

        <AtTextarea
          value={extra}
          onChange={value => setExtra(value.toString())}
          placeholder='备注(填写使用设备、桌椅摆放等)'
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
