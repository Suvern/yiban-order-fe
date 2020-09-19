import React, {Component} from "react";
import Taro from '@tarojs/taro'
import {inject, observer} from "mobx-react";
import {AtAvatar, AtBadge, AtList, AtListItem} from "taro-ui";
import {Text, View} from "@tarojs/components";
import '../../app.css'
import {logout} from "../../util/api_util";

type PageStateProps = {
  store: {
    userInfoStore: {
      userInfo: any,
      token: string,
      show: Function,
    }
  }
}

interface Home {
  props: PageStateProps
}

@inject('store')
@observer
class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {userInfoStore: {token}} = this.props.store
    if (!token) {
      Taro.navigateTo({
        url: '../../pages/login/login'
      }).then(() => {
      })
    }
  }

  render() {

    const {userInfoStore: {userInfo, token}} = this.props.store

    return (
      <View
        className='page-wrapper'
        style={{paddingTop: '4%'}}
      >

        <View
          onClick={async () => {
            if (token) {
              Taro.showModal({
                title: '注销',
                content: '是否退出登录?',
                confirmText: '确定',
                cancelText: '取消'
              }).then(res => {
                if (res.confirm) {
                  logout()
                }
              })
            } else {
              await Taro.navigateTo({
                url: '../../pages/login/login'
              })
            }
          }}
        >
          <View
            style={{
              marginLeft: '8%',
              width: '40%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: '10%'
            }}
          >
            <AtAvatar
              circle
              text={userInfo ? Array.from(userInfo['name']).reverse().join('') : ''}
            />
            <Text>{userInfo ? userInfo['name'] : '点击登录'}</Text>
          </View>
        </View>

        <View>
          <AtList>
            <AtListItem
              title='个人信息'
              arrow='right'
              onClick={async () => {
                await Taro.navigateTo({
                  url: '../../pages/profile/profile'
                });
              }}
            />
            <AtListItem
              title='我的预约'
              arrow='right'
              onClick={async () => {
                await Taro.navigateTo({
                  url: '../../pages/detail/detail'
                });
              }}
            />
            <View
              onClick={async () => {
                await Taro.navigateTo({
                  url: '../../pages/info/info'
                });
              }}
            >
              <AtBadge value='NEW'>
                <AtListItem
                  title='关于'
                  onClick={() => {
                  }}
                />
              </AtBadge>
            </View>
            {/*<AtListItem*/}
            {/*  title='管理员选项'*/}
            {/*  arrow='right'*/}
            {/*  disabled={*/}
            {/*    token*/}
            {/*      ? userInfo['admin_type'] == '普通用户'*/}
            {/*      : false*/}
            {/*  }*/}
            {/*  onClick={async () => {*/}
            {/*    await Taro.navigateTo({*/}
            {/*      url: '../../pages/admin/admin'*/}
            {/*    });*/}
            {/*  }}*/}
            {/*/>*/}
          </AtList>
        </View>
      </View>
    );
  }
}

export default Home
