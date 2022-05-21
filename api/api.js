const rootUrl = "http://120.76.132.111/api";

import { request } from "./request";

const getCateListApi = () => {
  return request(`${rootUrl}/Goods/getCateList`, {}, "get");
};
const getGoodsListApi = (data) => {
  return request(`${rootUrl}/Goods/getGoodsList`, data, "post", {
    contentType: "form",
  });
};

module.exports = {
  getCateListApi,
  getGoodsListApi,
};
