// index.js
// 获取应用实例
import { getCateListApi, getGoodsListApi } from "../../api/api";

Page({
  data: {
    imgSrcs: [
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner3.png",
        text: "1",
      },
      {
        img: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner2.png",
        text: "2",
      },
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
  },
  onLoad() {
    this.getDeviceInfo();
    this.getCateList();
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
  getDeviceInfo() {
    const deviceInfo = wx.getDeviceInfo();
    const { model } = deviceInfo;

    this.setData({ phoneModal: model });
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
