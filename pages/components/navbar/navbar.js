// pages/component/navbar.js
const app = getApp();

Component({
  properties: {
    showIcon: {
      // 是否显示图标
      type: Boolean,
      value: true,
    },
    isHome: {
      type: Boolean, //是否为首页
      value: false,
    },
    showHome: {
      // 是否显示返回首页图标
      type: Boolean,
      value: false,
    },
    title_text: {
      //当前页的名字
      type: String,
      value: app.navbar.title_text,
    },
    pageType: {
      //页面过来的路径  home  parts
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBack: false,
    system: app.navbar.system,
    titleIcon_height: app.navbar.titleIcon_height,
    titleIcon_width: app.navbar.titleIcon_width,
    title_top: app.navbar.title_top,
    title_height:
      app.globalSystemInfo.navBarHeight +
      app.globalSystemInfo.navBarExtendHeight,
    statusbarHeight: app.globalSystemInfo.capsulePosition.top,
    showIcon: true,
    // showNavStatus: app.globalData.showNavStatus,
    showNavStatus: true,
    isCompatibleExtend: false,
  },

  /**
   * 组件的方法列表
   */

  lifetimes: {
    attached(e) {
      const pages = getCurrentPages(),
        currentPages = pages[pages.length - 1];
      if (pages.length > 1) {
        this.setData({ showBack: true });
        this.setData({ showHome: false });
      } else {
        if (this.data.currentPage == 3) {
          this.setData({ showHome: false });
        } else {
          this.setData({ showHome: true });
        }
      }
    },
  },
  methods: {
    _goBack: function () {
      wx.navigateBack({
        delta: 1,
      });
    },
  },
});
