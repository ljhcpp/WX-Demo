//logs.js
const util = require('../../utils/util.js')


Page({
  formSubmit(e) {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
      mask:true,
      
     })

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  }
})
