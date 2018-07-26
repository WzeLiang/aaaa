// pages/life/home/home.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.testurl,
    schoollifeiniturl: app.globalData.schoollife_init,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    imglist:[],
    merchantId:"",
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    let Item = e.currentTarget.dataset.item;
    this.setData({
      index: Index,
      merchantId: Item.merchantId,
      show: !this.data.show
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  schoollifeinit:function(){
    ajax(this.data.schoollifeiniturl).paramters({}).post().then(res => {
      this.setData({
        selectData: res.data.merchants,
        imglist:res.data.data,
        merchantId: res.data.merchantId
      })
    console.log(this.data.imglist)
    })
  },
  onLoad: function (options) {
    this.schoollifeinit();

  },
  gotodetil: function (e){
    var merchantId = this.data.merchantId;
    console.log(merchantId);
    console.log("+++++++++++++");
    var id=e.currentTarget.id;
    if (id==1){
      wx.navigateTo({
        url: '../schoolinfo/schoolinfo?merchantId='+merchantId,
      })
    }else if(id==2){
      wx.navigateTo({
        url: '../recipe/recipe?merchantId=' + merchantId,
      })
    }
    else if (id == 3) {
       wx.navigateTo({
         url: '../foodtrace/foodtrace?merchantId=' + merchantId,
       })
    }
    else if (id == 4) {
      wx.navigateTo({
        url: '../dynamic/dynamic?merchantId=' + merchantId,
      })
    }
    else{
      wx.navigateTo({
        url: '../teachway/teachway?merchantId=' + merchantId,
      })
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