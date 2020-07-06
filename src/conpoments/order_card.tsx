import {Text, View} from "@tarojs/components";
import React from "react";
import {AtCard, AtIcon} from "taro-ui";

const OrderCard = (props: {
  orderData: {}
}) => {

  const renderStateIcon = (state: string) => {
    let iconSize = 25
    if (state === '审核通过') {
      return (
        <AtIcon
          value='check'
          size={iconSize}
          color='#3CB371'
        />
      )
    } else if (state === '审核中') {
      return (
        <AtIcon
          value='clock'
          size={iconSize}
          color='#FF00FF'
        />
      )
    } else if (state === '已拒绝') {
      return (
        <AtIcon
          value='close'
          size={iconSize}
          color='#DC143C'
        />
      )
    }
  }

  return (
    <View>
      {
        props.orderData
          ?
          <AtCard
            title={`${props.orderData['unit']}`}
            extra={`${props.orderData['date']}`}
            note={`申请人: ${props.orderData['person']['name']}`}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '20%'
              }}
            >
              <Text>{`主题:${props.orderData['content']}`}</Text>
              <Text>{`时间段:  ${props.orderData['time']}`}</Text>
              <Text>{`时长:${props.orderData['last_time']}`}</Text>
              <Text>{`备注:${props.orderData['extra']}`}</Text>

              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View><Text>{`状态: ${props.orderData['state']}`}</Text></View>
                {renderStateIcon(props.orderData['state'])}
              </View>

              {
                props.orderData['state'] === '已拒绝'
                  ?
                  <Text>{`拒绝理由: ${props.orderData['reason']}`}</Text>
                  :
                  <View/>
              }
            </View>
          </AtCard>
          :
          <View/>
      }
    </View>
  )
}

export default OrderCard
