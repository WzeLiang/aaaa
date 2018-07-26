// pages/education/teacher/teacherinfo/teacherinfo.js
const app = getApp()
import ajax from '../../../../utils/request';
var WxParse = require('../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    teacherDetailUrl: app.globalData.teacherdetail,
    teacherName:"",
    teacherPsition:"",
    teacherDetial:"",
    profilePicture:""
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    var teacherId = options.teacherId
    ajax(that.data.teacherDetailUrl).paramters({"teacherId":teacherId}).post().then(res=>{
      console.log(res.data)
      var detail = res.data.teacherDetial
      if (detail == null) {
        detail = "抱歉暂时无文章，正在维护中!"
      }
      WxParse.wxParse('article', 'html', detail, that, 5);
      
     
      that.setData({
        teacherName: res.data.teacherName,
        teacherPsition: res.data.teacherPsition,
        teacherDetial: detail,
        profilePicture: res.data.profilePicture
      })

    }).catch(err=>{

    })

  
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