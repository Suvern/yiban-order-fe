import 'taro-ui/dist/style/index.scss'
import React, {Component} from 'react'
import {Provider} from 'mobx-react'
import Raven from '@mqing/sentry-taro-weapp/src/raven'

import counterStore from './store/counter'
import userInfoStore from "./store/user_info";
import orderStore from "./store/order";
import './app.css'

const store = {
  counterStore,
  userInfoStore,
  orderStore,
}

class App extends Component {

  componentWillMount() {
    // 初始化Sentry
    // Raven.config(
    //   'https://f91e9c072ec349e19156131520e0303f@o472603.ingest.sentry.io/5506453',
    //   {
    //     release: '0.0.1',
    //     environment: 'production',
    //     allowDuplicates: true,
    //     sampleRate: 0.5
    //   }
    // ).install()

    console.log('raven', Raven.config)
    // 读缓存
    userInfoStore.readAll()
  }

  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
