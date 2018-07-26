// pages/life/schoolinfo/schoolinfo.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoollifeurl: app.globalData.schoollife_schoolinfo,
    merchantId: "",
    introduction:"",
  },

  getschoollife: function () {
    var datas = {
      merchantId: this.data.merchantId,
      data: {
        userToken: wx.getStorageSync("userToken"),
      },
    }
    ajax(this.data.schoollifeurl).paramters(datas).post().then(res => {
      var introduction = res.data.introduction
      if(introduction==null){
        introduction ="抱歉暂时无文章，正在维护中!"
      }
      WxParse.wxParse('article', 'html', introduction, this, 5);
       this.setData({
         introduction: introduction
       })
    }).catch(error => {
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "校园介绍"
    })
    this.setData({
      merchantId: options.merchantId
    })
    this.getschoollife();
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