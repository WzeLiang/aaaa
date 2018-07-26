// pages/personal/relastudentinfo/relastudentinfo.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentdetailurl: app.globalData.my_parent_studentdetail,
    // studentaddurl: app.globalData.my_parent_studentadd,
    // reSubmitTokenurl: app.globalData.reSubmitToken,
    studentcancelurl: app.globalData.my_parent_studentcancel,
    studentId:"",
    user:""
  },

  showMessage: function (text) {
    var that = this
    that.setData({
      showMessage: true,
      messageContent: text
    })
    setTimeout(function () {
      that.setData({
        showMessage: false,
        messageContent: ''
      })
    }, 3000)
  },
  ///获取学生信息
  getstudentinfo:function(){
    var that = this 
    var data={
      "studentId": this.data.studentId
    }
    ajax(this.data.studentdetailurl).paramters(data).post().then(res => {
      console.log(res)
       res.data.birthdate = that.dateFormate(res.data.birthdate)
      this.setData({
        user:res.data
      })
  
      

    }).catch(err => {
      console.log(err)
      // if (err.data.respCode=="400"){
      //   console.log(err.data)
      //   this.showMessage("信息错误,请核对信息!");
      // }
    })
  },
  //取消学生关联
  disassociation:function(){
    var data = {
      "studentId": this.data.studentId
    }
    ajax(this.data.studentcancelurl).paramters(data).post().then(res => {
      console.log(res)
      this.showMessage('取消关联成功');
      setTimeout(function () {
         //要延时执行的代码 
         wx.navigateBack({

         })
       }, 6000) //延迟时间 这里是1秒
     


    }).catch(err => {
      console.log(err)
      // if (err.data.respCode=="400"){
      //   console.log(err.data)
      //   this.showMessage("信息错误,请核对信息!");
      // }
    })
  },
  onLoad: function (options) {
    console.log(options)
    var that = this 
    this.setData({
      studentId: options.studentid
    })
    this.getstudentinfo()

  },
  /**
 * 时间戳的转换
 */
  dateFormate: function (number) {
    var date = new Date(parseInt(number));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var timeSpanStr = year + '.' + month + '.' + day;
    return timeSpanStr;
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