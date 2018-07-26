// pages/enroll/login/login.js
const app = getApp()
import WxValidate from '../../../utils/validate.js';
import { sha1 } from '../../../utils/util';
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import WxNotificationCenter from '../../../utils/wxnotification';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    loginURL: app.globalData.login,
    showMessage: false,
    messageContent: '',
    fontSize:'35rpx',
    array: ['请选择身份','家长', '老师'],
    index: 0,
  }, 
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
    console.log(this.data.index)
  },
  showMessage: function (text) {
    var that = this
    that.setData({
      showMessage: true,
      messageContent: text
    })
    setTimeout(function () {
      that.setData({
        showMessage: false,
        messageContent: ''
      })
    }, 3000)
  },phoneChange:function(e){

  },
  loginsubmit:function(e){
    var that=this
    // console.log(e.detail.value);
    var formdata = e.detail.value;
    var memberType = this.data.index
    var form={
      phone: formdata.phone,
      password: formdata.password,
      memberType : memberType,
    };
    if (formdata.phone==''){
      this.showMessage('请输入手机号');
    } else if (formdata.password == ''){
      this.showMessage('请输入密码');
    }else{
      ajax(this.data.loginURL).paramters(form).login().then(res => {
        console.log("登陆成功")
        wx.switchTab({
          url: '../../education/home/home',
          success:function(e){
            var page=getCurrentPages().pop();
            page.onLoad();
          }
        })
        WxNotificationCenter.postNotificationName('LOGINGSUCCESS')
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.showMessage(err.data.respMsg)
      })
    }
  },
  /**app.globalData.usertype,
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})