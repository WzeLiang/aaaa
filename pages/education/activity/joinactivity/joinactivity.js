// pages/education/activity/joinactivity/joinactivity.js
import ajax from '../../../../utils/request';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:"",
      activityId:"",
      studentListUrl:app.globalData.student_list,
      activityApplyUrl: app.globalData.joinactivity,
      items:[],

      items1: [
        { name: 'child1', value: '张小三', checked: 'true' , classnumb:"五年三班"},
        { name: 'child2', value: '张大三',  classnumb:"学前三班" },
       
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  checkboxChange: function (e) {
    console.log(e.detail.value)
  },
  onLoad: function (options) {
    var that = this
    ajax(that.data.studentListUrl).paramters({ "activityId": options.activityId}).post().then(res => {
      console.log(res)
      this.setData({
        title: options.title,
        activityId: options.activityId,
items:res.data.students
      })
    }).catch(err => {

    })
     
  },

  joinactivitysubmit:function(e){
var that = this
var activities=[]
   
    console.log(e.detail.value.checkes)

    console.log(e.detail.value.checkes[0])
    console.log(that.data.items[0].studentId)
    for (var index in e.detail.value.checkes){
      for(var i in that.data.items){
        if (parseInt(e.detail.value.checkes[index]) == that.data.items[i].studentId){
          activities.push(that.data.items[i])
          
        }
      }

    } 
    console.log(activities)
ajax(that.data.activityApplyUrl).paramters({ "activities": activities ,"activityId":that.data.activityId}).post().then(res => {

  console.log(res.respMsg);
}).catch(err => {

})

  wx.navigateBack({
    
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