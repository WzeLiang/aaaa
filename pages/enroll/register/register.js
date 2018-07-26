// pages/enroll/register/register.js
const app = getApp()
import ajax from '../../../utils/request';
import WxNotificationCenter from '../../../utils/wxnotification';
var interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getverifyCodeurl: app.globalData.testurl + app.globalData.getVerifyCode,
    registerurl: app.globalData.testurl + app.globalData.register,
    array: ['请选择身份', '家长', '老师', ],
    phone: "",
    memberType: 0,
    studentNumber: "",
    name: "",
    teacherNumber: "",
    verifyCode: "",
    password: "",
    showMessage: false,
    messageContent: '',
    timer: '',
    currentTime: 61,
    flag: 0,
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
      memberType: e.detail.value
    });
    console.log(this.data.memberType)
  },
  getphoneValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getverifyCode: function(e) {
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      this.showMessage('手机号码不能为空');
      return false;
    } else if (!myreg.test(this.data.phone)) {
      this.showMessage('请输入正确的手机号');
      return false;
    } else if (this.data.memberType == 0) {
      this.showMessage('请选择身份');
      return false;
    } else {
      console.log(this.data.memberType)
      wx.request({
        url: this.data.getverifyCodeurl,
        method: "POST",
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          data: {
            "phone": this.data.phone,
            "memberType": this.data.memberType
          }
        },
        success: function(res) {
          let code = res.data.respCode
          if (code != '000') {
            _this.showMessage(res.data.respMsg)
            if (code == '410') {
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            }
          } else {
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
                  flag: 0
                })
              }
            }, 1000)
          }
        }
      })
    }
  },
  registersubmit: function(e) {
    let _this = this
    let formdata = e.detail.value;
    if (formdata.memberType == 0) {
      this.showMessage('请选择身份');
    } else if (formdata.memberType == 2) {
      if (formdata.phone == '') {
        this.showMessage('请输入正确的手机号');
      } else if (formdata.name == '') {
        this.showMessage('请输入姓名');
      } else if (formdata.teacherNumber == '') {
        this.showMessage('请输入教师编号');
      } else if (formdata.verifyCode == '') {
        this.showMessage('请输入验证码');
      } else if (formdata.password == "") {
        this.showMessage('请输入密码');
      } else {
        wx.request({
          url: this.data.registerurl,
          method: "POST",
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            data: {
              "phone": formdata.phone,
              "memberType": formdata.memberType,
              "verifyCode": formdata.verifyCode,
              "name": formdata.name,
              "teacherNumber": formdata.teacherNumber,
              "password": formdata.password
            },

          },
          success: function(res) {
            if (res.data.respCode == "000") {
              _this.showMessage(res.data.respMsg);
              let tokens = res.data.data.userToken;
              let memberType = res.data.data.memberType;
              let flag = res.data.data.flag;//是否要切换身份标记
              console.log(tokens)
              // wx.setStorageSync('userInfo', data);
              wx.setStorageSync('userToken', tokens);
              wx.setStorageSync('memberType', memberType);
              wx.setStorageSync('flag', flag);
              wx.switchTab({
                url: '../../education/home/home',
                success: function(e) {

                }
              })
              WxNotificationCenter.postNotificationName('LOGINGSUCCESS')

              // setTimeout(function() {
              //   //要延时执行的代码 
              //   wx.navigateBack({

              //   })
              // }, 1500) //延迟时间 这里是1秒  
            } else {
              _this.showMessage(res.data.respMsg)
            }
          }


        })
      }
    } else {
      if (formdata.tel == '') {
        this.showMessage('请输入正确的手机号');
      } else if (formdata.verifyCode == '') {
        this.showMessage('请输入验证码');
      } else if (formdata.password == "") {
        this.showMessage('请输入密码');
      } else {
        wx.request({
          url: this.data.registerurl,
          method: "POST",
          data: {
            data: {
              "phone": formdata.phone,
              "memberType": formdata.memberType,
              "verifyCode": formdata.verifyCode,
              "password": formdata.password
            },

          },
          success: function(res) {
            if (res.data.respCode == "000") {
              _this.showMessage(res.data.respMsg);
              let tokens = res.data.data.userToken;
              let memberType = res.data.data.memberType;
              let flag = res.data.data.flag;//是否要切换身份标记
              console.log(tokens)
              // wx.setStorageSync('userInfo', data);
              wx.setStorageSync('userToken', tokens);
              wx.setStorageSync('memberType', memberType);
              wx.setStorageSync('flag', flag);
              wx.switchTab({
                url: '../../education/home/home',
                success: function(e) {
                  // var page = _this.getCurrentPages()
                  // page.onLoad()
                }
              })
              WxNotificationCenter.postNotificationName('LOGINGSUCCESS')

              // setTimeout(function() {
              //   //要延时执行的代码 
              //   wx.navigateBack({

              //   })
              // }, 1500) //延迟时间 这里是1秒  
            } else {
              _this.showMessage(res.data.respMsg)
            }
          }


        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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