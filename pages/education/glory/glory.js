// pages/education/glory/glory.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    testurl: app.globalData.testurl,
    getschoollisturl: app.globalData.honorrollinit,
    getstudentlisturl: app.globalData.honorrollstudentlist,
    getteacherlisturl: app.globalData.honorrollteacherlist,

    total: "",
    pageCount: "",
    teachertotal: "",
    teacherpageCount: "",

    studenttitle: {
      time: "",
      name: "",
    },
    studenthonorrolls: [],


    teachertitle: {
      time: "",
      name: "",
    },
    teacherhonorrolls: [],

    studentarr: [],
    teacherarr: [],

    merchantId: null,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    schoollist: [],//下拉列表的数据
    index: 0, //选择的下拉列表下标
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    current: "",
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    chooseindex: [],
    teacherchooseindex: []
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
      chooseindex: this.data.pageCount,
      teacherchooseindex: this.data.teacherpageCount,
      merchantId: Item.merchantId,
      current: 0,
      show: !this.data.show
    });
    this.gethonorrollteachers();
    this.gethonorrollstudents();
  },

  //点击事件使得下拉列表false
  clickView: function () {
    this.setData({
      show: false
    })
  },

  //获取商户列表
  getschoollist: function () {
    var datas = {
      userToken: wx.getStorageSync("userToken")
    }
    ajax(this.data.getschoollisturl).paramters(datas).post().then(res => {
      console.log(res.data);
      var obj = res.data.data
      this.setData({
        schoollist: obj
      })
    }).catch(err => {
    })
  },


  //时间戳转换成日期
  toDate: function (unixtime) {
    var dateTime = new Date(parseInt(unixtime))
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var timeSpanStr = year + '-' + month + '-' + day;
    return timeSpanStr;
  },



  //得到荣誉学生列表
  gethonorrollstudents: function () {
    var datas = {
      userToken: wx.getStorageSync("userToken"),
      merchantId: this.data.merchantId,
    }
    ajax(this.data.getstudentlisturl).paramters(datas).post().then(res => {
      var total = res.data.honorrolls.length;
      var pageCount = Math.floor((total - 1) / 10) + 1;

      var studenttitle = res.data;
      var studenthonorrolls = studenttitle.honorrolls;
      this.setData({
        ["studenttitle.time"]: this.toDate(studenttitle.time),
        ["studenttitle.name"]: studenttitle.name,
        studenthonorrolls: studenthonorrolls,
        total: total,
        pageCount: pageCount,
        chooseindex: pageCount
      })

      this.getlist(this.data.studenthonorrolls);
    }).catch(err => {
    })
  },

  //得到荣誉教师列表
  gethonorrollteachers: function () {
    var datas = {
      userToken: wx.getStorageSync("userToken"),
      merchantId: this.data.merchantId,
    }
    ajax(this.data.getteacherlisturl).paramters(datas).post().then(res => {
      var total = res.data.honorrolls.length;
      var pageCount = Math.floor((total - 1) / 10) + 1;
      var teachertitle = res.data;
      var teacherhonorrolls = teachertitle.honorrolls;
      this.setData({
        ["teachertitle.time"]: this.toDate(teachertitle.time),
        ["teachertitle.name"]: teachertitle.name,
        teacherhonorrolls: teacherhonorrolls,
        teachertotal: total,
        teacherpageCount: pageCount,
        teacherchooseindex: pageCount
      })
      this.getteacherlist(this.data.teacherhonorrolls);
    }).catch(err => {
    })
  },


  getlist: function (list) {
    var total = list.length;
    var pageCount = Math.floor((total - 1) / 10) + 1;  //总页数2
    var studentarr = [];
    if (pageCount != 0) {

      for (var i = 0; i < pageCount; i++) {
        var arr = [];
        console.log(i + "***************************");
        if (i < (pageCount - 1)) {
          for (var j = i * 10; j < (i + 1) * 10; j++) {
            arr.push(list[j]);
          }
        }
        if (i == (pageCount - 1)) {
          for (var j = i * 10; j < total; j++) {
            arr.push(list[j]);
          }
        }
        
        studentarr.push(arr);
      }
      this.setData({
        studentarr: studentarr
      })
    }

  },

  getteacherlist: function (list) {
    var total = list.length;
    var pageCount = Math.floor((total - 1) / 10) + 1;  //总页数2
    var teacherarr = [];
    if (pageCount != 0) {

      for (var i = 0; i < pageCount; i++) {
        var arr = [];
        console.log(i + "***************************");
        if (i < (pageCount - 1)) {
          for (var j = i * 10; j < (i + 1) * 10; j++) {
            arr.push(list[j]);
          }
        }
        if (i == (pageCount - 1)) {
          for (var j = i * 10; j < total; j++) {
            arr.push(list[j]);
          }
        }
        teacherarr.push(arr);
      }
      this.setData({
        teacherarr: teacherarr
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "光荣榜"
    })
    this.getschoollist();
    this.gethonorrollstudents();
    this.gethonorrollteachers();
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