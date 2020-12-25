<template>
    <div class="modal-mask">
      <div class="modal-dialog">
        <div class="modal-content">
          <img class="img" src="../../static/images/1.png">
          <div class="content-text">
            <p class="key-bold">本平台还处于开发阶段。</p>
            <p class="little-tip">业务范围：</p>
            <p class="little-content">
              1、以平台为媒介的线下生活服务，旨在在方便的时候帮助他人拿取物品。
            </p>
            <p class="little-content">
              2、服务范围为机器人学院，订单为悬赏制并且平台抽取10%的服务费。
            </p>
            <p class="little-content">
              3、交易需满足中华人民共和国法律
            </p>
            <p class="little-content">
              4、最终解释权属于summerpray和FaultyChow所有。
            </p>
          </div>
        </div>
        <div class="modal-footer">
         <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">授权登录</button>
        </div>
      </div>  
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
export default {
  methods: {
    loginSuccess(res) {
      wx.setStorageSync('userinfo', res)
    },
    login() {
      wx.showToast({
        title: '登录中',
        icon: 'loading'
      })
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: res => {
          wx.showTabBar()
          console.log('登录成功', res)
          this.loginSuccess(res)
          this.$emit('changeShow', false, res)
        },
        fail: err => {
          console.error('登录失败', err)
        }
      })
    }
  }
}
</script>


<style lang='scss'>
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(158, 103, 103);
  opacity: 0.8;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 560rpx;
  overflow: hidden;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -150rpx 95rpx;
  border-radius: 16rpx;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding: 0rpx 53rpx 50rpx 53rpx;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-tip {
  text-align: center;
  font-size: 36rpx;
  color: #333333;
}
.content-text {
  height:130px;
  padding:10px 0px 50px 0px;
  font-size:14px;
  overflow: auto;
}
.modal-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight:bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background:#feb600;
}
button {
  width: 100%;
  background:#feb600;
  color:#FFFFFF;
  font-weight:bold;
}
.img {
  width: 280px;
  height:140px;
}
.little-tip {
  padding-top:15px;
  padding-bottom:3px;
  font-size: 14px;
  font-weight:bold;
  color: #feb600;
}
.little-content {
  padding-top:5px;
  font-size: 13px;
  color:#606060;
}
.key-bold {
  padding-top:5px;
  font-size: 20px;
  font-weight:bold;
  color: #333333;
}
</style>