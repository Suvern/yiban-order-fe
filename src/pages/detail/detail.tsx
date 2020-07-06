import {View} from "@tarojs/components";
import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {AtButton, AtTabs, AtTabsPane} from "taro-ui";
import {getOrder} from "../../util/api_util";
import OrderList from "../../conpoments/order_list";

type PageStateProps = {
  store: {
    userInfoStore: {
      userInfo: any,
      token: string,
      show: Function,
    },
    orderStore: {
      order: [],
      setOrder: (order: any) => {},
      getOrderList: () => {},
      getOrderAgreedList: () => {},
      getOrderNotAgreedList: () => {}
    }
  }
}

interface Detail {
  props: PageStateProps
}

@inject('store')
@observer
class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    }
  }

  onRefresh = async () => {
    const {orderStore} = this.props.store

    let result = await getOrder({phone: '', name: ''})
    let data = result.data
    orderStore.setOrder(data)
  }

  render() {

    const {orderStore} = this.props.store
    const tabList = [{title: '已通过'}, {title: '未通过'}]

    return (
      <View>
        <AtButton
          type='primary'
          size='small'
          onClick={this.onRefresh}
        >
          刷新
        </AtButton>
        <AtTabs
          current={this.state['currentTab']}
          tabList={tabList}
          onClick={value => {
            this.setState({currentTab: value})
          }}
        >
          <AtTabsPane
            current={this.state['currentTab']}
            index={0}
          >
            {orderStore.order.length === 0
              ?
              '没有数据' :
              <OrderList
                orderList={orderStore.getOrderAgreedList() as []}
              />
            }
          </AtTabsPane>
          <AtTabsPane
            current={this.state['currentTab']}
            index={1}
          >
            {orderStore.order.length === 0
              ?
              '没有数据' :
              <OrderList
                orderList={orderStore.getOrderNotAgreedList() as []}
              />
            }
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }

}

export default Detail
