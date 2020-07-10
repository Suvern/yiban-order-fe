export default {
  pages: [
    // 'pages/index/index',
    'pages/home/home',
    'pages/order/order',
    'pages/profile/profile',
    'pages/detail/detail',
    'pages/info/info',

    'pages/register/register',
    'pages/login/login',

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/home',
        text: '主页',
        iconPath: 'images/home.png',
        selectedIconPath: 'images/home_selected.png'
      },
      {
        pagePath: 'pages/order/order',
        text: '预约',
        iconPath: 'images/order.png',
        selectedIconPath: 'images/order_selected.png'
      },
    ]
  }
}
