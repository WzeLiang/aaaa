// pages/education/teacher/teacher.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getteacherlisturl: app.globalData.teacherlist,
    memberType:"",
    studentlist:[],
    teacherlist:[],
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    schoollist: [],//下拉列表的数据
    index:0//选择的下拉列表下标
  },
  // 点击下拉显示框
  selectTap(){
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    var currentMerchantId = e.currentTarget.id
    this.setData({
      index:Index,
      show:!this.data.show
    });
    this.getteacherlist(currentMerchantId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //获取教师列表
  getteacherlist:function(merchantId){
    var datas={}
    if(merchantId!=null){
      console.log("蛇  ")
      datas={
        "merchantId":merchantId
      }
   }
      
    console.log(merchantId)
    console.log("千年")
    ajax(this.data.getteacherlisturl).paramters(datas).post().then(res => {
      console.log(res.data);
      this.setData({
        schoollist: res.data.merchants,
        teacherlist:res.data.teachers
      })

    }).catch(err => {

    })
  },
  onLoad: function (options) {
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
    this.getteacherlist(null)
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