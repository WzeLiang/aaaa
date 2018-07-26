// pages/personal/addrelation/addrelation.js
const app = getApp()
import ajax from '../../../utils/request';
import { pageTo } from '../../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantlisturl: app.globalData.my_merchantlist,
    studentaddurl: app.globalData.my_parent_studentadd,
    reSubmitTokenurl: app.globalData.reSubmitToken,
    // schoolarray: ['请选择>', '上海第一人民小学', '星星幼儿园'],
    schoolarray:[],
    parentarray: ['请选择>', '父亲', '母亲' , "爷爷" , "奶奶" , "其他"],
    schoolindex: 0,
    parentindex:0,
    showMessage: false,
    messageContent: '',
    merchantId:"",
    merchantName:"",
    reSubmitToken:''
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
  schoolSelected:function(e){
    console.log(e)
    this.setData({
      schoolindex: e.detail.value,
      merchantId: this.data.schoolarray[e.detail.value].id,
      merchantName: this.data.schoolarray[e.detail.value].merchantName,
    });
    console.log(this.data.merchantId);
  },
  parentSelected:function(e){
    this.setData({
      parentindex: e.detail.value
    });
    console.log(this.data.parentindex)
  },

  addrelationsubmit: function (e) {
    //console.log(e.detail.value);
    var formdata = e.detail.value;
    var form = {
      //"reSubmitToken": this.data.reSubmitToken,
      "studentName": formdata.studentName,
      "studentNumber": formdata.studentNumber,
      "merchantId": this.data.merchantId,
      "relationType": formdata.parentindex,
      "remark": formdata.remark
    }
    console.log(form)
    if (formdata.studentName == "") {
      this.showMessage('请输入学生姓名');
    } else if (formdata.studentName == '') {
      this.showMessage('请输入学生编号');
    } else if (formdata.parentindex == 0) {
      this.showMessage('请选择关系');
    }  else {
      //调用接口
      ajax(this.data.studentaddurl).paramters(form).post().then(res => {
      console.log(res)
       this.showMessage('关联成功');
       setTimeout(function () {
         //要延时执行的代码 
         wx.navigateBack({

         })
       }, 1500) //延迟时间 这里是1秒  
  
      }).catch(err => {
        console.log(err)
          // if (err.data.respCode=="400"){
          //   console.log(err.data)
          //   this.showMessage("信息错误,请核对信息!");
          // }
      })
    }
  },
  //查找商户学校列表
  getmerchantlist: function () {
    ajax(this.data.merchantlisturl).paramters({}).post().then(res => {
       console.log(res.data);
      this.setData({
        schoolarray:res.data

      })
    }).catch(err => {

    })
  },
  getreSubmitToken:function(){
    ajax(this.data.reSubmitTokenurl).paramters({}).post().then(res => {
      console.log(res.data);
      this.setData({
        reSubmitToken: res.data.reSubmitToken
      })
      wx.setStorageSync('reSubmitToken', res.data.reSubmitToken);
    }).catch(err => {

    })
  },
  onLoad: function (options) {

    this.getmerchantlist()
    this.getreSubmitToken()
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