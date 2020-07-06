import {View} from "@tarojs/components";
import React from "react";
import {AtList} from "taro-ui";
import OrderCard from "./order_card";

const OrderList = (props: {
  orderList: []
}) => {
  return (
    <View>
      {
        props.orderList
          ?
          <View
            style={{marginTop: '5%'}}
          >
            <AtList>
              {props.orderList.map(
                e => {
                  let itemKey = e['id']
                  return (
                    <View
                      key={itemKey}
                      style={{
                        marginBottom: '10%'
                      }}
                    >
                      <OrderCard orderData={e}/>
                    </View>
                  )
                }
              )}
            </AtList>
          </View>
          :
          <View/>
      }
    </View>
  )
}

export default OrderList
