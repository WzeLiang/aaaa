// pages/education/homework/releasehomework/releasehomework.js
const app = getApp()
import ajax from '../../../../utils/request';
import { pageTo } from '../../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlisturl: app.globalData.educationbanners,
    classlisturl: app.globalData.class_list,
    subjectindex: 0,
    classindex:0,
    date: []
  },
  classPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      classindex: e.detail.value
    });
    console.log(this.data.classindex)
  }, 
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      subjectindex: e.detail.value
    });
    console.log(this.data.subjectindex)
  }, 
  dateselect: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      date: e.detail.value
    });
    console.log(this.data.date)
  }, 
  /**
   * 
   * 获取班级列表
   */
  getclasslist: function () {
    ajax(app.globalData.class_list).paramters({}).post().then(res => {
      console.log(res.data);
      this.setData({
        classes: res.data.classes 
      });
    }).catch(err => {

    })
  },
  /**
   * 
   * 获取科目列表
   */
  getsubjectlist: function () {
    ajax(app.globalData.subject_list).paramters({}).post().then(res => {
      console.log(res.data);
      this.setData({
        array: res.data.subjectList
      });
    }).catch(err => {

    })
  },

  getbannerlist: function () {
    ajax(this.data.bannerlisturl).paramters({}).post().then(res => {
      console.log(res.data);
    }).catch(err => {

    })
  },
  /**
   * 发布作业
   */
  releasehomework : function(e){
    var formData = e.detail.value;
    var homeworkContent=e.detail.value.homeworkContent;
    if(homeworkContent == null || homeworkContent == ''){
      wx.showToast({
        title: "请填写作业内容",
        duration: 1000,
        mask: true
      });
      return false;
    }
    ajax(app.globalData.addhomework).paramters(formData).post().then(res => {
      wx.showToast({
        title: res.respMsg,
        duration: 1000,
        mask: true
      });
      var resCode=res.respCode;
      if (resCode == '000'){
        
      }
    }).catch(err => {

    });
    
  },
  onLoad: function (options) {
    var time =new Date()
    console.log(time.toDateString);
    console.log(time.getMonth);
    console.log(time.getDay);
    this.setData({
      date: time
     
    });
    var userToken = wx.getStorageSync("userToken")
    console.log(userToken)
    this.getbannerlist()
    this.getclasslist()
    this.getsubjectlist()
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