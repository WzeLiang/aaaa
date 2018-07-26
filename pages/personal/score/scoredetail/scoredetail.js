// pages/personal/score/scoredetail/scoredetail.js
const app = getApp()
import ajax from '../../../../utils/request';
import { pageTo } from '../../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../../templates/index';
var choosedate = require("../../../../utils/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_scorelis: app.globalData.my_scorelist,
    myscorelis: [],
    teacherarray: [],
    teacherId: "",
    pageCount: "",
    pageNumber: 1,
    pageSize: 5,
    avgScore: "",
    loading: true,
    hidding: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "打分记录"
    })
    this.getmy_scorelis();
  },
  //时间戳转换成日期
  toDate: function (unixtime) {
    var dateTime = new Date(parseInt(unixtime))
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var timeSpanStr = year + '.' + month + '.' + day + '  ' + hour + ':' + minute + ':' + second;
    return timeSpanStr;
  },

  getmy_scorelis: function () {
    var that = this;
    var datas = {
      pageNumber: that.data.pageNumber,
      pageSize: that.data.pageSize,
    }
    ajax(that.data.my_scorelis).paramters(datas).post().then(res => {
      var total = res.totalCount;
      var pageCount = Math.floor((total - 1) / (this.data.pageSize)) + 1;
      this.setData({
        pageCount: pageCount
      })
      console.log(res);
      var myscorelisold = res.data;
      for (var i = 0; i < myscorelisold.length; i++) {
        myscorelisold[i].createTime = this.toDate(myscorelisold[i].createTime);
        myscorelisold[i].week = myscorelisold[i].week.substring(5, 10) + "-" + myscorelisold[i].week.substring(16, 21);
      }

      var myscorelisnew = this.data.myscorelis;
      var myscorelis = myscorelisnew.concat(myscorelisold);

      var avgScore = myscorelisold[0].avgScore;
      console.log(avgScore);
      this.setData({
        myscorelis: myscorelis,
        avgScore: avgScore,
      })
      console.log(myscorelis);
    }).catch(err => {
    })
  },

  getmy_scorelisold: function () {
    var that = this;
    var datas = {
      pageNumber: that.data.pageNumber,
      pageSize: that.data.pageSize,
    }
    ajax(that.data.my_scorelis).paramters(datas).post().then(res => {
      var total = res.totalCount;
      var pageCount = Math.floor((total - 1) / (this.data.pageSize)) + 1;
      this.setData({
        pageCount: pageCount
      })
      console.log(res);
      var myscorelisold = res.data;
      for (var i = 0; i < myscorelisold.length; i++) {
        myscorelisold[i].createTime = this.toDate(myscorelisold[i].createTime);
        myscorelisold[i].week = myscorelisold[i].week.substring(5, 10) + "-" + myscorelisold[i].week.substring(16, 21);
      }
 
      var avgScore = myscorelisold[0].avgScore;
      console.log(avgScore);
      this.setData({
        myscorelis: myscorelisold,
        avgScore: avgScore,
      })
      console.log(myscorelis);
    }).catch(err => {
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
    var that = this;
    this.setData({
      pageNumber: 1,
      pageSize: 5
    })
    that.setData({
      hidding: false
    })
    setTimeout(() => {
      that.setData({
        hidding: true
      })
      wx.stopPullDownRefresh();
    }, 1000)


      this.getmy_scorelisold();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pageNumber = that.data.pageNumber;
    var pageCount = that.data.pageCount;
    that.setData({
      hidding: false,
    })
    console.log(pageNumber + ":" + pageCount);
    if (pageNumber < pageCount) {
      that.setData({
        pageNumber: pageNumber + 1,
      })
      setTimeout(() => {
        that.setData({
          hidding: true
        })
      }, 100)
      this.getmy_scorelis();
    }
    if (pageNumber == pageCount) {
      setTimeout(() => {
        that.setData({
          hidding: true,
          loading: false,
        })
      }, 500)
      setTimeout(() => {
        that.setData({
          loading: true,
        })
      }, 1000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})