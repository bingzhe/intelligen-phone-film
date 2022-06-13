// index.js
// 获取应用实例
import {
  rootUrl,
  getCateListApi,
  getGoodsListApi,
  getBannerListApi,
  getPhoneNameApi,
  getAnnouncementApi,
} from "../../api/api";

Page({
  data: {
    imgSrcs: [
      // {
      //   img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner3.png",
      //   text: "1",
      // },
    ],
    tabList: [],
    list: [],

    //swiper
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    navigation: { type: "dots" },

    phoneModal: "",

    tabIndex: 100,
    showBottomLine: true,

    searchValue: "",

    searchType: 2, // 1 输入框查询 2 本机查询

    rootUrl: rootUrl,

    showNotice: false,
    text: "",
    animation: null,
    timer: null,
    duration: 0,
    textWidth: 0,
    wrapWidth: 0,
  },
  onLoad() {
    this.getDeviceInfo();
    this.getCateList();
    this.getBannerList();
    this.getAnnouncement();
  },
  onShow() {
    if (this.data.text) {
      this.initAnimation(this.data.text);
    }
  },
  onHide() {
    this.destroyTimer();
    this.setData({
      timer: null,
    });
  },
  onUnload() {
    this.destroyTimer();
    this.setData({
      timer: null,
    });
  },
  onShareAppMessage() {
    // return {
    //   title: "卡陌牛 卡陌牛守护您的爱机",
    // };
  },
  onShareTimeline() {
    // return {
    //   title: "卡陌牛 卡陌牛守护您的爱机",
    // };
  },
  async getCateList() {
    const result = await getCateListApi();

    if (result.code !== 200) return;

    this.setData({
      tabList: result.data,
    });

    const firstCateId = (result.data[0] || {}).cate_id;

    if (firstCateId) {
      this.setData({
        tabIndex: firstCateId,
      });
    }

    this.getGoodsList();
  },
  async getGoodsList() {
    const data = {
      // cate_id: this.data.tabIndex,
    };

    if (this.data.tabIndex !== 100) {
      data.cate_id = this.data.tabIndex;
    }

    if (this.data.searchType == 1 && this.data.searchValue) {
      data.name = this.data.searchValue;
    }

    if (this.data.searchType == 2 && this.data.phoneModal) {
      data.name = this.data.phoneModal;
    }

    const result = await getGoodsListApi(data);
    if (result.code !== 200) return;

    this.setData({
      list: result.data,
    });
  },
  async getBannerList() {
    const result = await getBannerListApi();
    if (result.code !== 200) return;

    const list = (result.data || []).map((item) => {
      return {
        ...item,
        img: `${rootUrl}${item.img_url}`,
        text: item.id,
      };
    });

    this.setData({
      imgSrcs: list,
    });
  },
  async getDeviceInfo() {
    const deviceInfo = wx.getDeviceInfo();

    let model = deviceInfo.model;
    const system = deviceInfo.system;

    //单独处理 iPhone XS Max China-exclusive<iPhone11,6>
    model = model.replace(/China-exclusive/gm, "");

    //如果是ios,单独处理下里面的尖括号
    let ios = !!(system.toLowerCase().search("ios") + 1);
    if (ios) {
      model = model.replace(/\((\S*?)\)<(\S*?)>/gm, "");
      model = model.replace(/<(\S*?)>/gm, "");
    }

    const params = {
      name: model,
    };

    const result = await getPhoneNameApi(params);

    const phoneModal = result.data ? result.data : model;

    this.setData({ phoneModal: phoneModal });
  },

  handleSearchClick() {
    this.setData({
      searchType: 1,
    });
    this.getGoodsList();
  },
  handleSearchCus() {
    this.setData({
      searchType: 2,
    });
    this.getGoodsList();
  },
  tabChangeHandle(e) {
    this.setData({ tabIndex: e.detail.value });
    this.getGoodsList();
  },
  async getAnnouncement() {
    const result = await getAnnouncementApi();

    const list = result.data || [];

    if (list.length > 0) {
      this.setData({
        showNotice: true,
      });
    }

    const text = list
      .map((item, i) => `${i + 1}：${item.content}  `)
      .join(" ");

    this.setData({
      text: text,
    });

    this.initAnimation(this.data.text);

    console.log(result);
  },
  /**
   * 开启公告字幕滚动动画
   * @param  {String} text 公告内容
   * @return {[type]}
   */
  initAnimation(text) {
    let that = this;
    this.data.duration = 30000;
    this.data.animation = wx.createAnimation({
      duration: this.data.duration,
      timingFunction: "linear",
    });
    let query = wx.createSelectorQuery();
    query.select(".content-box").boundingClientRect();
    query.select("#text").boundingClientRect();
    query.exec((rect) => {
      that.setData(
        {
          wrapWidth: rect[0].width,
          textWidth: rect[1].width,
        },
        () => {
          this.startAnimation();
        }
      );
    });
  },
  // 定时器动画
  startAnimation() {
    //reset
    // this.data.animation.option.transition.duration = 0
    const resetAnimation = this.data.animation
      .translateX(this.data.wrapWidth)
      .step({ duration: 0 });
    this.setData({
      animationData: resetAnimation.export(),
    });
    // this.data.animation.option.transition.duration = this.data.duration
    const animationData = this.data.animation
      .translateX(-this.data.textWidth)
      .step({ duration: this.data.duration });
    setTimeout(() => {
      this.setData({
        animationData: animationData.export(),
      });
    }, 100);
    const timer = setTimeout(() => {
      this.startAnimation();
    }, this.data.duration);
    this.setData({
      timer,
    });
  },
  destroyTimer() {
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
  },
});
