// pages/life/foodtrace/foodtrace.js
const app = getApp();
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    traceDetailurl: app.globalData.food_trace,
  },

  gettraceDetailurl: function () {
    var datas = {
      merchantId: this.data.merchantId,
      data: {
        userToken: wx.getStorageSync("userToken")
      }
    }
    ajax(this.data.traceDetailurl).paramters(datas).post().then(res => {
      var traceDetail = res.data.traceDetail;
      if (traceDetail == null) {
        traceDetail = "抱歉暂时无文章，正在维护中!";
      }
      WxParse.wxParse('article', 'html', traceDetail, this, 5);
    }).catch(error => {

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "食品溯源"
    })
    this.setData({
      merchantId: options.merchantId,
    })
    this.gettraceDetailurl();
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