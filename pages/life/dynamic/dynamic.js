// pages/life/dynamic/dynamic.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getnewslist: app.globalData.news_list,
    pageNumber: 1,
    pageSize: 7,
    pageCount: "",
    merchantId:"",
    newslist: [],

    hidden: true,
    isnew: false,
    isHideLoadMore:true,
    scrollTop: 0,
    scrollHeight: 0,
  },


  ////将返回的newslist拼接到现有newslist后面
  getContents: function () {
    var that=this;
    var datas = {
      pageNumber: this.data.pageNumber,
      pageSize: this.data.pageSize,
      merchantId: this.data.merchantId,
      data: {
        userToken: wx.getStorageSync("userToken"),
      },
    }
    ajax(this.data.getnewslist).paramters(datas).post().then(res => {
      var newslist = res.data.data;
      var total = res.totalCount;
      var pageCount = Math.floor((total - 1) / (that.data.pageSize)) + 1;
      this.setData({
        pageCount: pageCount
      })
      var newslistold = this.data.newslist;
      newslist = newslistold.concat(newslist);
      for (var i = 0; i < newslist.length; i++) {
        newslist[i].publishDate = this.toDate(newslist[i].publishDate);
      }
      console.log(newslist);
      var pageNumber = this.data.pageNumber;
      if(pageNumber==1){
       this.setData({
         newslist: newslist,
       })
      }
      if (pageNumber < pageCount) {
        this.setData({
          newslist: newslist,
          pageNumber: this.data.pageNumber + 1,
        })
      }
      if (pageNumber == pageCount) {
        this.setData({
          isHideLoadMore:false
        })
        setTimeout(function () {
          that.setData({
            isHideLoadMore: true,
          })
        }, 1500)
      }
    }).catch(err => {
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "动态"
    })
    this.setData({
      merchantId:options.merchantId
    })
    this.getContents();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  bindDownLoad: function () {
    //该方法绑定了页面滑动到底部的事件
    var that=this;
    this.setData({
      hidden: false
    })
    this.getContents();
    this.setData({
      hidden: true,
    })
    setTimeout(function () {
      that.setData({
        hidden: true,
      })
    }, 1500)
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新

    this.setData({
      pageNumber: 1,
      scrollTop: 0,
      isnew: true,
    });
    this.getContents();
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