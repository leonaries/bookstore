// pages/my/my.js
import {BookModel} from '../../models/book.js'
import {ClassicModel} from '../../models/classic.js'
const bookModel =new BookModel()
const classicModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMyFavor()
    this.getMyBookCount()
  },

  //获取喜欢的书数量
  getMyBookCount(){
    bookModel.getMyBookCount().then(res =>{
      this.setData({
        bookCount:res.count
      })
    })
  },

  //判断小程序是否得到用户授权 然后再获取用户信息
  userAuthorized(){
    wx.getSetting({
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data=>{
              this.setData({
                authorized:true,
                userInfo:data.userInfo
              })
            }
          })
        }
      }
    })
  },
  //获取用户信息
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    if(userInfo)
      this.setData({
        authorized: true,
        userInfo: userInfo
    })
  },

  //点击关于我们
  onJumpToAbout(e){
    // wx.navigateTo({
    //   url: '/pages/about/about'
    // })
  },
  //获取我喜欢的期刊
  getMyFavor(){
    classicModel.getMyFavor(res =>{
      this.setData({
        classics:res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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