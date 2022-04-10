/* 网络请求工具类 */

const isProduct = __wxConfig.envVersion == 'release';
const isDevelop = __wxConfig.envVersion == 'develop';

const httpConfig = {
  httpHeader: {
    "Content-Type": "application/json"
  }
}

/* 请求头 */
function getHeader() {
  return httpConfig.httpHeader
}

function resetHttpHeader(header) {
  httpConfig.httpHeader = header;
}

//处理发送的数据，对数据加密
function handleSendData(params,url) {
  if (isDevelop) {
    console.log("===== httpUtils 请求参数 =====");
    console.log("===== httpUtils 请求URL: " + url);
    console.log(params);
  }
  return params;
}

//处理返回数据，对数据解密
function handleReturnData(res) {
  if (isDevelop) {
    console.log("===== httpUtils 返回数据 =====", res);
  }
  if (res.code == '10001') {
    wx.setStorageSync('login_key', null);
    getApp().globalData.userInfo = null;
    httpConfig.httpHeader = null;
    wx.redirectTo({
      url: '../login/login',
    })
  }
  return res;
}

/* 进行请求 */
const request = (url, method, params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: handleSendData(params,url),
      header: getHeader(),
      success(res) {
        resolve(handleReturnData(res.data))
      },
      fail(error) {
        reject(error)
      },
      complete() {
      }
    })
  });
}

/* get请求 */
function get(url, params) {
  return request(url, "GET", params);
}

/* post请求 */
function post(url, params) {
  return request(url, "POST", params);
}

/* 文件上传 */
const uploadFile = (url, filePath, params) => {
  // console.log("-----文件上传------");
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      name: 'file',
      filePath: filePath,
      formData: handleSendData(params,url),
      header: getHeader(),
      success(res) {
        resolve(handleReturnData(JSON.parse(res.data)))
      },
      fail(error) {
        reject(error)
      },
      complete: info => {
        
      }
    })
  })
}

/* 图片加载 */
const loadImage = (url, params) => {
  // console.log("-----图片下载------");
  // let auth = '_auth=' + getToken()
  // if (url.indexOf("?") > 0) {
  //   url = url + "&" + auth
  // } else {
  //   url = url + "?" + auth
  // }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      data: params,
      header: getHeader(),
      responseType: 'arraybuffer',
      success(res) {
        if (res.statusCode == 200 && res.data.byteLength) {
          let base64 = wx.arrayBufferToBase64(res.data);
          let img = 'data:image/jpeg;base64,' + base64
          resolve(img)
        } else {
          resolve(null)
        }
      },
      fail(error) {
        reject(error)
      },
      complete: info => {}
    })
  })
}

/* 通过module.exports方式提供给外部调用 */
module.exports = {
  httpConfig,
  request,
  uploadFile,
  loadImage,
  get: get,
  post: post,
  resetHttpHeader: resetHttpHeader,
}

/* 
使用方法 ：

1.在要使用的js文件导入
const HTTP = require('../../../../http/httpUtils.js');

2. 调用
HTTP.post('url', params).then(res => {
}).catch(error=>{
});

 */