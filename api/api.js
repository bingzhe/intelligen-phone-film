// 每次修改 1. appid 2.title 3.url 4.后台添加调用的https 5.分享标题修改
const rootUrl = "https://kamoniu.shouchuangtx.cn"; //卡陌牛 wxb68105ba7874703c
// const rootUrl = "https://kediya.5aiyin.com"; //科迪亚 wxdfe38c922cea1383
// const rootUrl = "https://muwa.5aiyin.com" //M.SIR大猩猩钢化膜(牧娃光电) wx41c12753b533b095 

import { request } from "./request";

const getCateListApi = () => {
  return request(`${rootUrl}/api/Goods/getCateList`, {}, "get");
};
const getGoodsListApi = (data) => {
  return request(`${rootUrl}/api/Goods/getGoodsList`, data, "post", {
    contentType: "form",
  });
};
const getBannerListApi = () => {
  return request(`${rootUrl}/api/Index/getBanner`, {}, "get");
};
const getPhoneNameApi = (data) => {
  return request(`${rootUrl}/api/Index/getPhoneName`, data, "post", {
    contentType: "form",
  });
};

module.exports = {
  rootUrl,
  getCateListApi,
  getGoodsListApi,
  getBannerListApi,
  getPhoneNameApi,
};
