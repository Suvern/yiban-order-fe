export default {
  pages: [
    'pages/info/info',
    'pages/home/home',
    'pages/order/order',
    'pages/profile/profile',
    'pages/detail/detail',

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
    color: '#B1B2B1',
    selectedColor: '#4F7AE1',
    backgroundColor: '#F5F5F9',
    list: [
      {
        pagePath: 'pages/home/home',
        text: '主页',
        iconPath: 'images/home.png',
        selectedIconPath: 'images/home_selected.png',
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
