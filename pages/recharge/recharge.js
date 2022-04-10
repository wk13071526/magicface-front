// pages/recharge/recharge.js

const HTTP = require('../../http/httpUtils')
const API = require('../../http/apiConfig')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '10元', value: 10, checked: 'false' },
      { name: '20元', value: 20, checked: 'false' },
      { name: '30元', value: 30, checked: 'false' },
      { name: '40元', value: 40, checked: 'false' },
      { name: '50元', value: 50, checked: 'true' },
    ],
    inputText: '',
    inputValue: 50
  },
  radioChange: function (e) {
    this.setData({
      inputValue: e.detail.value,
      inputText: ''
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().globalData.userInfo.money = 10;
  },

  bindKeyInput(e) {
    if (e.detail.value.length > 0) {
      this.data.items[0].checked = false;
      this.data.items[1].checked = false;
      this.data.items[2].checked = false;
      this.data.items[3].checked = false;
      this.data.items[4].checked = false;
    }
    var that = this;
    this.setData({
      inputText: e.detail.value,
      inputValue: parseInt(e.detail.value),
      items: that.data.items
    });
  },

  confirm() {
    console.log(this.data.inputValue)
    var amount = Number(this.data.inputValue) * 100
    wx.showLoading({mask: true})
    HTTP.post(API.URL.api_pay_info, {amount: amount}).then(res => {
      wx.hideLoading();
      if (res && res.code == 200) {
        wx.requestPayment({
          nonceStr: res.nonceStr,
          package: res.package,
          paySign: res.paySign,
          timeStamp: res.timeStamp,
          signType: 'RSA',
          success: res => {
            wx.showToast({
              title: '充值成功',
              complete: function() {
                wx.navigateBack();
              }
            });
          },
          fail: e => {
            console.log(e)
            wx.showToast({
              title: '支付失败',
              icon: 'error'
            })
          }
        })
      } else {
        console.log(res)
        wx.showToast({
          title: res.msg ? res.msg : '服务器异常',
          icon: 'none'
        })
      }
    }).catch(e => {
      wx.hideLoading();
      wx.showToast({
        title: '连接服务器失败，请重试',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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