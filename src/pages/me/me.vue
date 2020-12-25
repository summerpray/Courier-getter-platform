<template>
    <div>
      <div class="top">
        <div class="userinfo">
          <img :src="userinfo.avatarUrl" alt="">
        </div>
        <div class="name">
          <label>{{userinfo.nickName}}</label>
        </div>
      </div>
      <div class="container">
          <div class="row">
            <label class="left">
              <img class="img" src="/static/images/book.png">
            </label>
            <label class="name">&nbsp;&nbsp;帮助</label>
            <label class="right">
              >
            </label>
          </div>
          <div class="row">
            <label class="left">
              <img class="img" src="/static/images/money.png">
            </label>
            <label class="name">&nbsp;&nbsp;我的钱包</label>
            <label class="right">
              >
            </label>
          </div>
        </div>

        <div class="container">
          <div class="row" @click="showdelete">
            <label class="left">
              <img class="img" src="/static/images/delete.png">
            </label>
            <label class="name">&nbsp;&nbsp;清空记录</label>
            <label class="right">
              >
            </label>
          </div>
          <div class="row" @click='showOpinion'>
            <label class="left">
              <img class="img" src="/static/images/approval.png">
            </label>
            <label class="name">&nbsp;&nbsp;与我联系</label>
            <label class="right">
              >
            </label>
          </div>
      </div>
    </div>
</template>

<script>
import {post, showModel} from '@/util'
export default {
  data() {
    return {
      userinfo: {}
    }
  },
  onShow () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo.openId) {
      this.userinfo = userinfo
    }
  },
  methods: {
    showOpinion() {
      wx.navigateTo({
        url: '/pages/opinion/main'
      })
    },
    showdelete() {
      var that = this
      wx.showModal({
        title: '警告',
        content: '确定要清除所有订单缓存？将无法复原',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.deleteall()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    async deleteall() {
      try {
        console.log('openid', wx.getStorageSync('openid').orderid)
        await post('/weapp/deleteall', {openId: wx.getStorageSync('userinfo').openId})
      } catch (e) {
        showModel('失败', '页面加载失败，请下拉页面重试哦~')
        console.log('从后端返回的执行错误的信息是：', e)
      }
    }
  }
}
</script>

<style lang='scss'>
  .top{
    height: 80px;
    width: 100%;
    background:#EA5149;
    padding-top: 30px;
    display: block;
    .userinfo{
      padding-bottom: 5px;
      float: left;
    img{
      width: 120rpx;
      height:120rpx;
      margin: 10rpx;
      border-radius: 50%;
      border: 1px #D0D0D0 solid;
    }
  }
  .name{
    padding-top: 30px;
    padding-left: 5px;
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    .notice{
      color: #D8D8D8;
      font-size: 12px;
      .number{
        font-size: 15px;
        color: #FFFFFF;
        font-weight: bold;
      }
    }
    .a-line{
      background:#EA5149;
      border: none;
      display: inline;
      font-size: 16px;
      color: #FFFFFF;
      text-decoration:underline;
    }
  }
}
.container{
  margin-top: 10px;
  background:#FFFFFF;
  font-size:15px;
  .row{
    padding: 0px 18px;
    border-bottom: 1px #E8E8E8 solid;
    height: 55px;
    line-height: 55px;
    .img {
      float:left;
      width: 20px;
      height: 20px;
      padding-top:16px;
    }
    .name {
      float:left;
    }
  }
  .right {
    float: right;
    color: #C8C8C8;
    line-height:55px;
  }
  .left {
    width:80%;
  }
}
</style>