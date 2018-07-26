// pages/life/dynamic/dynamicinfo/dynamicinfo.js
const app = getApp()
var WxParse = require('../../../../wxParse/wxParse.js');
import ajax from '../../../../utils/request';
import { pageTo } from '../../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../../templates/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getnewsdetail: app.globalData.news_detail,
    newsId:"",
    titleVo:"",
  },
 
  //时间戳转换成日期
  toDate: function (unixtime) {
    var dateTime = new Date(parseInt(unixtime))
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var timeSpanStr = year + '-' + month + '-' + day;
    return timeSpanStr;
  },
  //得到动态详细
  getContentDetail: function () {
    var datas = {
      newsId: this.data.newsId,
      data: {
        userToken: wx.getStorageSync("userToken"),
      },
    }
    ajax(this.data.getnewsdetail).paramters(datas).post().then(res => {

      var titleVo = res.data.titleVo;
      titleVo.publishDate = this.toDate(titleVo.publishDate);
      console.log(titleVo);
      this.setData({
        titleVo: titleVo
      })
      console.log(this.data.titleVo)
      WxParse.wxParse('article', 'html', titleVo.content, this, 5);
      
    }).catch(err => {
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "动态详情"
    })
   this.setData({
     newsId:options.newsId
   })
   this.getContentDetail();
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