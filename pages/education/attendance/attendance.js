// pages/education/syllabus/syllabus.js
const app = getApp()
var choosedate = require("../../../utils/datepre.js")
import ajax from '../../../utils/request';
Page({
  data: {
    studentId: "",
    AttendanceParentsUrl: app.globalData.attendanceparents,
    AttendanceTheacherUrl: app.globalData.attendanceteacher,
    memberType: "",
    select: false,
    studentlist: [],
    postweekarray: [],
    weekarr: [],
    weeklist: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daylist: [],
    num: 0,
    defaultstudentindex:0,      //选中学生index
    attendanceType:2,

  },
  //格式化日期 
  preweek: function () {
    choosedate.pre()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekday,
      postweekarray: choosedate.postweekarray,
      num:0
    })
    this.AttendanceParents()
  },
  nextweek: function () {
    choosedate.next()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekday,
      postweekarray: choosedate.postweekarray,
      num: 0
    })
    this.AttendanceParents()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  selectitem: function () {
    var that = this
    this.setData({
      select: true
    })
  },

  onLoad: function (options) {
    console.log(choosedate.cells)
    console.log(choosedate.weekday)
    choosedate.setDate(new Date());
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekday,
      postweekarray: choosedate.postweekarray,

    })
    var memberType = wx.getStorageSync("memberType")
    var studentlist = wx.getStorageSync("studentlist")
    if (!studentlist) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    } else {
      this.setData({
        studentlist: studentlist
      })
      console.log(this.data.studentlist)
    }
    this.setData({
      memberType: memberType,
    })

    this.AttendanceParents()
  },

  AttendanceParents:function(e){
    this.setData({
      select: false,
    })
    if (!e) {
      console.log("没有");
      this.setData({
        studentId: this.data.studentlist[0].studentId
      })
    } else {
      console.log("有");
      console.log(e)
      this.setData({
        defaultstudentindex: e.currentTarget.dataset.index,
       studentId: e.currentTarget.dataset.studentid
      })
    }
    var datas={
      "studentId": this.data.studentId,
      "weekStart": this.data.postweekarray[0],
      "weekEnd": this.data.postweekarray[6]

    }
    console.log(datas)
    ajax(this.data.AttendanceParentsUrl).paramters(datas).post().then(res => {
      console.log(res.data);

    }).catch(err => {

    })
  },
  gettodayattend:function(e){
    this.setData({
      num: e.currentTarget.dataset.index
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