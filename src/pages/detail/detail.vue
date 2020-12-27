<template>
  <div>
    <p class="content">详情</p>
    <div class="container" >
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/people.png">
        </label>
        <label class="name">&nbsp;&nbsp;收件人:{{order.receiver}}</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/shinshop.png">
        </label>
        <label class="name">&nbsp;&nbsp;货架信息:{{order.ShelvesImformation}}</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/phone.png">
        </label>
        <label class="name">&nbsp;&nbsp;电话号码:{{order.phonenumbers}}</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/address.png">
        </label>
        <label class="name">&nbsp;&nbsp;地址:{{order.destination}}</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/price.png">
        </label>
        <label class="name">&nbsp;&nbsp;甲方出价:{{order.price}} 元</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/tips.png">
        </label>
        <label class="name">&nbsp;&nbsp;物品备注:{{order.tip}}</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/tips.png">
        </label>
        <label class="name">&nbsp;&nbsp;订单创建时间:{{createtime}}</label>
        <label class="right">
          >
        </label>
      </div>
      <div class="row">
        <label class="left">
          <img class="img" src="/static/images/tips.png">
        </label>
        <label class="name">&nbsp;&nbsp;订单状态:{{order.condition}}</label>
        <label class="right">
          >
        </label>
      </div>
      <div v-if="order.condition ==='进行中'">
        <button @click="showChange()">已完成</button>
        <button @click="showCancel()">取消订单</button>
      </div>
      <div v-else-if="order.condition ==='已完成'">
        <label class="row">此订单已完成</label>
      </div>
      <div v-else-if="order.condition ==='可接单'">
        <label class="row">暂时还没人接单呢</label>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import {post, showModel} from '@/util'
import {formatTime} from '../../utils/index'
export default {
  onShow: function(option) {
    const eventChannel = this.$mp.page.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      const orderdetail = JSON.parse(data.data)
      wx.setStorageSync('order', orderdetail)
      wx.setStorageSync('createtime', formatTime(new Date(orderdetail.create_time)))
    })
    this.order = wx.getStorageSync('order')
    this.createtime = wx.getStorageSync('createtime')
  },
  onPullDownRefresh () {
    this.order = wx.getStorageSync('order')
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.stopPullDownRefresh()
  },
  methods: {
    showChange() {
      var that = this
      wx.showModal({
        title: '提示',
        content: '请确认是否完成订单',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.updateorderchange('已完成')
            wx.navigateTo({
              url: '/pages/detail/main'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    showCancel() {
      var that = this
      wx.showModal({
        title: '提示',
        content: '请确认是否取消订单',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.updateorderchange('可接单')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    async updateorderchange(condition) {
      try {
        console.log('orderid', wx.getStorageSync('order').orderid)
        const res = await post('/weapp/updateordersuc', {condition: condition, orderid: wx.getStorageSync('order').orderid, openId: wx.getStorageSync('order').recopenid})
        console.log('从后端返回的执行正确的信息是：', res)
        wx.removeStorageSync('order')
        wx.removeStorageSync('createtime')
        wx.navigateBack({
          delta: 3
        })
      } catch (e) {
        showModel('失败', '页面加载失败，请下拉页面重试哦~')
        console.log('从后端返回的执行错误的信息是：', e)
      }
    }
  },
  data() {
    return {
      createtime: '',
      order: {},
      receiver: {},
      src: '../../static/images/littleTip-huang.jpg'
    }
  }
}
</script>

<style lang='scss'>
  .title {
    background: #ea5149;
    font-size: 16px;
    .img {
      width: 100%;
      height: 120px;
    }
    .content-title {
      color: #ffffff;
      padding: 4px 20px 10px 20px;
    }
  }
  .content {
    padding: 10px 30px;
    font-size: 30px;
    font-weight: bold;
    background-color: #ea5149;
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
button {
  margin:20px auto;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;
}
</style>