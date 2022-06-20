// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });

    wx.getSystemInfo({
      success: (res) => {
        self.globalData.version = res.version;
        self.globalData.SDKVersion = res.SDKVersion;
        self.globalData.pxMulti = 750 / res.windowWidth;
        let flag = self.compareVersion(self.globalData.version, "7.0.0") >= 0;
        // console.log(flag, 1111)
        // flag,
        //   "是否显示自定义导航栏",
        //   self.compareVersion(self.globalData.version, "7.0.0") >= 0,
        //   self.compareVersion(self.globalData.version, "7.0.0");
        if (res.brand == "devtools") {
          //说明在开发工具上
          flag = true;
        }
        if (flag) {
          // 是否使用自定义导航栏
          self.globalData.showNavStatus = true;
          // 导航高度
          self.globalData.navHeight = res.statusBarHeight + 46;
          const { system, model } = res;
          // this.navbar.statusbarHeight = res.statusBarHeight;

          if (system.indexOf("Android") >= 0) {
            this.navbar.system = "android";
            this.navbar.title_height = 70;
          } else {
            this.navbar.system = "ios";
            if (model.indexOf("X") >= 0) {
              this.navbar.title_height = 94;
              this.navbar.system = "iosX";
            } else {
              this.navbar.title_height = 70;
            }
            if (model.indexOf("8 Plus") >= 0) {
              this.navbar.phoneModel = "ios8p";
            }
          }
        } else {
          this.navbar.title_height = 0;
          this.navbar.statusbarHeight = 0;
        }
      },
      fail(err) {
        self.globalData.systemInfo = {};
      },
    });

    const app = this;
    let systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;

    let ios = !!(systemInfo.system.toLowerCase().search("ios") + 1);
    let rect;
    try {
      rect = wx.getMenuButtonBoundingClientRect
        ? wx.getMenuButtonBoundingClientRect()
        : null;
      if (rect === null) {
        throw "getMenuButtonBoundingClientRect error";
      }
    } catch (error) {
      let gap = ""; //胶囊按钮上下间距 使导航内容居中
      let width = 96; //胶囊的宽度
      if (systemInfo.platform === "android") {
        gap = 8;
        width = 96;
      } else if (systemInfo.platform === "devtools") {
        if (ios) {
          gap = 5.5; //开发工具中ios手机
        } else {
          gap = 7.5; //开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }
      if (!systemInfo.statusBarHeight) {
        //开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight =
          systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }
      rect = {
        //获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width,
      };
    }

    let navBarHeight = "";
    if (!systemInfo.statusBarHeight) {
      systemInfo.statusBarHeight =
        systemInfo.screenHeight - systemInfo.windowHeight - 20;
      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + rect.height;
      })();

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0; //下方扩展4像素高度 防止下方边距太小
    } else {
      navBarHeight = (function () {
        let gap = rect.top - systemInfo.statusBarHeight;

        return systemInfo.statusBarHeight + 2 * gap + rect.height;
      })();
      if (ios) {
        systemInfo.navBarExtendHeight = 4; //下方扩展4像素高度 防止下方边距太小
      } else {
        systemInfo.navBarExtendHeight = 0;
      }
    }

    systemInfo.navBarHeight = navBarHeight; //导航栏高度不包括statusBarHeight
    systemInfo.capsulePosition = rect; //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
    systemInfo.ios = ios; //是否ios

    this.globalSystemInfo = systemInfo; //将信息保存到全局变量中,

    (this.navbar.title_height =
      this.globalSystemInfo.navBarHeight +
      app.globalSystemInfo.navBarExtendHeight),
      (this.navbar.statusbarHeight = this.globalSystemInfo.capsulePosition.top);
  },
  compareVersion: function (v1, v2) {
    v1 = v1.split(".");
    v2 = v2.split(".");
    var len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push("0");
    }
    while (v2.length < len) {
      v2.push("0");
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i]);
      var num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
    return 0;
  },
  globalData: {
    systemInfo: {},
    userInfo: null,
    pxMulti: 2,
  },
  navbar: {
    title_height: "70", //自定义导航栏的总高度，单位为px
    statusbarHeight: "24", //胶囊头部距离导航栏头部的高度，单位为px
    titleIcon_height: "32",
    titleIcon_width: "87",
    title_top: "24",
    title_text: "", // iphone X + 24
    prefix: 24,
    system: "ios",
    phoneModel: "",
  },
});
