/* 接口配置 */

const API_BASE_URL = 'https://magicface.shop:443';

/* 接口地址： */
const URL = {
  api_start_change: API_BASE_URL + '/image/base64', 
  api_login: API_BASE_URL + '/oauth/login',
  api_share: API_BASE_URL + '/vcoin/incr',
  api_get_userinfo: API_BASE_URL + '/user/info',
  api_pay_info: API_BASE_URL + '/wxpay/v3/jsApiPay'
}

module.exports = {
  URL,
}