// index.js
// 获取应用实例
const app = getApp()
const HTTP = require('../../http/httpUtils')

Page({
  data: {
    title: '照片趣味转换',
    dataArray: [
      {
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        color: '#38BC9D',
        value: '人脸卡通化',
        show: true
      },
      {
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        color: '#72d333',
        value: '人脸动漫化',
        show: true
      },
      {
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        color: '#2067b8',
        value: '人脸换装',
        show: false
      },
      {
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        color: '#e0e246',
        value: '人脸表情迁移',
        show: false
      },
      {
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        color: '#e28446',
        value: '性别切换',
        show: false
      },
      {
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        color: '#d594e6',
        value: '人脸融合',
        show: false
      }
    ]
  },
  onLoad() {
    if (getApp().globalData.userInfo == null) {
      //未登录，跳转登录界面
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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

  onClickItem(e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    console.log(item.value);
    wx.navigateTo({
      url: '../detail/detail?title=' + item.value + '&type=' + index,
    })
  }
})
