<template>
  <div>
    <div v-if="showLogin">
      <LoginWindow @changeShow="getModel(arguments)"></LoginWindow>
    </div>
    <div>
      <div class="roworder" @click='createOrder'>
        <label class="left">
          <img class="imgorder" src="/static/images/创建订单.png">
        </label>
        <label class="name">&nbsp;&nbsp;
          创建订单
        </label>
        <label class="right">
          >
        </label>
      </div>
    </div>
        <div v-for="(item, index, value) in order" :key="index">
            <div class="row" @click='showChange(index)'>
                <label class="left">
                  <img class="img" src="/static/images/order.png">
                </label>
                <div class= "container">
                  <div class="little-content">
                    目的地：{{order[index].destination}}
                  </div>
                  <div class="little-content">
                    物品简介：{{order[index].tip}}
                  </div>
                  <div class="little-content">
                    悬赏：{{order[index].price}}  元
                  </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import LoginWindow from '@/components/LoginWindow'
import {get, post, showModel} from '@/util'
import {formatTime} from '../../utils/index'
import countDown from '@/components/countDowns'
export default {
  components: {
    LoginWindow,
    countDown
  },
  data() {
    return {
      userInfo: {},
      argument: {},
      showLogin: false,
      condition: '可接单',
      indexid: 0,
      order: []
    }
  },
  onShow() {
    const userinfo = wx.getStorageSync('userinfo')
    this.getOKOrder()
    this.order.create_time = formatTime(new Date(this.order.create_time))
    if (userinfo.openId) {
      this.userInfo = userinfo
    } else {
      wx.hideTabBar()
      this.showLogin = true
    }
  },
  onPullDownRefresh () {
    this.getOKOrder()
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.stopPullDownRefresh()
  },
  onShareAppMessage(e) {
    return {
      title: '机器人代取平台',
      path: '/pages/index/main',
      imageUrl: '/static/images/2.jpg',
      countDowns: {
        cout: '100',
        color: 'white'
      }
    }
  },
  methods: {
    async getOKOrder() {
      try {
        const res = await get('/weapp/getOKorder', {condition: this.condition})
        console.log('从后端返回的执行正确的信息是：', res)
        this.order = res.Order
      } catch (e) {
        showModel('失败', '页面加载失败，请下拉页面重试哦~')
        console.log('从后端返回的执行错误的信息是：', e)
      }
    },
    async updateorder() {
      try {
        console.log('orderid', this.order[this.indexid].orderid)
        const res = await post('/weapp/updatacondition', {condition: '进行中', orderid: this.order[this.indexid].orderid, openId: this.userInfo.openId})
        console.log('从后端返回的执行正确的信息是：', res)
        this.order = res
        console.log('order', this.order)
      } catch (e) {
        showModel('失败', '页面加载失败，请下拉页面重试哦~')
        console.log('从后端返回的执行错误的信息是：', e)
      }
    },
    getModel(val) {
      this.showLogin = val[0]
      this.userInfo = val[1]
      console.log('this.showLogin', this.showLogin)
    },
    showChange: function(index) {
      var that = this
      this.order[index].condition = '进行中'
      this.tmp = this.order[index]
      let arr = this.tmp
      console.log('arr', arr)
      wx.showModal({
        title: '提示',
        content: '请确认是否接取订单',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.updateorder()
            wx.navigateTo({
              url: '/pages/detail/main',
              success: function(res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: arr })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    createOrder() {
      wx.navigateTo({
        url: '/pages/createorder/main',
        events: {
          acceptDataFromOpenedPage: function(data) {
            console.log(data)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.roworder{
    padding: 0px 18px;
    border-bottom: 1px #E8E8E8 solid;
    height: 55px;
    line-height: 55px;
    .imgorder {
      float:left;
      width: 20px;
      height: 20px;
      padding-top:16px;
    }
    .name {
      float:left;
    }
  }
  .row{
    padding: 0px 18px;
    border-bottom: 3px #E8E8E8 solid;
    height: 90px;
    .img {
      float:left;
      width: 50px;
      height: 50px;
      padding-top:30px;
    }
    .container{
      width: 300px;
      height: auto;
      padding-left: 50px;
      font-size: 10px;
      .little-content {
        padding-top: 10px;
        color:#606060;
      }
    }
  }
  .right {
    float: right;
    color: #C8C8C8;
    line-height:55px;
  }
  .container{
    width: 300px;
    height: auto;
    padding-left: 50px;
    font-size: 9px;
    .little-content {
      padding-top: 10px;
      padding-left: 30px;
      color:#606060;
    }
  }
</style>