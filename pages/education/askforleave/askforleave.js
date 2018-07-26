// pages/education/askforleave/askforleave.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{index:0,name :"事假"},
      { index: 1, name: "病假" },
      { index: 2, name: "其他" },
    ],
    index: 0,
    startdate: new Date(),
    enddate: new Date(),
    students:[],
    studentindex: 0,
    schoolindex:0
  },
  schoolSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      schoolindex: e.detail.value
    });
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
      date: e.detail.value
    });
    console.log(this.data.date)
  }, 
  enddateselect: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      date: e.detail.value
    });
    console.log(this.data.date)
  }, 

  getStudentList: function(){
    var userType = app.globalData.usertype;

    if (userType == 1) {//加载该家长对应学生
      var data2 = {
      };
      ajax(app.globalData.parent_students).paramters(data2).post().then(res => {
        console.log(res.data);
          this.setData({
            students : res.data.students
          });
      }).catch(err => {

      });
    }
  },
  askforleavesubmit:function(e){
    var formData = e.detail.value;
    var leavereason = formData.leaveReason;
    var leavetype=formData.leaveType;
    var studentId=formData.studentId;
    if (leavereason == null || leavereason ==''){
      wx.showToast({
        title: "请填写请假理由",
        duration: 1000,
        mask: true
      });
      return false;
    }
    if (leavetype == null || leavetype == '') {
      wx.showToast({
        title: "请填写请假类型",
        duration: 1000,
        mask: true
      });
      return false;
    }
    if (studentId == null || studentId == '') {
      wx.showToast({
        title: "请选择请假学生",
        duration: 1000,
        mask: true
      });
      return false;
    }
    ajax(app.globalData.addleave).paramters(formData).post().then(res => {
      wx.showToast({
        title: res.respMsg,
        duration: 1000,
        mask: true
      });
      var resCode = res.respCode;
      if (resCode == '000') {

      }
    }).catch(err => {

    });
  },
  onLoad: function (options) {
  var time =new Date()
  this.getStudentList();
    this.setData({
      date: time
     
    });
    var isupdate = options.isUpdate;
    if (isupdate == 1) {
      var userType = app.globalData.usertype;
      if (userType == 2) {//更新当前在线请假模块为已读
        var data2 = {
          transactionType: 2
        };
        ajax(app.globalData.update_status).paramters(data2).post().then(res => {

        }).catch(err => {

        });
      }
    }
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