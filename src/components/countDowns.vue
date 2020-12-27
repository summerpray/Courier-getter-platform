<template>
    <div class="countDown" @click="countDown" :style="{color:getCountDate.color}">{{ countDownText }}</div>
</template>

<script>
export default {
  props: {
    countDate: {}
  },
  data() {
    return {
      countDownOff: false,
      countDownText: '获取验证码',
      getCountDate: this.countDate,
      countDownFlag: true,
      phone: '123123'
    }
  },
  methods: {
    countDown() {
      if (this.countDownOff) {
        return {}
      }
      if (this.countDate.count === null) {
        this.getDateSecond(60)
      } else {
        this.getDateSecond(this.countDate.count)
      }
    },
    getDateSecond(wait) {
      let _this = this
      let _wait = wait
      if (wait === 0) {
        this.countDownOff = false
        this.countDownText = '获取验证码'
        wait = _wait
      } else {
        this.countDownOff = true
        this.countDownText = '(' + wait + 's)'
        wait--
        setTimeout(function () {
          _this.getDateSecond(wait)
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.countDown {
  cursor: pointer;
  color: rgb(27, 25, 25)
}
</style>