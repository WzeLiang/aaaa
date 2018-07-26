//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    this.globalData.userToken = wx.getStorageSync("userToken");
    this.globalData.memberType = wx.getStorageSync("memberType");
 
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    memberType:"",
    userToken:"",
    userInfo: null,
    usertype:1,//2老师，1家长;
    testurl: 'https://aplus.jkinvest.cn',//"http://localhost:9093",//

    login:"/api/login",
    reSubmitToken:"/api/public/reSubmitToken",//获取防止重复提交token
    register:"/api/register/member",
    getVerifyCode:"/api/register/getVerifyCode",
    logout:"/api/logout",
    resetPwd:"/api/resetPwd",
    resetPwdgetVerifyCode:"/api/resetPwd/getVerifyCode",
    //教务
    educationInit:"/api/education/init",
    educationbanners:"/api/education/init/banners",
    educationadvice:"/api/education/init/advice",
    //考勤/家长、老师
    attendanceparents:"/api/attendance/parents",
    attendanceteacher:"/api/attendance/teacher",
    attendanceList:"/api/ attendance/attendanceList",//考勤明细
    leaveList:"/api/attendance/leaveList",//请假明细
    teacherresetCard:"/api/attendance/resetCard",//教师补卡
    //课表
    courseparents:"/api/course/parents",//家长
    courseteacher:"/api/course/teacher",
    //家庭作业
    homeworkparents:"/api/homework/parents",
    homeworkteacher:"/api/homework/teacher",
    addhomework:"/api/homework/teacher/add",
    //查询科目表
    subject_list:"/api/subject/list",
    update_status:"/api/updateStatus",
    //教师风采
    teacherlist:"/api/teacher/list",
    teacherdetail:"/api/teacher/detail",
    //在线请假
    addleave:"/api/leave/add",
    leavelist:"/api/leave/list",
    leaveteacher:"/api/leave/teacher",//班级请假记录
    //查询家长对应的学生
    parent_students:"/api/leave/student/list",
    //校园直播/
    livelist:"/api/live/list",
    livedetail:"/api/live/detail",
    //光荣榜
    honorrollinit:"/api/honorroll/init",
    honorrollstudentlist:"/api/honorroll/student/list",//根据学校id查询
    honorrollteacherlist:"/api/honorroll/teacher/list",
    //活动列表
    activitylist:"/api/activity/list",
    student_list:"/api/student/list",            //根据家长id获取学生列表---------------------------------------
    joinactivity:"/api/activity/apply",//参加活动
    activitydetail:"/api/activity/detail",//活动报名列表----老师
    //班级通知
    advice_parentslist:"/api/advice/parents/list",//家长
    advice_teacherist:"/api/advice/teacher/list",
    advice_add:"/api/advice/publish",//发布通知
    class_list:"/api/class/list",    //班级列表=================根据教师ID查询班级列表-------------------------
    
    //生活
    schoollife_init:"/api/schoollife/init",
    schoollife_schoolinfo:"/api/schoollife/school",
    //每周食谱
    cookbook_parents:"/api/cookbook/parents",
    cookbook_teacher:"/api/cookbook/teacher",
    //食谱溯源
    food_trace:"/api/food/trace",
    //最新动态
    news_list:"/api/news/list",
    news_detail: "/api/news/detail",
    //教子有方
    eduway_list:"/api/eduway/list",
    eduway_detail:"/api/eduway/detail",
    //个人中心
    my_parentsinit:"/api/my/parents/init",
    my_teacherinit:"/api/my/teacher/init",
    my_profilePictureedit:"/api/profilePicture/edit",//个人中心头像昵称设置
    my_merchantlist: "/api/my/merchant/list",//获取商户列表
    my_changeMemberType: "/api/my/changeMemberType",//切换身份
    //家长个人中心
    my_parent_studentdetail:"/api/my/student/detail",//学生详情
    my_parent_studentadd:"/api/my/student/add",//学生关联提交
    my_parent_studentcancel:"/api/my/student/cancel", //取消关联
    //打分
    teacher_list:"/api/my/teacher/list",//获取教师列表--------------------------------------------------------
    my_score_info: "/api/my/scoreinfo",//获取已评分老师的评分信息
    my_teacherscore:"/api/my/teacher/score",//打分提交
    my_scorelist:"/api/my/score/list",//打分记录

    //预约
    my_appointment_init:"/api/my/appointment/init",
    my_appointment_add:"/api/my/appointment/add",
    my_appointment_list:"/api/my/parents/appointment/list",
    
    //教师个人中心
    my_teacher_studentlist:"/api/my/student/list",//查看班级学生列表
    //评分
    my_teacher_totalscore:"/api/my/evaluation/totalscore",//获取评分总数
    my_teacher_scorelist:"/api/my/evaluation/list",//获取评分列表
    //预约
    my_teacher_appointment_weekinfo: "/api/my/teacher/appointment/weekinfo", //获取预约周信息
    my_teacher_appointment_daylist:"/api/my/teacher/appointment/list",//获取当天预约情况
    my_teacher_appointment_publish:"/api/my/appointment/publish",//发布预约
    my_teacher_appointment_typelist:"/api/my/teacher/appointment/typelist"//查看预约名单
  }
})