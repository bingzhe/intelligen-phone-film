// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    imgSrcs: [
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner1.png",
        text: "1",
      },
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner2.png",
        text: "2",
      },
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner3.png",
        text: "3",
      },
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner4.png",
        text: "4",
      },
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner5.png",
        text: "5",
      },
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner6.png",
        text: "6",
      },
    ],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    navigation: { type: "dots" },

    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
