const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
    const {destination, ShelvesImformation, price, phonenumbers, tip, receiver, openid, src, condition, recopenid} = ctx.request.body
    
    console.log('destination',destination)
    console.log('ShelvesImformation',ShelvesImformation)
    console.log('price',price)
    console.log('phonenumbers',phonenumbers)
    console.log('tip',tip)
    console.log('receiver',receiver)
    console.log('openid',openid)
    console.log('src',src)

    try{
      await mysql('orders').insert({
        destination, ShelvesImformation, price, tip, receiver, openid, src, phonenumbers, condition, recopenid
      })
      ctx.state.data = {
        code: 0,
        msg: 'success'
      }
      console.log('执行成功')
    } catch(e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '添加失败' + e.sqlMessage
        }
      }
      console.log('执行错误')
    }
}