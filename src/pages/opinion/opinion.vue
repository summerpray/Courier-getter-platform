<template>
  <div>
    <div class="container">
      <div class="row">
        <label class="name">意见与反馈</label>
      </div>
        <div class='row text'>
          <div>
            <textarea 
            v-model="opinion" 
            maxlength='100' 
            placeholder='点击这里输入您的意见' 
            class='input'
            ></textarea>
            <label class='word-count'>{{wordcount}}/100</label>
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
    <div class="row">
      <div class="name">
        微信号(选填)
      </div>
      <textarea
        v-model="wechat"
        maxlength="20"
        placeholder="如想要详细交流，在这里留下微信号"
        class="wechat-input"
      ></textarea>
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
      opinion: '',
      wordcount: 0,
      src: [],
      imgcount: 0,
      wechat: ''
    }
  },
  watch: {
    opinion() {
      this.wordcount = this.opinion.length
    },
    src() {
      this.imgcount = this.src.length
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
    async submmit() {
      if (this.wordcount > 0) {
        try {
          const data = {
            opinion: this.opinion,
            src: this.src.join(','),
            wechat: this.wechat,
            openid: wx.getStorageSync('userinfo').openId
          }
          const res = await post('/weapp/createopinion', data)
          console.log('从后端返回执行正确的信息是：', res)
          showModel('提交成功', '已经将您的反馈提交给开发者了')
        } catch (e) {
          console.log('从后端返回执行错误的信息是：', e)
          showModel('提交失败', '服务器发生了一些不可预知的错误')
        }
      } else {
        showModel('提交失败', '反馈内容不能为空')
      }
    }
  }
}
</script>

<style lang='scss'>
.container{
  background:#FFFFFF;
  font-size:15px;
  .text {
    height: 110px;
  }
  .row{
    border-bottom: 1px #E8E8E8 solid;
    padding: 5px 15px;
    .name {
      width:80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width:100%;
      height:85px;
      font-size:14px;
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
  margin:20px auto;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;
}
</style>