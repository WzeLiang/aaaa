// pages/personal/appointment/appointment.js
const app = getApp()
import ajax from '../../../../utils/request';
Page({
  data: {
    showrecordturl: app.globalData.my_appointment_list,
    appointments:[],

  },


 onLoad:function(e){
   console.log('Niha')
   var that = this 
   ajax(that.data.showrecordturl).paramters({}).post().then(res=>{
     console.log(res.data)
     console.log("你好")
     that.setData({
       appointments: res.data
     })
   }).catch(err=>{

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