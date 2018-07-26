// pages/education/activity/activity.js
import ajax from '../../../utils/request';
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    lastX: 0,     //滑动开始x轴位置
    lastY: 0,     //滑动开始y轴位置
    text: "没有滑动",
    currentGesture: 0, //标识手势
    usertype:"",
    currentActive:0,
    i:true,


    pageSize:10,//显示几条记录
    pageNum0:1,//当前页
    pageTotal0:0,//总页数
    totalCount0:0,//总记录数

    pageNum1: 1,//当前页
    pageTotal1: 0,//总页数
    totalCount1: 0,//总记录数

    pageNum2: 1,//当前页
    pageTotal2: 0,//总页数
    totalCount2: 0,//总记录数

    loading0:"true",//正在加载下一页,防止用户下一页未加载出来，又滑动触发上拉事件
    loading1: "true",//正在加载下一页,防止用户下一页未加载出来，又滑动触发上拉事件
    loading2: "true",//正在加载下一页,防止用户下一页未加载出来，又滑动触发上拉事件

    refreshing0: "true",//正在刷新,防止用户刷新多次
    refreshing1: "true",//正在刷新,防止用户刷新多次
    refreshing2: "true",//正在刷新,防止用户刷新多次

    height2:"0px",

    tabnavlist0:["进行中","已报名","已结束"],
    tabnavlist1: ["进行中" ,"已结束"],
    activityUrl: app.globalData.activitylist,
    tabcontentlist0:[],
    tabcontentlist1:[],
    blackHeight:0,//空白部分的高度
    sheyao:"",
    isHideLoadMore:true,
    isHideFreshMore:true,
    notHave:[],//显示没有下一页的提示
    update:0,//返回刷新

    tabcontentlist000:[
      [
        { title: "进行中活动1", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", status: 1 },
        { title: "进行中活动2", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", status: 1 },
        { title: "进行中活动3", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", status: 1 }
      ],
      [
        { title: "已报名活动1", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明", status:1 },
        { title: "已报名活动2", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明", status:1 },
        { title: "已报名活动3", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明", status: 1}
      ],
      [
        { title: "已结束活动1", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明" , status:0 },
        { title: "已结束活动2", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明" , status: 0 },
        { title: "已结束活动3", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明", status: 0 }
      ]
    ],
    tabcontentlist111: [
      [
        { title: "进行中活动1", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", status: 1 },
        { title: "进行中活动2", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", status: 1 },
        { title: "进行中活动3", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", status: 1 }
      ],
     
      [
        { title: "已结束活动1", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明", status: 0 },
        { title: "已结束活动2", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明", status: 0 },
        { title: "已结束活动3", activitydate: "2018.08.11", joindata: "2018.11.22", member: "五年级二班全体成员", username: "张小明", status: 0 }
      ]
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  testclick:function(e){
    console.log(e)
    
    this.setData({
      currentActive: e.currentTarget.dataset.current,
      isHideLoadMore:true,
      isHideFreshMore:true
    })
    wx.stopPullDownRefresh();
  },
  //滑动移动事件
  handletouchmove: function (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var text = ""
    
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0)
        text = "向左滑动"
      else if (tx > 0)
        text = "向右滑动"
    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动"
      else if (ty > 0)
        text = "向下滑动"
    }

    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
    this.setData({
      text: text,
    });
    console.log(text)
  },

  //滑动开始事件
  handletouchtart: function (event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
    console.log("开始")
    console.log(
       wx.getSystemInfoSync().windowWidth)
  },
  //滑动结束事件
  handletouchend: function (event) {
    var that = this
    this.data.currentGesture = 0;
    if(this.data.text =="向上滑动"){
      if(that.data.pageNum<that.data.pageTotal){
        that.data.pageNum=that.data.pageNum+1
        console.log(that.data.pageNum)
        if (that.data.currentActive == 1) {
          
          ajax(that.data.activityUrl).paramters({"activityState":1,"pageNumber":that.data.pageNum}).post().then(res=>{
            console.log(res.data)
            that.data.tabcontentlist0[1] = res.data.activities
            console.log("千年蛇妖")
            console.log(that.data.tabcontentlist0)
            that.setData({
              tabcontentlist0  : that.data.tabcontentlist0
            })

          }).catch(err=>{

          })


        }
      }
      
    } else if (this.data.text == "向下滑动"){
      console.log("人肉干")
    }
    this.setData({
      text: "没有滑动",
    });
    console.log("结束")
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      usertype: wx.getStorageSync("memberType"),
      update:1
      })
   


    
    

    ajax(that.data.activityUrl).paramters({"activityState": '0'}).post().then(res => { 
      console.log(res)
      that.setData({
        totalCount0: parseInt(res.totalCount),
        pageTotal0: parseInt((res.totalCount - 1) / that.data.pageSize) + 1
      })
      if (parseInt(that.data.usertype) == 1) {
        that.data.tabcontentlist0.push(that.activityTimeFormate(res.data))
      } 
      if (parseInt(that.data.usertype) == 2){
        that.data.tabcontentlist1.push(that.activityTimeFormate(res.data))
      }
      ajax(that.data.activityUrl).paramters({ "activityState": '1' }).post().then(res => { 
        console.log(res)
        that.setData({
          totalCount1:parseInt(res.totalCount),
          pageTotal1: parseInt((res.totalCount-1)/that.data.pageSize)+1
        })
        if (parseInt(that.data.usertype) == 2) {
          that.data.tabcontentlist1.push(that.activityTimeFormate(res.data))
        }
        that.setData({
          tabcontentlist1: that.data.tabcontentlist1
        })
        if (parseInt(that.data.usertype) == 1){
          that.data.tabcontentlist0.push(that.activityTimeFormate(res.data.activities))
        ajax(that.data.activityUrl).paramters({ "activityState": '2' }).post().then(res => { 
          that.setData({
            totalCount2: parseInt(res.totalCount),
            pageTotal2: parseInt((res.totalCount - 1) / that.data.pageSize) + 1
          })
            that.data.tabcontentlist0.push(that.activityTimeFormate(res.data))
          that.setData({
            tabcontentlist0: that.data.tabcontentlist0
          })
          console.log(that.data.tabcontentlist1)
        }).catch(err => {

        })}

      }).catch(err => {

      })

    }).catch(err => {

    })
   
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          blackHeight: res.windowHeight - res.windowWidth / 750 * 300
        })
      }
    })
   
  },

/**
 * 遍历出时间，进行转换
 */
activityTimeFormate:function(activities){
  var that =this
  for (var index in activities) {
    activities[index].activityStarttime = that.dateFormate(activities[index].activityStarttime)
    activities[index].applyStarttime = that.dateFormate(activities[index].applyStarttime)
    activities[index].applyEndtime = that.dateFormate(activities[index].applyEndtime)
    activities[index].activityEndtime = that.dateFormate(activities[index].activityEndtime )
  }
  return activities;
},


/**
 * 时间戳的转换
 */
dateFormate: function(number){
var date = new Date(parseInt(number));
var year= date.getFullYear();
var month =date.getMonth()+1;
var day = date.getDate();
var timeSpanStr = year + '.' + month + '.' + day;
return timeSpanStr;
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  update:function(){
    console.log(this.data.update)
    this.setData({
update:0
    })
    console.log(this.data.update)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this 
  if(that.data.update==0 ){
    console.log("进来")
    that.setData({
      tabcontentlist0: [],
      tabcontentlist1: [],
    })
    that.onLoad()
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
    var that = this
    
    if (that.data.isHideFreshMore == true){
      console.log("下拉")
      that.setData({
        isHideFreshMore:false
      })
        if (that.data.currentActive == 0) {
          if (that.data.refreshing0 == "true" ) {
            that.data.refreshing0 = "false"
            
            ajax(that.data.activityUrl).paramters({ "activityState": 0 }).post().then(res => {
              console.log(res.data)
              if (parseInt(that.data.usertype) == 1) {
                that.data.tabcontentlist0[0] = that.activityTimeFormate(res.data)
              }
              if (parseInt(that.data.usertype) == 2) {
                that.data.tabcontentlist1[0] =that.activityTimeFormate(res.data)
              }
              console.log(that.data.tabcontentlist0)
              that.setData({
                tabcontentlist0: that.data.tabcontentlist0,
                tabcontentlist1: that.data.tabcontentlist1,
                pageNum0: 1
              })
              that.data.refreshing0 = "true"
              wx.stopPullDownRefresh();
            }).catch(err => {

            })

          }
        } 
        if (that.data.currentActive == 1) {
          if (that.data.refreshing1 == "true") {
            that.data.refreshing1 = "false"
            ajax(that.data.activityUrl).paramters({ "activityState": 1 }).post().then(res => {
              console.log(res.data)
              if (parseInt(that.data.usertype) == 1) {
                that.data.tabcontentlist0[1] = that.activityTimeFormate(res.data.activities)
              }
              if (parseInt(that.data.usertype) == 2) {
                that.data.tabcontentlist1[1] = that.activityTimeFormate(res.data)
              }
              console.log(that.data.tabcontentlist0)
              that.setData({
                tabcontentlist0: that.data.tabcontentlist0,
                tabcontentlist1: that.data.tabcontentlist1,
                pageNum1: 1

              })
              that.data.refreshing1 = "true"
              wx.stopPullDownRefresh();
            }).catch(err => {

            })

          }
        }
        if (that.data.currentActive == 2) {
          
          if (that.data.refreshing2 == "true") {
            that.data.refreshing2 = "false"
            ajax(that.data.activityUrl).paramters({ "activityState": 2 }).post().then(res => {
              console.log(res.data)
              if (parseInt(that.data.usertype) == 1) {
                that.data.tabcontentlist0[2] = that.activityTimeFormate(res.data)
              }             
              console.log(that.data.tabcontentlist0)
              that.setData({
                tabcontentlist0: that.data.tabcontentlist0,          
                pageNum2: 1
              })
              that.data.refreshing2 = "true"
              wx.stopPullDownRefresh();
            }).catch(err => {

            })

          }
        }  
        
          }     
  //  wx.stopPullDownRefresh();//关闭下拉刷新
  setTimeout(function(){
    that.setData({
      isHideFreshMore: true
    })
  },1000)
    
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  console.log("千年蛇妖底部刷新")
  var that = this
  console.log(that.data.currentActive)
  if (that.data.currentActive == 0) {
    if (that.data.loading0 == "true") {
      that.data.loading0 = "false"
      if (that.data.pageNum0 < that.data.pageTotal0) {
        wx.showLoading({
          title: '玩命加载中',
        })
      }

      if (that.data.pageNum0 < that.data.pageTotal0) {
        that.data.pageNum0 = that.data.pageNum0 + 1
        ajax(that.data.activityUrl).paramters({ "activityState": 0, "pageNumber": that.data.pageNum0 }).post().then(res => {
          if (parseInt(that.data.usertype) == 1){
          that.data.tabcontentlist0[0] = that.data.tabcontentlist0[0].concat(that.activityTimeFormate(res.data))}
          if (parseInt(that.data.usertype) == 2) {
            that.data.tabcontentlist1[0] = that.data.tabcontentlist1[0].concat(that.activityTimeFormate(res.data))
          }
          that.setData({
            tabcontentlist0: that.data.tabcontentlist0,
            tabcontentlist1: that.data.tabcontentlist1,
            pageNum0: that.data.pageNum0
          })
          that.data.loading0 = "true"
          wx.hideLoading();
        }).catch(err => {

        })

      } else {
        console.log("已经是底部了")
        that.data.loading0 = "stop"
        that.setData({
          isHideLoadMore: false
        })
        setTimeout(function () {
          that.setData({
            isHideLoadMore: true,
            loading0:"true"
          })

        }, 3000)

      }
    }

  } 

      if (that.data.currentActive == 1) {
        if (that.data.loading1 == "true") {
          that.data.loading1 = "false"
          console.log("jinlai")
          if (that.data.pageNum1 < that.data.pageTotal1) {
            wx.showLoading({
              title: '玩命加载中',
            })
          }

        if (that.data.pageNum1 < that.data.pageTotal1) {
          that.data.pageNum1 = that.data.pageNum1 + 1
          ajax(that.data.activityUrl).paramters({ "activityState": 1, "pageNumber": that.data.pageNum1 }).post().then(res => {
            console.log(res.data)
            if (parseInt(that.data.usertype) == 1) {
              that.data.tabcontentlist0[1] = that.data.tabcontentlist0[1].concat(that.activityTimeFormate(res.data.activities))              
            }
            if (parseInt(that.data.usertype) == 2) {
              that.data.tabcontentlist1[1] = that.data.tabcontentlist1[1].concat(that.activityTimeFormate(res.data))
            }
            console.log(that.data.tabcontentlist0)
            that.setData({
              tabcontentlist0: that.data.tabcontentlist0,
              tabcontentlist1: that.data.tabcontentlist1,
              pageNum1: that.data.pageNum1
            })
            that.data.loading1 = "true"
            wx.hideLoading();
          }).catch(err => {
          })
        } else {
          console.log("已经是底部了")
          that.data.loading1 = "stop"
          that.setData({
            isHideLoadMore: false,
          })
          setTimeout(function () {
            that.setData({
              isHideLoadMore: true,
              loading1: "true"
            })
          }, 2000)

        }
      }
   
  } 
  
      if (that.data.currentActive == 2) {

        if (that.data.loading2 == "true") {
          that.data.loading2 = "false"
          
          if (that.data.pageNum2 < that.data.pageTotal2) {
            wx.showLoading({
              title: '玩命加载中',
            })
          }

          if (that.data.pageNum2 < that.data.pageTotal2) {
            that.data.pageNum2 = that.data.pageNum2 + 1
            ajax(that.data.activityUrl).paramters({ "activityState": 2, "pageNumber": that.data.pageNum2 }).post().then(res => {
              console.log(res.data)
              if (parseInt(that.data.usertype) == 1) {
                that.data.tabcontentlist0[2] = that.data.tabcontentlist0[2].concat(that.activityTimeFormate(res.data))
              }
              that.setData({
                tabcontentlist0: that.data.tabcontentlist0,
                pageNum2: that.data.pageNum2
              })
              that.data.loading2 = "true"
              wx.hideLoading();
            }).catch(err => {

            })

          } else {
            console.log("已经是底部了")
            that.data.loading2 = "stop"
            that.setData({
              isHideLoadMore: false,
              notHave: that.data.notHave.push(0)
            }) 

            setTimeout(function () {
              that.setData({
                isHideLoadMore: true,
                notHave: [],
                loading2 :"true"
              })

            }, 2000)

          }
        }

      } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})