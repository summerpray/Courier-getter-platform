const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
    const {openid, opinion, src, wechat} = ctx.request.body
    
    try{
      await mysql('opinions').insert({
        openid, opinion, src, wechat
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