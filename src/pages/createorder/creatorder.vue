<template>
  <div>
    <div class="container">
      <div class="row">
        <label class="name">创建订单</label>
      </div>
      <div class='row'>
        <div>
          <textarea 
          v-model="receiver" 
          maxlength='20' 
          placeholder='点击这里输入您的收件人信息(必填)'
          auto-height=true
          class='input'
          ></textarea>
        </div>
      </div>
      <div class='row'>
        <div>
          <textarea 
          v-model="ShelvesImformation" 
          maxlength='20' 
          placeholder='点击这里输入您的货架信息(必填)'
          auto-height=true
          class='input'
          ></textarea>
        </div>
      </div>
      <div class='row'>
        <div>
          <textarea 
          v-model="phonenumbers" 
          maxlength='20' 
          placeholder='点击这里输入您的电话(必填)'
          auto-height=true
          class='input'
          ></textarea>
        </div>
      </div>
      <div class='row'>
        <div>
          <textarea 
          v-model="destination" 
          maxlength='20' 
          auto-height=true
          placeholder='点击这里输入您的地址(必填)'
          class='input'
          ></textarea>
        </div>
      </div>
      <div class='row'>
        <div>
          <textarea 
          v-model="price"
          maxlength='20' 
          auto-height=true
          placeholder='点击这里输入您的价格(必填只需填写数字)'
          class='input'
          ></textarea>
        </div>
      </div>
      <div class='row'>
        <div>
          <textarea 
          v-model="tip" 
          maxlength='20' 
          placeholder='物品简介、重量(必填)'
          class='input'
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div>
          <label class="name">相关截图(选填)</label>
          <label class="img-count">{{imgcount}}/2</label>
        </div>
        <label v-for="(item,index) in src" :key="index">
          <img class="img" :src="item">
        </label>
        <label v-if="imgcount<2" @click="uploadPicture">
          <img class="add-img" src="../../../static/images/addimage.png">
        </label>
      </div>
    </div>
    <button @click="submmit">提交</button>
  </div>
</template>

<script>
import index from '../index/index.vue'
import {post, showModel} from '@/util'
export default {
  components: { index },
  data() {
    return {
      receiver: '',
      ShelvesImformation: '',
      destination: '',
      price: '',
      phonenumbers: '',
      tip: '',
      src: [],
      condition: '可接单',
      imgcount: 0,
      wordcount_rec: 0,
      wordcount_she: 0,
      wordcount_des: 0,
      wordcount_pri: 0,
      wordcount_pho: 0,
      wordcount_tip: 0
    }
  },
  watch: {
    receiver() {
      this.wordcount_rec = this.receiver.length
    },
    ShelvesImformation() {
      this.wordcount_she = this.ShelvesImformation.length
    },
    destination() {
      this.wordcount_des = this.destination.length
    },
    price() {
      this.wordcount_pri = this.price.length
    },
    phonenumbers() {
      this.wordcount_pho = this.phonenumbers.length
    },
    src() {
      this.imgcount = this.src.length
    },
    tip() {
      this.wordcount_tip = this.tip.length
    }
  },
  methods: {
    uploadPicture() {
      let that = this
      wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          const tempFilePaths = res.tempFilePaths
          that.src.push(tempFilePaths)
          console.log('that.src', that.src)
        }
      })
    },
    entershow(val) {
      console.log('val', val)
      if (val[0]) {
        this.submmit()
      }
    },
    showSuccess(title, content) {
      wx.showModal({
        title: title,
        content: content,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
              delta: 3
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    async submmit() {
      if (this.wordcount_rec > 0 &&
          this.wordcount_she > 0 &&
          this.wordcount_des > 0 &&
          this.wordcount_pri > 0 &&
          this.wordcount_pho > 0 &&
          this.wordcount_tip > 0) {
        try {
          const data = {
            receiver: this.receiver,
            ShelvesImformation: this.ShelvesImformation,
            destination: this.destination,
            price: this.price,
            phonenumbers: this.phonenumbers,
            tip: this.tip,
            openid: wx.getStorageSync('userinfo').openId,
            src: this.src.join(','),
            condition: this.condition,
            recopenid: null
          }
          const res = await post('/weapp/createorder', data)
          console.log('从后端返回执行正确的信息是：', res)
          this.showSuccess('提交成功', '订单已发布')
        } catch (e) {
          console.log('从后端返回执行错误的信息是：', e)
          showModel('提交失败', '服务器发生了一些不可预知的错误')
          wx.navigateBack({
            delta: 3
          })
        }
      } else {
        showModel('提交失败', '必填项不能为空哦')
      }
    }
  }
}
</script>

<style lang='scss'>
.container{
  background:#FFFFFF;
  font-size:20px;
  .text {
    height: 40px;
  }
  .row{
    border-radius: 5px;
    width:90%;
    padding: 5px 15px;
    .name {
      width:80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      border-radius:5px;
      background-color:rgba(241,241,241,.98);
      width: 355px;
      padding: 10px;
      font-size:16px; 
      padding-top:5px;
    }
    .word-count {
      float:right;
      color: #808080;
    }
    .img-count {
      float:right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width:80px;
      height:80px;
    }
    .img {
      width:66px;
      height:66px;
      margin-bottom:7px;
      margin-right: 10px;
    }
    .wechat-input{
      font-size:14px;
    }
  }
}  
button {
  text-align: center;
  bottom: 0;
  font-size: 16px;
  color: #FFFFFF;
  margin: 25px 0;
  width: 335px;
  height: 45px;
  line-height: 45px;
  background: #E0E0E0;
  border-radius: 5px;
  background-color: #1B68FD;
  left: 50%;
  transform: translateX(-50%);
}
</style>