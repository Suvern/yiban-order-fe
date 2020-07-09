import {Text, View} from "@tarojs/components";
import React, {useState} from "react";
import '../../app.css'
import {AtSteps} from "taro-ui";

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
      'desc': '审核结果可通过\"我的申请\"查询'
    }
  ]

  return (
    <View
      className='page-wrapper'
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8%',
          marginBottom: '8%'
        }}
      >
        <Text>易班大厅预约流程</Text>
      </View>
      <AtSteps
        items={stepItems}
        current={step}
        onChange={value => setStep(value)}
      />
    </View>
  )
}

export default Info
