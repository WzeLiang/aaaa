// pages/life/teachway/teachwaydetail/teachwaydetail.js
const app = getApp()
import ajax from '../../../../utils/request';
import { pageTo } from '../../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../../templates/index';
var WxParse = require('../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eduway_detailurl: app.globalData.eduway_detail,
    eduwayId:"",
    eduwayContent:"",
  },
 
  geteduwaydetial:function(){
    var datas = {
      data: {
        userToken: wx.getStorageSync("userToken"),
        eduwayId: this.data.eduwayId,
      },
    }
    ajax(this.data.eduway_detailurl).paramters(datas).post().then(res=>{
     var eduwayContent = res.data.eduwayContent;
    console.log(res);
     if (null == eduwayContent){
       eduwayContent ="抱歉暂时无文章，正在维护中!"
     }
     this.setData({
       eduwayContent: eduwayContent,
     })
     console.log(this.data.eduwayContent);
     WxParse.wxParse('article', 'html', eduwayContent, this, 5);
    }).catch(error=>{
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "教子有方详情"
    })
    var eduwayId = options.eduwayId;
    this.setData({
      eduwayId: eduwayId,
    })
    this.geteduwaydetial();
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