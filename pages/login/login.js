// pages/login/login.js
const HTTP = require('../../http/httpUtils')
const API = require('../../http/apiConfig')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showToast({
      title: '请登录后使用',
      icon: 'none'
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    var that = this;
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (info) => {
        console.log(info)
        that.startLogin(info);
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.startLogin(e.detail);
  },

  startLogin(info) {
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code);
          console.log(API.URL.api_login);
          HTTP.post(API.URL.api_login, {
            nickName: info.userInfo.nickName,
            avatarUrl: info.userInfo.avatarUrl,
            code: res.code
          }).then(res => {
            console.log(res);
            if (res.code == 200) {
              var info = {
                userId: res.data.userId,
                token: res.data.token,
              };
              console.log(info);
              wx.setStorageSync('login_key', info)
              getApp().globalData.userInfo = info
              HTTP.resetHttpHeader({ token: res.data.token })
              wx.navigateBack();
            } else {
              wx.showToast({
                title: '登录失败，请重试',
                icon: 'none'
              })
            }
          }).catch(e => {
            console.log(e);
            wx.showToast({
              title: e.errMsg ? e.errMsg : '登录失败，请重试',
              icon: 'none'
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg);
          wx.showToast({
            title: '登录失败!',
          })
        }
      },
      fail: (err) => {
        console.log(err);
        wx.showToast({
          title: '连接服务器失败，请重试',
          icon: 'none'
        })
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: "一个好玩的小程序",
      path: "/pages/index/index",
    };
  },
})