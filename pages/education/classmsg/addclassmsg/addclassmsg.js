// pages/education/classmsg/addclassmsg/addclassmsg.js
const app = getApp()
import ajax from '../../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classarray: ['请选择班级'],
    classindex: 0,
    classObjectArray: [{}],
    date: new Date(),
    reSubmitToken: '',
    classId: null
  },
  classMsgSubmit: function(e) {
    console.log(e)
    //班级选择不能为空
    if (!this.data.classId) {
      return false
    }
    //通知内容不能为空
    if (!e.detail.value.adviceContent) {
      this.setData({
        focus: true
      })
      return false
    }
    let url = app.globalData.advice_add
    let dt = {
      reSubmitToken: this.data.reSubmitToken,
      classId: this.data.classId,
      adviceContent: e.detail.value.adviceContent
    }
    console.log(dt)
    ajax(url).paramters(dt).post().then(res => {
      let pages = getCurrentPages()
      if (pages.length > 0) {
        //获取上一个页面的实例对象
        let prePage = pages[pages.length -2]
        //调用上一个页面上的onLoad()方法
        prePage.onLoad()
        //返回上一个页面
        wx.navigateBack({
          delta:1
        })
      }
    }).catch(err => {

    })
  },
  listenerPickerSelected: function(e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      classindex: e.detail.value
    });
    let i = this.data.classindex
    this.setData({
      classId: this.data.classObjectArray[i].classId
    })
    console.log(this.data.classObjectArray[i].classId)
  },
  dateselect: function(e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      date: e.detail.value
    });
    console.log(this.data.date)
  },
  //获取放重复提交token
  getReSubmitToken: function() {
    ajax(app.globalData.reSubmitToken).paramters({}).post().then(res => {
      console.log(res.data.reSubmitToken)
      this.setData({
        reSubmitToken: res.data.reSubmitToken
      })
    }).catch(err => {

    })
  },
  //获取班级列表
  getClassList: function() {
    let url = app.globalData.class_list
    ajax(url).paramters({}).post().then(res => {
      if (res.data.classes) {
        let dt = res.data.classes
        for (let i = 0; i < dt.length; i++) {
          let tmp = {
            classId: dt[i].classId,
            className: dt[i].className
          }
          this.setData({
            classarray: this.data.classarray.concat(dt[i].className),
            classObjectArray: this.data.classObjectArray.concat(tmp)
          })
        }
      }
    }).catch(err => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取reSubmitToken
    this.getReSubmitToken()
    //获取班级列表
    this.getClassList()
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