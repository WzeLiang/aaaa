const app = getApp()
import ajax from '../../../utils/request.js'
var interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['请选择身份', '家长', '老师', ],
    index: 0,
    showMessage: false,
    messageContent: '',
    phone: '',
    flag: 0,
    timer: '',
    currentTime: 61,
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  showMessage: function(text) {
    var that = this
    that.setData({
      showMessage: true,
      messageContent: text
    })
    setTimeout(function() {
      that.setData({
        showMessage: false,
        messageContent: ''
      })
    }, 3000)
  },
  listenerPickerSelected: function(e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
    console.log(this.data.index)
  },
  getVerifyCode: function(e) {
    let phone = this.data.phone
    let memberType = this.data.index
    let _this = this
    if (phone == '') {
      this.showMessage('请输入手机号码');
    } else if (memberType == 0) {
      this.showMessage('请选择身份');
    } else {
      let url = app.globalData.resetPwdgetVerifyCode
      let dt = {
        phone: phone,
        memberType: memberType
      }
      //获取验证码
      ajax(url).paramters(dt).post().then(res => {
        let code = res.respCode
        if (code == '000') {
          console.log(res)
          _this.setData({
            flag: 1
          })
          let tm = _this.data.currentTime
          interval = setInterval(function() {
            tm--
            _this.setData({
              timer: tm + '秒'
            })
            if (tm < 0) {
              clearInterval(interval)
              _this.setData({
                timer: '重新发送',
                flag: 0,
              })
            }
          }, 1000)
        } else {
          _this.showMessage(res.respMsg)
        }
      }).catch(err => {
        console.log(err)
        _this.showMessage(err.data.respMsg)
      })
    }
  },
  forgetsubmit: function(e) {
    console.log(e.detail.value);
    var formdata = e.detail.value;
    if (formdata.phone == "") {
      this.showMessage('请输入手机号码');
    } else if (formdata.memberType == 0) {
      this.showMessage('请选择身份');
    } else if (formdata.password == "") {
      this.showMessage('请输入密码');
    } else if (formdata.verifycode == '') {
      this.showMessage('请输入验证码');
    } else {
      let dt = {
        phone: formdata.phone,
        memberType: formdata.memberType,
        verifyCode: formdata.verifycode,
        npwd: formdata.password,
      }
      let _this = this
      ajax(app.globalData.resetPwd).paramters(dt).login().then(res => {
        _this.showMessage(res.respMsg)
        wx.switchTab({
          url: '../../education/home/home',
          success: function (e) {

          }
        })
      }).catch(err => {
        _this.showMessage(err.respMsg)
      })

      //调用接口
      // this.showMessage('密码重置成功');
      // setTimeout(function() {
      //   //要延时执行的代码 
      //   wx.navigateBack({

      //   })
      // }, 1500) //延迟时间 这里是1秒  
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})