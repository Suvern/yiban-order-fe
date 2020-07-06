import 'taro-ui/dist/style/index.scss'
import React, {Component} from 'react'
import {Provider} from 'mobx-react'

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
  componentDidMount() {
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
