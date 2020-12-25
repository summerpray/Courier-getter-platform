const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {orderid, condition, openId} = ctx.request.body
  try{
    const res = await mysql('orders')
    .where('orderid', orderid)
    .update({
        condition: condition,
        recopenid: openId
    })
    if(res){
      var record = res
    }else{
      var record = 0
    }
    // 执行成功返回的数据，将最后这条记录的mark字段也传回到前端
    ctx.state.data = {
      code: 0,
      Order: record,
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