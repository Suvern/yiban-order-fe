import React, {Component} from 'react'
import {View} from '@tarojs/components'
import {AtList, AtListItem} from "taro-ui";
import {inject, observer} from "mobx-react";
import '../../app.css'

type PageStateProps = {
  store: {
    userInfoStore: {
      userInfo: any,
      token: string,
      show: Function,
    }
  }
}

interface Profile {
  props: PageStateProps
}

@inject('store')
@observer
class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {userInfoStore: {userInfo, token}} = this.props.store

    return (
      <View
        className='page-wrapper'
      >
        <AtList>
          <AtListItem
            title='账号'
            extraText={token ? userInfo['username'] : ''}
          />
          <AtListItem
            title='姓名'
            extraText={token ? userInfo['name'] : ''}
          />
          <AtListItem
            title='性别'
            extraText={token ? userInfo['gender'] : ''}
          />
          <AtListItem
            title='工作单位'
            extraText={token ? userInfo['unit'] : ''}
          />
          <AtListItem
            title='职务'
            extraText={token ? userInfo['position'] : ''}
          />
          <AtListItem
            title='手机号'
            extraText={token ? userInfo['phone'] : ''}
          />
          <AtListItem
            title='QQ号'
            extraText={token ? userInfo['qq'] : ''}
          />
          <AtListItem
            title='管理员单位'
            extraText={token ? userInfo['admin_type'] : ''}
          />
        </AtList>
      </View>
    )
  }
}

export default Profile
