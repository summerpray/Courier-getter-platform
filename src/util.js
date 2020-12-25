import config from './config'

export default function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}

export function showModel (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showChange() {
  wx.showModal({
    title: '提示',
    content: '请确认是否发布订单',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        this.$emit('enter', true)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

function request(url, method, data) {
  return new Promise(
    (resolve, reject) => {
      wx.request({
        url: config.host + url,
        method: method,
        data: data,
        success: function(res) {
          console.log('请求成功，在前端打印的信息', res)
          if (res.data.code === 0) {
            resolve(res.data.data)
          } else {
            reject(res.data)
          }
        }
      })
    }
  )
}

export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}
