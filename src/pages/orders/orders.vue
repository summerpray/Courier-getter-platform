<template>
  <div>
    <div class="show">
      <div class="mark-text">历史订单</div>
        <div class="mark">{{historyorders.length}}</div>
      </div>
      <div v-if="historyorders.length === 0">
          <div class="roworder" @click="showCreate()">
            <label class="left">
              <img class="img" src="/static/images/noorder.png">
            </label>
            <label class="name">&nbsp;&nbsp;没有订单了呢！快去发布吧</label>
            <label class="right">
              >
            </label>
          </div>
      </div>
      <div v-else-if="historyorders.length > 0">
        <div v-for="(item, index, value) in historyorders" :key="index">
              <div class="row" @click="showDetail(index)">
                <label class="left">
                  <img class="img" src="/static/images/order.png">
                </label>
                <div class= "container">
                  <div class="little-content">
                    创建日期：{{historyorders[index].create_time}}
                  </div>
                  <div class="little-content">
                    物品简介：{{historyorders[index].tip}}
                  </div>
                  <div class="little-content">
                    收入：{{historyorders[index].price}}  元
                  </div>
                  <div class="little-content">
                    订单状态：{{historyorders[index].condition}}
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {get, showModel} from '@/util'
export default {
  data() {
    return {
      OrderNum: 0,
      userInfo: {},
      createtime: '',
      historyorders: [],
      condition: ''
    }
  },
  onShow() {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo.openId) {
      this.userInfo = userinfo
    }
    this.getOrder()
  },
  onPullDownRefresh () {
    this.getOrder()
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.stopPullDownRefresh()
  },
  methods: {
    showCreate() {
      wx.navigateTo({
        url: '/pages/createorder/main'
      })
    },
    async getOrder() {
      try {
        const res = await get('/weapp/getorder', {openid: this.userInfo.openId})
        console.log('从后端返回的执行正确的信息是：', res)
        this.historyorders = res.Order
        console.log('historyorders', this.historyorders)
      } catch (e) {
        showModel('失败', '页面加载失败，请下拉页面重试哦~')
        console.log('从后端返回的执行错误的信息是：', e)
      }
    },
    showDetail(index) {
      this.tmp = this.historyorders[index]
      let arr = JSON.stringify(this.tmp)
      console.log('arr', arr)
      wx.navigateTo({
        url: '/pages/detail/main',
        success: function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: arr })
        }
      })
    }
  }
}
</script>>

<style lang="scss" scoped>
div{
  margin:0;
  border:0;
  padding:0;
}
.show{
  text-align:center;
  height:266px;
  background: #EA5149;
  margin-bottom:5px;
  color: #FFFFFF;
  font-weight:bold;
  .mark-text{
    font-size: 20px;
    padding:28px;
  }
  .mark{
    font-size: 88px;
  }
}
.img-large{
  float:left;
  width: 120px;
  height: 100px;
  padding-top:30px;
  padding-left: 30px;
  .nonetext{
  padding-top: 60px;
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
.roworder{
  padding: 0px 18px;
  border-bottom: 1px #E8E8E8 solid;
  height: 55px;
  line-height: 55px;
  .img {
      float:left;
      width: 50px;
      height: 50px;
    }
    .container{
      width: 300px;
      height: auto;
      padding-left: 50px;
      font-size: 10px;
      .little-content {
        padding-top: 8px;
        color:#606060;
      }
    }
}
.row{
    padding: 0px 18px;
    border-bottom: 3px #E8E8E8 solid;
    height: 110px;
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
        padding-top: 8px;
        color:#606060;
      }
    }
}


</style>