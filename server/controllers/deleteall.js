const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openId} = ctx.request.body
  try{
    const res = await mysql('orders')
      .where("openid" , openId)
      .del()
    // 执行成功返回的数据，将最后这条记录的mark字段也传回到前端
    ctx.state.data = {
      code: 0,
      msg: 'success'
    }
    console.log("执行成功")
  }catch(e){
    console.log("执行错误:",e)
    // 执行失败返回的数据
    ctx.state = {
      code: -1,
      data: {
        msg: '获取失败' + e.sqlMessage
      }
    }
  }
}