// app.js
const HTTP = require('http/httpUtils')
const login_key = "login_key";

App({
  onLaunch() {
    const loginData = wx.getStorageSync(login_key);

    if (loginData) {
      console.log('已登录');
      console.log(loginData);
      HTTP.resetHttpHeader({ token: loginData.token })
      this.globalData.userInfo = loginData;
      
    } else {
      console.log('未登录');
      // //未登录，跳转登录界面
      // wx.navigateTo({
      //   url: 'pages/login/login',
      // })
    }
  },
  globalData: {
    userInfo: null
  }
})
