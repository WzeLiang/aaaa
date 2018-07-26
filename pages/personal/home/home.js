// pages/personal/home/home.js
const app = getApp()
import ajax from '../../../utils/request';
import {
  pageTo
} from '../../../utils/utils';
import {
  $wuxDialog,
  $wuxLoading
} from '../../../templates/index';
import WxNotificationCenter from '../../../utils/wxnotification';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personaliniturl: app.globalData.my_parentsinit,
    teacheriniturl: app.globalData.my_teacherinit,
    showMessage: false,
    messageContent: '',
    usertoken: "",
    memberType: "",
    flag : null,//控制切换身份按钮是否显示
    studentlist: [{
        id: 1,
        url: "../../../images/education/teacher.jpg",
        name: "周大生",
        classnumb: "五年二班"
      },
      {
        id: 2,
        url: "../../../images/education/teacher.jpg",
        name: "周小生",
        classnumb: "学前三班"
      },
    ],
    classlist: [{
        classid: 111,
        classnumb: "五年二班"
      },
      {
        classid: 222,
        classnumb: "学前三班"
      },
    ],
    user: {},
    array: ['切换身份', '家长', '老师'],
    index: 0,
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
  /**
   * 生命周期函数--监听页面加载
   */
  toscore: function(e) {
    wx.navigateTo({
      url: '../score/score',
    })
  },
  toappointment: function(e) {
    wx.navigateTo({
      url: '../appointment/appointment',
    })
  },
  //用户身份切换
  memberTypeChange(e) {
    let index = e.detail.value
    if (index != this.data.memberType){
      let dt = {
        memberType: index,
      };
      ajax(app.globalData.my_changeMemberType).paramters(dt).login().then(res => {
        console.log("登陆成功")
        wx.reLaunch({
          url: '../../education/home/home',
        })
        WxNotificationCenter.postNotificationName('LOGINGSUCCESS')
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.showMessage(err.data.respMsg)
      })
    }else{
      this.showMessage("当前身份即为" + this.data.array[index])
    }
  },
  personalinit: function() {
    console.log("onshow")
    var that = this
    if (that.data.memberType == 1) {
      ajax(this.data.personaliniturl).paramters({}).post().then(res => {
        console.log(res.data);
        wx.setStorageSync('studentlist', res.data.students);
        // wx.setStorageSync('memberType', memberType);
        this.setData({
          user: res.data
        })
      }).catch(err => {

      })
    }
    if (that.data.memberType == 2) {
      ajax(that.data.teacheriniturl).paramters({}).post().then(res => {
        console.log(res.data);
        this.setData({
          user: res.data
        })
        wx.setStorageSync('classlist', res.data.classes);
      }).catch(err => {

      })
    }
  },
  onLoad: function(options) {
    var memberType = wx.getStorageSync("memberType")
    var flag = wx.getStorageSync("flag")
    console.log(flag)
    this.setData({
      memberType: memberType,
      flag : flag,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.personalinit()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})