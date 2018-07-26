// pages/education/classmsg/classmsg.js
const app = getApp()
import ajax from '../../../utils/request'
import {
  pageTo
} from '../../../utils/utils'
import {
  $wuxDialog,
  $wuxLoading
} from '../../../templates/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adviceParentsUrl: app.globalData.advice_parentslist,
    adviceTeacherUrl: app.globalData.advice_teacherist,
    user: "",
    classidlist: [],
    currentActive: 0,
    students: [{
      classId: -1,
      name: "",
      className: "全部"
    }],
    usertoken: "",
    memberType: "",
    advices: [],
    showStudentName:true,
    pageNumber:0,
    pageSize:8,
  },
  classAdvice: function(e) {
    let index = e.currentTarget.dataset.current
    this.setData({
      currentActive: index
    })
    let classId = this.data.students[index].classId
    console.log(classId)
    this.adviceInit(classId)
  },
  adviceInit: function(classId) {
    let memberType = this.data.memberType
    let url = ''
    if (memberType == 1) url = this.data.adviceParentsUrl
    if (memberType == 2) url = this.data.adviceTeacherUrl
    let dt = {
      pageNumber: this.data.pageNumber,
      pageSize: this.data.pageSize,
      classId: (classId == -1 || classId == undefined) ? null : classId
    }

    if (url.length > 0) {
      ajax(url).paramters(dt).post().then(res => {
        if (memberType == 1) {
          let students = res.data.students ? res.data.students : null
          let advices = res.data.advices ? res.data.advices : null

          if(!classId || classId == -1){
            if (!classId){ //null init
              this.setData({ students: this.data.students.concat(students)}) 
            }
            this.setData({showStudentName: false})
          }else{
            this.setData({showStudentName: true})
          }
          this.setData({advices: advices})
          console.log(this.data.showStudentName)
        }
        if (memberType == 2) {
          let advices = res.data.data ? res.data.data : null
          this.setData({
            advices: advices
          })
          console.log(advices)
        }
      }).catch(err => {

      })
    }
  },
  //根据班级获取班级通知
  parentgetclassmsg: function() {
    var classid = this.data.classidlist
    ajax(this.data.parentsgetlisturl).paramters({}).post().then(res => {
      console.log(res.data);
      this.setData({

      })

    }).catch(err => {

    })
  },
  toaddclassmsg: function(e) {
    wx.navigateTo({
      url: './addclassmsg/addclassmsg',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var userType = app.globalData.usertype;
    var isupdate = options.isUpdate;
    if(isupdate == 1){
      if (userType == 1) {
        var data2 = {
          transactionType: 4
        };
        ajax(app.globalData.update_status).paramters(data2).post().then(res => {

        }).catch(err => {

        });
      }
    }
    
    let memberType = wx.getStorageSync("memberType")
    this.setData({
      memberType: memberType
    })
    this.adviceInit()
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