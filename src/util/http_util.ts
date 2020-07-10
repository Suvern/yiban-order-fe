import Taro from '@tarojs/taro'

// 封装请求
const sendRequest = async (requestArgs: {
  url: string,
  method: any
  header: {} | any,
  data: {} | any
}) => {
  return Taro.request({
    url: requestArgs.url,
    method: requestArgs.method,
    header: requestArgs.header ? requestArgs.header : '',
    data: requestArgs.data ? requestArgs.data : ''
  })
}

// 发送并处理请求
export const commitRequest = async (requestArgs: any) => {
  try {
    let result = await sendRequest(requestArgs)
    let res = result.data

    let code: number = res['code']
    let msg: string = res['msg']
    let data: any = res['data']

    if (msg === 'token失效') {
      msg = msg + ',请退出重新登录'
    } else if (msg === 'token缺失') {
      msg = msg + ',请登录'
    }

    return {
      flag: code === 0,
      message: msg,
      data: data
    }
  } catch (e) {
    return {
      flag: false,
      message: e.toString(),
      data: null
    }
  }
}
