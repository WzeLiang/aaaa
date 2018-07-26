// pages/education/syllabus/syllabus.js
const app = getApp()
import ajax from '../../../utils/request';
var choosedate=require("../../../utils/datepre.js")
Page({
  data: {
    classid:"",
    courseparentsurl: app.globalData.courseparents,
    courseteacherurl: app.globalData.courseteacher,
    select:false,
    studentlist:[],
    memberType: "",
    weekarr:[],
    weeklist: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daylist:[],
    subjectlist:[
      { index: 1, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"]},
      { index: 2, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 3, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 4, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 5, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 6, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 7, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
      { index: 8, subjects: ["语文", "数学", "英语", "政治", "历史", "体育", "物理"] },
    ],
    defaultstudentindex: 0 //选中学生index
   
  },
  //格式化日期 
  
  
  preweek:function(){
    choosedate.pre()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekday,
    })
  },
  nextweek:function(){
    choosedate.next()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekday,
    })
  },
  selectitem:function(){
    var that=this
    this.setData({
      select: true
    })
  },
  /**
   * selectitem
   * 生命周期函数--监听页面加载
   */
  //家长获取默认学生课表
  parentgetsyllabus:function(e){
    this.setData({
      select: false
    })
        let classid;
        if(!e){
          console.log("没有");
          classid = this.data.studentlist[0].classId;
        }else{
          console.log("有")
          this.setData({
            defaultstudentindex: e.currentTarget.dataset.index,
             classid : e.currentTarget.dataset.classid
          })
        }

        var datas={
          "classId": classid
    }
    ajax(this.data.courseparentsurl).paramters(datas).post().then(res => {
      console.log(res.data);
      
    }).catch(err => {

    })
  },
  
  onLoad: function (options) {
    
    choosedate.setDate(new Date());
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekday,
    })
    var memberType = wx.getStorageSync("memberType")
    var studentlist = wx.getStorageSync("studentlist")
    if(!studentlist){
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    }else{
      this.setData({
        studentlist: studentlist
      })
      console.log(this.data.studentlist)
    }
    this.setData({
      memberType: memberType,
    })
    this.parentgetsyllabus()
   
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