// 每次修改 1. appid 2.title 3.url 4.后台添加调用的https 5.分享标题修改
// const rootUrl = "https://kamoniu.shouchuangtx.cn"; //1 卡陌牛 wxb68105ba7874703c
// const rootUrl = "https://kediya.5aiyin.com"; //2 科迪亚 (钢化膜平台) wxdfe38c922cea1383
// const rootUrl = "https://muwa.5aiyin.com" //3 M.SIR大猩猩钢化膜 (牧娃光电) wx41c12753b533b095 
// const rootUrl = "http://120.76.132.111" //4 xooxi 小犀 (xooxi 小犀) wx1008b8937e936d05 
// const rootUrl = "http://120.76.132.111:39001" //5 鲁利亚 (鲁利亚数码科技) wx76e8697154f174d5 
const rootUrl = "http://120.76.132.111:39232" //6 通用大全 (手机钢化膜通用大全) wx93d526d75a650990 

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
