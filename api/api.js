const rootUrl = "http://120.76.132.111";

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
