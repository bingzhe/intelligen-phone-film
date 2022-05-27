// const rootUrl = "https://kamoniu.shouchuangtx.cn"; //卡陌牛 wxb68105ba7874703c
const rootUrl = "https://kediya.5aiyin.com"; //科迪亚 wxdfe38c922cea1383

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
