// pages/personal/appointment/appointment.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
var choosedate = require("../../../utils/data.js")
Page({
  data: {
    appointmentiniturl: app.globalData.my_appointment_init,
    appointaddurl: app.globalData.my_appointment_add,
    teacherappointmenturl: app.globalData.my_teacher_appointment_weekinfo ,
    teacherapplisturl: app.globalData.my_teacher_appointment_daylist,
    typelisturl: app.globalData.my_teacher_appointment_typelist,
    studentlist: [],
    memberType: "",
    weekarr: [],
    weeklist: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daylist: [],
    appointment:[],//当日的预约活动
    appointment_record:[],//记录之前的
    select:false,
    day:0,
    d:[],
    currentClassId:0,//当前学生的班级Id
    currentStudentId:0,//当前学生Id
    i:0,//当前选中的日期的下标,为-1时表示日期不可选
    i_record:0,//记录下标,用于点击上周,下周时,回滚到之前选中的那个日期
    weekTotal:[],//周统计预约状态
    currentWeekTotal:[],//记录当前周的预约状态
    j:0,//记录距离本周,点击上一周减一，点击下一周加一
    j_record:0,//记录最后一次选中日期查看的那个周，以便回滚
    proindex:0,//切换头像

    //记录查看的周的预约状态,-1--已结束,0--无预约可约,1--可预约,2--已预约
  },


  preweek: function () {
    var that = this 
    console.log(this.data.currentClassId)
    console.log("可以")
    choosedate.pre()
    console.log(choosedate.cells)
    console.log(choosedate.weekdayanddate)
    console.log(new  Date (choosedate.weekdayanddate[0].datetime).getTimezoneOffset())
    console.log(new Date(choosedate.cells[0]).getDay())
    console.log(new Date(choosedate.cells[0]) > new Date(choosedate.cells[1]))
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekdayanddate,
      i:-1,//不被选中和点击
      j:that.data.j-1,
      appointment:[],
    })
    console.log(that.data.j)
    var currentDate = new Date()
    console.log(currentDate.getFullYear() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getDate() + "")
    if (that.data.memberType == '1') {
    that.WeekStatus1(that.data.j,null);
    }
    if(that.data.memberType=='2'){
      console.log("飞天")
      that.WeekStatus2(that.data.j,that.data.weekarr)
    }
    
  },
  nextweek: function () {
    var that = this 
    console.log("飞天222")
    console.log(that.data.currentClassId)
    choosedate.next()
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekdayanddate,
      i: -1,////不被选中和点击
      j: that.data.j + 1,
      appointment:[]
    })
    var currentDate = new Date()
    console.log(currentDate.getFullYear() + "." + (currentDate.getMonth()+1) + "." + currentDate.getDate() + "")
    console.log(choosedate.weekdayanddate[0].datetime.getDate())
    if(that.data.memberType=='1'){
      console.log("飞天")
      console.log(that.data.currentClassId)
    that.WeekStatus1(that.data.j, choosedate.weekdayanddate[0].datetime);
    }
    if (that.data.memberType == '2') {
      console.log("飞天")
      console.log(that.data.currentClassId)
      that.WeekStatus2(that.data.j, that.data.weekarr)
    }

  },
 /**
   * 上周和下周按钮显示某周的状态,已经回到当前周时，选中日期的回滚（教师）
   */
  WeekStatus2: function (j, t) {
    var that = this
    console.log(t)
    if (j > 0) {//未来周末
      that.setData({
        weekTotal: []
      })
      ajax(that.data.teacherappointmenturl).paramters({
        mondayDate: t[0],
        sundayDate: t[6],
       
      }).post().then(res => {
        console.log(res)
        var weekTotal =that.sortdata(res.data)
        that.setData({
          weekTotal: weekTotal
        })
        console.log(that.data.weekTotal)
        if (j == that.data.j_record) {
          that.setData({
            i: that.data.i_record,//当点击下一周或者上一周,是当前周,那么就回到之前选中的日期
            appointment: that.data.appointment_record
          })
        }

      }).catch(err => {

      })
    }
    if (j < 0) {//过去的周末,那肯定都是已结束状态
      for (var index in that.data.weekTotal) {
        that.data.weekTotal[index] = -1//全部设置为已结束
      }
      that.setData({
        weekTotal: that.data.weekTotal,
      })
    }
    if (j == 0) {//本周末
      that.setData({
        weekTotal: that.data.currentWeekTotal,//拿出当前周的预约状态，省去发送请求

      })
      if (that.data.j_record == 0) {
        that.setData({
          i: that.data.i_record,//当点击下一周或者上一周,是当前周,那么就回到之前选中的日期
          appointment: that.data.appointment_record
        })
      }
    }

  },


  /**
   * 上周和下周按钮显示某周的状态,已经回到当前周时，选中日期的回滚（家长）
   */
  WeekStatus1: function(j,t){
    var that = this 
    console.log(j)
    console.log(t)
    console.log(that.data.currentClassId)
    if (j > 0) {//未来周末
      that.setData({
        weekTotal: []
      })
    ajax(that.data.appointmentiniturl).paramters({
      appointmentDate: that.data.weekarr[0],
      classId:that.data.currentClassId,
      studentId:that.data.currentStudentId
    }).post().then(res=>{
      console.log(res)
      that.setData({
        weekTotal:res.data.weekTotal
      })
      if (j == that.data.j_record) {
        that.setData({
          i: that.data.i_record,//当点击下一周或者上一周,是当前周,那么就回到之前选中的日期
          appointment: that.data.appointment_record
        })
      }

    }).catch(err=>{
      
    })
    }
    if (j < 0) {//过去的周末,那肯定都是已结束状态
    for(var index in that.data.weekTotal){
      that.data.weekTotal[index].status = -1//全部设置为已结束
      }
    that.setData({
      weekTotal:that.data.weekTotal,   
    })
    }
    if (j == 0) {//本周末
      that.setData({
        weekTotal: that.data.currentWeekTotal,//拿出当前周的预约状态，省去发送请求
       
      })
      if(that.data.j_record==0){
        that.setData({
          i: that.data.i_record,//当点击下一周或者上一周,是当前周,那么就回到之前选中的日期
          appointment: that.data.appointment_record
        })
      }
    }

  },

  /**
   * selectitem
   * 生命周期函数--监听页面加载
   */
  //家长获取默认学生课表
  selectitem: function () {
    var that = this
    this.setData({
      select: (!that.data.select)
    })},

  onLoad: function (options) {
    // console.log(choosedate.cells)
    // console.log(choosedate.weekday)
   
    this.datainit(null,null);
  
  },
  datainit: function (sId, cId){
    choosedate.setDate(new Date());
    var that = this
    console.log(choosedate.weekdayanddate)
    console.log("蛇妖")
    console.log()
    var date = new Date()
    console.log(date.getDate())
    for (var index in choosedate.weekdayanddate) {
      if (choosedate.weekdayanddate[index].day == date.getDate()) {
        console.log(index)
        that.setData({
          i: index,
          i_record: index
        })
      }
    }
    that.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekdayanddate,
      day: choosedate.weekdayanddate[0].day
    })
    var memberType = wx.getStorageSync("memberType")
    var studentlist = wx.getStorageSync("studentlist")
    if (!studentlist) {

    } else {
      that.setData({
        studentlist: studentlist
      })
      console.log(that.data.studentlist)
    }
    that.setData({
      memberType: memberType,
    })
    var memberType = wx.getStorageSync("memberType")
    
    var d = new Date()
    var dd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    var ddd = d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate()
    var data = {
      studentId:sId,
      classId:cId,
      appointmentDate:ddd

    }
    console.log(sId)
    console.log(cId)
    if (memberType == "1") {
      ajax(that.data.appointmentiniturl).paramters(data).post().then(res => {
        console.log(res.data)
        var weekdata = res.data.weekTotal
        for (var index in weekdata) {
          if (that.data.i > index) {
            weekdata[index].status = -1
          }

        }
        if(sId==null && cId==null){
           sId = res.data.studentId
          cId = res.data.classId
        }
        that.setData({
          weekTotal: weekdata,
          currentWeekTotal: weekdata,
          currentClassId: cId,
          currentStudentId: sId,
          appointment: res.data.appointments,
          appointment_record: res.data.appointments,
          j: 0,//记录距离本周,点击上一周减一，点击下一周加一
          j_record: 0,//记录最后一次选中日期查看的那个周，以便回滚

        })
       
      }).catch(err => {

      })
    }
    if (memberType == "2") {
      ajax(that.data.teacherappointmenturl).paramters({}).post().then(res => {

        var t = that.sortdata(res.data)
        that.setData({
          weekTotal: t,
          currentWeekTotal: t,
        })

        console.log(that.data.i)

        console.log(that.data.weekTotal)
        
        console.log(dd)
        console.log(that.data.weekarr[that.data.i])
        console.log(that.data.weekTotal[that.data.i])
        if (that.data.weekTotal[that.data.i] >= 0) {

          ajax(that.data.teacherapplisturl).paramters({
            appointmentDate: that.data.weekarr[that.data.i],

          }).post().then(res => {
        
            console.log(res.data)
            that.setData({
              appointment: res.data,
              appointment_record: res.data
            })

          }).catch(err => {

          })

        }


      }).catch(err => {

      })
    }
    
    },




  /**
   * 重新整理教师数据
   */
  sortdata:function(data){
    var t = [-2, -2, -2, -2, -2, -2, -2]
    var that = this
    for (var index in data) {
      if (data[index].week == 1) {
        if (that.data.i > 0) {
          t[0] = -1
        } else {
          t[0] = parseInt(data[index].flag)
        }
      }
      if (that.data.i > 0) {
        t[0] = -1
      }
      if (data[index].week == 2) {
        if (that.data.i > 1) {
          t[1] = -1
        } else {
          t[1] = parseInt(data[index].flag)
        }
      }
      if (that.data.i > 1) {
        t[1] = -1
      }
      if (data[index].week == 3) {
        if (that.data.i > 2) {
          t[2] = -1
        } else {
          t[2] = parseInt(data[index].flag)
        }
      }
      if (that.data.i > 2) {
        t[2] = -1
      }
      if (data[index].week == 4) {
        if (that.data.i > 3) {
          t[3] = -1
        } else {
          t[3] = parseInt(data[index].flag)
        }
      }
      if (that.data.i > 3) {
        t[3] = -1
      }
      if (data[index].week == 5) {
        if (that.data.i > 4) {
          t[4] = -1
        } else {
          t[4] = parseInt(data[index].flag)
        }
      }
      if (that.data.i > 4) {
        t[4] = -1
      }
      if (data[index].week == 6) {
        if (that.data.i > 5) {
          t[5] = -1
        } else {
          t[5] = parseInt(data[index].flag)
        }
      }
      if (that.data.i > 5) {
        t[5] = -1
      }
      if (data[index].week == 7) {
        if (that.data.i > 6) {
          t[6] = -1
        } else {
          t[6] = parseInt(data[index].flag)
        }
      }
      if (that.data.i > 6) {
        t[6] = -1
      }
    }
   return t;
  },
changestudent:function(e){
var that = this
console.log(e)
var studentId= e.currentTarget.dataset.studentid
var classId = e.currentTarget.dataset.classid
  

  that.datainit(studentId, classId)
  

  that.setData({
    proindex: e.currentTarget.dataset.index,
    select: (!that.data.select),
    currentStudentId: studentId,
    currentClassId: classId,
  })
  console.log("成功")
  console.log(that.data.currentClassId)
  console.log(classId)
  console.log("成功")
  console.log(that.data.currentStudentId)
 
},


  changeDate:function(e){
    console.log(e)
    var that =this
   
    if(that.data.memberType=="1"){
    if (e.currentTarget.dataset.status == 1 || e.currentTarget.dataset.status== 2){
      console.log(e.currentTarget.dataset.status)
      this.setData({
        i: e.currentTarget.dataset.index,
        i_record: e.currentTarget.dataset.index,
        j_record:that.data.j
      })
      ajax(that.data.appointmentiniturl).paramters({
        appointmentDate: e.currentTarget.dataset.weekarr,
        classId: that.data.currentClassId,
        studentId: that.data.currentStudentId
      }).post().then(res => {
        console.log(res.data)
        that.setData({
          appointment: res.data.appointments,
          appointment_record:res.data.appointments
        })

      }).catch(err=>{

      })
    }else{

    }
    }

    if(that.data.memberType=="2"){
      if (e.currentTarget.dataset.status >= 0 || e.currentTarget.dataset.status==-2 ) {
        console.log(e.currentTarget.dataset.status)
        this.setData({
          i: e.currentTarget.dataset.index,
          i_record: e.currentTarget.dataset.index,
          j_record: that.data.j
        })
        ajax(that.data.teacherapplisturl).paramters({
          appointmentDate: e.currentTarget.dataset.weekarr,
         
        }).post().then(res => {
          console.log(res.data)
          that.setData({
            appointment: res.data,
            appointment_record: res.data
          })

        }).catch(err => {

        })
      } else {

      }
    }
   
  },
  showMyRecord: function (e) {
    wx.navigateTo({
      url: '../appointment/showmyrecord/showmyrecord',
    })
  },
appoint:function(e){
  console.log(e.currentTarget.dataset.appointmentid)
  var that = this 
  wx.showModal({
    title: '提示',
    content: '确定预约',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        ajax(that.data.appointaddurl).paramters({
          appointmentId: e.currentTarget.dataset.appointmentid,
          studentId: that.data.currentStudentId,
        }).post().then(res => {
          console.log(res)
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000
          })  
          ajax(that.data.appointmentiniturl).paramters({
            appointmentDate: that.data.weekarr[that.data.i],
            classId: that.data.currentClassId,
            studentId: that.data.currentStudentId
          }).post().then(res => {
            console.log(res.data)
            that.setData({
              appointment: res.data.appointments,
              appointment_record:res.data.appointments,
              weekTotal:res.data.weekTotal,

            })
            if(that.data.j==0){
              that.setData({
                currentWeekTotal: res.data.weekTotal
              })
            }
console.log(that.data.currentWeekTotal)
          }).catch(err => {

          })
        }).catch(err => {

        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })  
  


},
send:function(){
  var that = this 
  var time = that.data.daylist[that.data.i_record].datetime
  var m = parseInt(time.getMonth())+1
  var d =time.getDate()
  if(time.getMonth().toString().length==1){
    m = "0" + m
  }
  if (time.getDate().toString().length == 1) {
    d= "0" + d
  }
  var date = time.getFullYear()+"-"+m + "-" + d
  wx.navigateTo({
    url: '../appointment/publish/publish?date='+date,
  })
},

see:function(e){
  console.log(e.currentTarget)
  wx.navigateTo({
    url: '../appointment/showlist/showlist?appointmentId=' + e.currentTarget.dataset.appointmentid,
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
    var that=this
     if(that.data.memberType==2){
       
       ajax(that.data.teacherapplisturl).paramters({
         appointmentDate: that.data.weekarr[that.data.i],

       }).post().then(res => {
         console.log(res.data)
         that.setData({
           appointment: res.data,
           appointment_record: res.data
         })

       }).catch(err => {

       })
       ajax(that.data.teacherappointmenturl).paramters({
         mondayDate: that.data.weekarr[0],
         sundayDate: that.data.weekarr[6]

       }).post().then(res => {
         console.log(res)
         var weekTotal = that.sortdata(res.data)
         that.setData({
           weekTotal: weekTotal
         })
     })
     }
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