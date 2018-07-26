// pages/education/syllabus/syllabus.js
const app = getApp()
var choosedate = require("../../../utils/data.js")
import ajax from '../../../utils/request';
Page({
  data: {
    usertype: app.globalData.usertype,
    select: false,
    cookbookUrl: app.globalData.cookbook_parents,
    cookbook:[],
    weekarr: [],
    weeklist: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daylist: [],
    select:0,//选择哪个日期天数
    currentDateTime:"",//当前选中的日期

    merchantId:"",//商户ID

    subjectlist: [
      { index: 1, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 2, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 3, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 4, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 5, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 6, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 7, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 8, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
    ]

  },
  //格式化日期 


  preweek: function () {
    choosedate.pre()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekdayanddate,
      select : choosedate.weekdayanddate[0].day,
      currentDateTime: choosedate.weekdayanddate[0].datetime
    })
    this.getCookbook(new Date(this.data.currentDateTime), this.data.merchantId)
  },
  nextweek: function () {
    choosedate.next()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekdayanddate,
      select: choosedate.weekdayanddate[0].day,
     currentDateTime: choosedate.weekdayanddate[0].datetime
    })
    this.getCookbook(new Date(this.data.currentDateTime), this.data.merchantId)
  },

  /**
   * selectitem
   * 生命周期函数--监听页面加载
   */
  changeDate: function(e){
    console.log(e.currentTarget.dataset)
    this.setData({
      select: e.currentTarget.dataset.date,
      currentDateTime: e.currentTarget.dataset.item
    })
    this.getCookbook(new Date(this.data.currentDateTime),this.data.merchantId)

  },
  
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "每周食谱"
    })
    choosedate.setDate(new Date());
    var that = this 
    var date = new Date()
    var select = date.getDate()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekdayanddate,
      merchantId: options.merchantId
    })
    that.getCookbook(new Date(), options.merchantId)
  },

  getCookbook: function(date,merchantId){
    var that = this
    var day = date.getDate()
    ajax(that.data.cookbookUrl).paramters({ "merchantId": merchantId, "cookbookDate":date}).post().then(res => {
      console.log(res.data.cookbook)
      that.setData({
        cookbook: res.data.cookbook,
        select: day
      })
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