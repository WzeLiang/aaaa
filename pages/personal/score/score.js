// pages/personal/score/score.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
var choosedate = require("../../../utils/data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list: app.globalData.teacher_list,
    my_teacherscore: app.globalData.my_teacherscore,
    my_score_info: app.globalData.my_score_info,
    my_scorelis: app.globalData.my_teacher_scorelist,
    my_teacher_totalscore: app.globalData.my_teacher_totalscore,
    memberType: "",
    myscorelis: [],
    teacherarray: [],
    studentarray: [],
    students: [],
    teacherIdnew:"",
    teacherindex: 0,
    studentindex: 0,
    showMessage: false,
    messageContent: '',
    flag: 0, //1-已评价 0-未评价
    weekarr: [],
    day: [],
    flag2: 5,
    score: 10,
    studentId: "",
    content: "",
    week: '',
    teacherId: "",
    teacherIds: [],
    pageCount: "",
    pageNumber: 1,
    pageSize: 5,
    avgScore: "",
    loading: true,
    hidding: true,

  },

  changeColor11: function () {
    var that = this;
    that.setData({
      flag2: 1,
      score: 2,
    });

  },
  changeColor12: function () {
    var that = this;
    that.setData({
      flag2: 2,
      score: 4,
    });
  },
  changeColor13: function () {
    var that = this;
    that.setData({
      flag2: 3,
      score: 6,
    });
  },
  changeColor14: function () {
    var that = this;
    that.setData({
      flag2: 4,
      score: 8,
    });
  },
  changeColor15: function () {
    var that = this;
    that.setData({
      flag2: 5,
      score: 10,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
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
  teacherSelected: function (e) {
    var teacherindex = e.detail.value;
    var teachers = this.data.teachers;
    var teacherId = "";
    console.log(teachers);
    for (var i = 0; i < teachers.length; i++) {
      if (i == teacherindex) {
        teacherId = teachers[i].teacherId;
      }
    }
    this.setData({
      teacherindex: teacherindex,
      content: "",
      teacherId: teacherId,
      teacherIdnew:teacherId,
      score: 10,
      flag: 0
    });
    this.changeColor15();
    this.getteacherscorenew(teacherId, this.data.teacherindex);
  },
  studentSelected: function (e) {
    var studentindex = e.detail.value;
    var students = this.data.students;
    for (var i = 0; i < students.length; i++) {
      if (studentindex == i) {
        var studentId = students[i].studentId;
      }
    }
    this.setData({
      studentindex: studentindex,
      studentId: studentId,
      teacherindex: 0,
      content: "",
      score: 10,
    });
    this.changeColor15();
    this.getteachers();
    
  },

  scoresubmit: function (e) {
    var formdata = e.detail.value;
    var datas = {
      teacherId: this.data.teacherId,
      studentId: this.data.studentId,
      week: this.data.week,
      content: formdata.content,
      score: this.data.score
    }
    var flag = this.data.flag;
    if (formdata.content == "") {
      this.showMessage('请对老师评价，谢谢！');
    } else if (flag == 1) {
      this.showMessage('已评价这个老师！');
    } else {
      ajax(this.data.my_teacherscore).paramters(datas).post().then(res => {
        this.showMessage('打分完成，感谢参与');
        this.getteachers();
        this.getteacherscorenew(this.data.teacherId,this.data.teacherindex);
      }).catch(err => {
        this.showMessage('出现错误，正在维护中');
      })
    }
  },

  //获得所有老师
  getteachers: function () {
    var that = this;
    var datas = {
      studentId: that.data.studentId,
      week: that.data.week,
    }
    ajax(that.data.teacher_list).paramters(datas).post().then(res => {
      console.log(res);
      var teachers = res.data;
      var teacherarray = [];
      var teacherId = '';
      var teacherIdnew = this.data.teacherIdnew;
      for (var i = 0; i < teachers.length; i++) {
        teacherId = teachers[i].teacherId;
        that.setData({
          teacherId: teacherId,
          flag: 0,
        })
        that.getteacherscore(teacherId, i);
        teacherarray.push(teachers[i].teacherName); 
      }
      if (teacherIdnew==""){
        teacherId = teachers[0].teacherId;
      }else{
        teacherId = teacherIdnew;
      }  
      var teacherindex=this.data.teacherindex;
      that.getteacherscorenew(teacherId,teacherindex);
      this.setData({
        teacherarray: teacherarray,
        teachers: teachers,
        teacherId: teacherId,
      })
      
    }).catch(error => {
    })
  },

  //获得选择的已评价老师
  getteacherscorenew: function (teacherId, i) {
    var that = this;
    var flag = 0;
    var datas = {
      studentId: that.data.studentId,
      teacherId: teacherId,
      week: that.data.week,
      flag: 1,
    }
    ajax(that.data.my_score_info).paramters(datas).post().then(res => {
      var scoreteacher = res.data;
      var content = scoreteacher.content;
      var score = scoreteacher.score;
      var teacherarray = that.data.teacherarray;
      if (score > 0) {
        for (var j = 0; j < teacherarray.length; j++) {
          if (i == j) {
            that.setData({
              teacherarray: teacherarray,
              flag: 1,
              content: content,
              score: score,
            })
          }
        }
        switch (score) {
          case 10:
            this.changeColor15();
            break;
          case 8:
            this.changeColor14();
            break;
          case 6:
            this.changeColor13();
            break;
          case 4:
            this.changeColor12();
            break;
          default:
            this.changeColor11();
            break;
        }
      }

    }).catch(error => {
    })
  },

  //获得所有已评价老师
  getteacherscore: function (teacherId, i) {
    var that = this;
    var flag = 0;
    var datas = {
      studentId: that.data.studentId,
      teacherId: teacherId,
      week: that.data.week,
      flag: 1,
    }
    ajax(that.data.my_score_info).paramters(datas).post().then(res => {
      var scoreteacher = res.data;
      var content = scoreteacher.content;
      var score = scoreteacher.score;
      var teacherarray = that.data.teacherarray;
      if (score > 0 && content!=null) {
        for (var j = 0; j < teacherarray.length; j++) {
          if (i == j) {
            teacherarray[j] = teacherarray[j] + "(已评价)";
            that.setData({
              teacherarray: teacherarray,
              flag: 1,
            })
          }
          if(i!=j){
            that.setData({
              teacherarray: teacherarray,
              flag: 0,
            })
          }
        }
      }
    }).catch(error => {
    })
  },

  getavgscore: function () {
    var that=this;
    ajax(that.data.my_teacher_totalscore).paramters({}).post().then(res=>{
      var avgScore=res.data.total;
         this.setData({
           avgScore: avgScore
         })
    }).catch(error=>{
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var students = wx.getStorageSync("studentlist");//从缓存获得所有学生
    var memberType = wx.getStorageSync("memberType");
    
    if (memberType == 1) {
      wx.setNavigationBarTitle({
        title: "我要打分"
      })
      var studentId = students[0].studentId;
      var studentarray = [];
      for (var i = 0; i < students.length; i++) {
        studentarray.push(students[i].studentName);
      }

      var date1 = new Date();
      choosedate.setDate(date1);
      var day = date1.getDate();
      var week1 = [choosedate.cells][0][0];
      var week2 = [choosedate.cells][0][6];
      var week = week1 + "-" + week2;
      this.setData({
        weekarr: choosedate.cells,
        daylist: choosedate.weekdayanddate,
        day: day,
        week: week,
        students: students,
        studentId: studentId,
        studentarray: studentarray,
        memberType: memberType,
      });
      this.getteachers();
    }
    if (memberType == 2) {
      wx.setNavigationBarTitle({
        title: "我的评分"
      })
      this.getavgscore();
      this.getmy_scorelis();
    }
  },
  //时间戳转换成日期
  toDate: function (unixtime) {
    var dateTime = new Date(parseInt(unixtime))
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var timeSpanStr = year + '.' + month + '.' + day + '  ' + hour + ':' + minute + ':' + second;
    return timeSpanStr;
  },

  getmy_scorelis: function () {
    var that = this;
    var datas = {
      pageNumber: that.data.pageNumber,
      pageSize: that.data.pageSize,
    }
    ajax(that.data.my_scorelis).paramters(datas).post().then(res => {
      var total = res.totalCount;
      var pageCount = Math.floor((total - 1) / (this.data.pageSize)) + 1;
      this.setData({
        pageCount: pageCount
      })
      var myscorelisold = res.data;
      for (var i = 0; i < myscorelisold.length; i++) {
        myscorelisold[i].createTime = this.toDate(myscorelisold[i].createTime);
        myscorelisold[i].week = myscorelisold[i].week.substring(5, 10) + "-" + myscorelisold[i].week.substring(16, 21);
      }

      var myscorelisnew = this.data.myscorelis;
      var myscorelis = myscorelisnew.concat(myscorelisold);

      this.setData({
        myscorelis: myscorelis,
        memberType: 2,
      })
    }).catch(err => {
    })
  },

  getmy_scorelisold: function () {
    var that = this;
    var datas = {
      pageNumber: that.data.pageNumber,
      pageSize: that.data.pageSize,
    }
    ajax(that.data.my_scorelis).paramters(datas).post().then(res => {
      var total = res.totalCount;
      var pageCount = Math.floor((total - 1) / (this.data.pageSize)) + 1;
      this.setData({
        pageCount: pageCount
      })
      var myscorelisold = res.data;
      for (var i = 0; i < myscorelisold.length; i++) {
        myscorelisold[i].createTime = this.toDate(myscorelisold[i].createTime);
        myscorelisold[i].week = myscorelisold[i].week.substring(5, 10) + "-" + myscorelisold[i].week.substring(16, 21);
      }

      this.setData({
        myscorelis: myscorelisold,
        memberType: 2,

      })
    }).catch(err => {
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
    var that = this;
    this.setData({
      pageNumber: 1,
      pageSize: 5
    })
    that.setData({
      hidding: false
    })
    setTimeout(() => {
      that.setData({
        hidding: true
      })
      wx.stopPullDownRefresh();
    }, 1000)

    if (that.data.memberType == 2) {
      this.getmy_scorelisold();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this;
    if (that.data.memberType == 2) {
      var that = this;
      var pageNumber = that.data.pageNumber;
      var pageCount = that.data.pageCount;
      that.setData({
        hidding: false,
      })
      if (pageNumber < pageCount) {
        that.setData({
          pageNumber: pageNumber + 1,
        })
        setTimeout(() => {
          that.setData({
            hidding: true
          })
        }, 100)
        this.getmy_scorelis();
      }
      if (pageNumber == pageCount) {
        setTimeout(() => {
          that.setData({
            hidding: true,
            loading: false,
          })
        }, 500)
        setTimeout(() => {
          that.setData({
            loading: true,
          })
        }, 1000)
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})