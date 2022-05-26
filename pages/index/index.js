// index.js
// 获取应用实例
import {
  rootUrl,
  getCateListApi,
  getGoodsListApi,
  getBannerListApi,
  getPhoneNameApi,
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

    tabIndex: 1,

    searchValue: "",

    searchType: 1, // 1 输入框查询 2 本机查询

    rootUrl: rootUrl,
  },
  onLoad() {
    this.getDeviceInfo();
    this.getCateList();
    this.getBannerList();
  },
  async getCateList() {
    const result = await getCateListApi();

    if (result.code !== 200) return;

    this.setData({
      tabList: result.data,
    });

    this.getGoodsList();
  },
  async getGoodsList() {
    const data = {
      cate_id: this.data.tabIndex,
    };

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
});
