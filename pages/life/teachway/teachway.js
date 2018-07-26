// pages/life/teachway/teachway.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl: app.globalData.testurl,
    eduway_listurl: app.globalData.eduway_list,
    pageNumber: 1,
    pageSize: 3,
    pageCount: "",
    eduwaylist: [],
    hidding: true,
    loading: true,

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

  geteduwaylist: function () {
    var datas = {
      pageNumber: this.data.pageNumber,
      pageSize: this.data.pageSize,
      merchantId: this.data.merchantId,
      data: {
        userToken: wx.getStorageSync("userToken"),
      },
    }
    ajax(this.data.eduway_listurl).paramters(datas).post().then(res => {
      var total = res.totalCount;
      var pageCount = Math.floor((total - 1) / (this.data.pageSize)) + 1;
      this.setData({
        pageCount: pageCount
      })
      var eduwaylistold = res.data.data;

      for (var i = 0; i < eduwaylistold.length; i++) {
        eduwaylistold[i].publishDate = this.toDate(eduwaylistold[i].publishDate);
      }


      var eduwaylistnew = this.data.eduwaylist;

      var eduwaylist = eduwaylistnew.concat(eduwaylistold);

      this.setData({
        eduwaylist: eduwaylist
      })
      console.log(eduwaylist);
    }).catch(error => {

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "教子有方"
    })
    var merchantId = options.merchantId;
    this.setData({
      merchantId: merchantId
    })
    this.geteduwaylist();
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
    var that=this;
    this.setData({
      pageNumber:1
    })
    that.setData({
      hidding:false
    })
    setTimeout(() => {
      that.setData({
        hidding: true
      })
      wx.stopPullDownRefresh();
    }, 1000)
    
    this.geteduwaylist();

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

    if (pageNumber < pageCount) {
      that.setData({
        pageNumber: pageNumber + 1,
      })
      setTimeout(() => {
        that.setData({
          hidding: true
        })
      }, 100)
      this.geteduwaylist();
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