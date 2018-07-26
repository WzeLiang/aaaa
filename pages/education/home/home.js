// pages/education/home/home.js
const app = getApp()
import ajax from '../../../utils/request';
import {
  pageTo
} from '../../../utils/utils';
import {
  $wuxDialog,
  $wuxLoading
} from '../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    educationiniturl: app.globalData.educationInit,
    bannerlisturl: app.globalData.educationbanners,
    adviceiniturl: app.globalData.educationadvice,
    adviceList: [],
    usertoken: "",
    memberType: "",
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    circular: true,
    isHmUpdated: "",
    isLeaveUpdated: "",
    isActivityUpdated: "",
    isClassAdviceUpdated: "",
    usertype: app.globalData.usertype
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getbannerlist: function() {
    ajax(this.data.bannerlisturl).paramters({}).post().then(res => {
      console.log(res);
      let data = res.data
      let array = []
      for(let i in data){
        array.push(data[i].imgUrl)
      }
      this.setData({
        imgUrls : array
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // educationinit: function() {
  //   ajax(this.data.educationiniturl).paramters({}).post().then(res => {
  //     console.log(res);
  //   }).catch(err => {

  //   })
  // },
  adviceinit: function() {
    ajax(this.data.adviceiniturl).paramters({
      pageNumber : 1,
      pageSize : 2
    }).post().then(res => {
      if (res.data.adviceList.length > 0) {
        this.setData({
          adviceList: res.data.adviceList
        })
      }
    }).catch(err => {

    })
  },
  clearstorage: function() {
    var that = this;
    wx.clearStorage({
      success: function(res) {
        that.setData({
          storageContent: ''
        })
      }
    });
    var userToken = wx.getStorageSync("userToken")
    console.log(userToken)
  },
  getIsUpdated: function() {
    var data = {};
    ajax(app.globalData.educationInit).paramters(data).post().then(res => {
      console.log(res.data);
      this.setData({
        isHmUpdated: res.data.isHmUpdated,
        isLeaveUpdated: res.data.isLeaveUpdated,
        isActivityUpdated: res.data.isActivityUpdated,
        isClassAdviceUpdated: res.data.isClassAdviceUpdated
      })
    }).catch(err => {

    })
  },
  onLoad: function(options) {
    this.getIsUpdated();
    // var userToken = wx.getStorageSync("userToken")
    // console.log(userToken)
    this.getbannerlist();
    //  this.educationinit()
    this.adviceinit();
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
    this.onLoad();
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