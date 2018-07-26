// pages/education/askforleave/askforleave.js
const app = getApp()
import ajax from '../../../../utils/request';
import { pageTo } from '../../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    publishurl: app.globalData.my_teacher_appointment_publish,
    array: ['家庭作业', '作息时间', ],
    classId:[],
    className:[],
    classes:[],
    index: 0,
    startdate: new Date(),
    enddate: new Date(),
    students: [],
    studentindex: 0,
    date:"",
    typeindex:0,
    classindex:0,
  },
  typeSelected:function(e){
    this.setData({
      typeindex: e.detail.value

    })
    console.log(parseInt(e.detail.value)+1)
  },
  classSelected:function(e){
    this.setData({
      classindex:e.detail.value
    })
  },

  studentPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      studentindex: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  startdateselect: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      startdate: e.detail.value
    });
    console.log(this.data.date)
  },
  enddateselect: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      enddate: e.detail.value
    });
    console.log(this.data.date)
  },

  getStudentList: function () {
    var userType = app.globalData.usertype;
    if (userType == 2) {//更新当前在线请假模块为已读
      var data2 = {
        transactionType: 2
      };
      ajax(app.globalData.update_status).paramters(data2).post().then(res => {

      }).catch(err => {

      });
    }

    if (userType == 1) {//加载该家长对应学生
      var data2 = {
      };
      ajax(app.globalData.parent_students).paramters(data2).post().then(res => {
        console.log(res.data);
        this.setData({
          students: res.data.students
        });
      }).catch(err => {

      });
    }
  },

  onLoad: function (options) {
    console.log(options)
    var that = this 
    var time = new Date()
    var s1 = time.getHours().toString()
    var s2 = time.getMinutes().toString()
    if(time.getMinutes().toString().length==1){
      s2 = 0+"" + time.getMinutes().toString()
    }
    if (time.getHours().toString().length == 1) {
      s1 = 0 +""+ time.getHours().toString()
    }
    var t = s1+":"+s2
  var classes = wx.getStorageSync("classlist")
  for(var index in classes){
    that.data.className.push(classes[index].className)
  }
    this.setData({
      enddate:t,
      startdate:t,
      date:options.date,
      className:that.data.className,
classes:classes
    });
    console.log(that.data.classarray)
  },

  askforleavesubmit:function(e){
    var that = this
    console.log(e)
    console.log(that.data.classes[e.detail.value.clazz].classId)
    wx.showModal({
      title: '提示',
      content: '确定发布预约',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
    ajax(that.data.publishurl).paramters({
      appointmentDate: that.data.date,
      startTime:that.data.startdate+":00",
      endTime: that.data.enddate+":00",
      appointmentType:parseInt(e.detail.value.type)+1,
      classId: that.data.classes[e.detail.value.clazz].classId
    }).post().then(res=>{
console.log(res)
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      })  
    }).catch(err=>{})
         
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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