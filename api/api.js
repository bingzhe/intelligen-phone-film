// 每次修改 1. appid 2.title 3.url 4.后台添加调用的https 5.分享标题修改
// const rootUrl = "https://kamoniu.shouchuangtx.cn"; //1 卡陌牛 wxb68105ba7874703c
const rootUrl = "https://kediya.5aiyin.com"; //2 科迪亚 (钢化膜平台) wxdfe38c922cea1383
// const rootUrl = "https://muwa.5aiyin.com" //3 M.SIR大猩猩钢化膜 (牧娃光电) wx41c12753b533b095 
// const rootUrl = "https://xooxi.5aiyin.com" //4 xooxi 小犀 (xooxi 小犀) wx1008b8937e936d05 
// const rootUrl = "https://szglauke.scnczy.com" //5 鲁利亚 (鲁利亚数码科技) wx76e8697154f174d5 
// const rootUrl = "http://120.76.132.111:39232" //6 通用大全 (手机钢化膜通用大全) wx93d526d75a650990 
// const rootUrl = "http://120.76.132.111:39856" //7 蓝小猩保护膜 (蓝小猩保护膜) wx1596a7a03d23a332 
// const rootUrl = "http://120.76.132.111:39888" //8 鑫桦宇数码科技 (鑫桦宇数码科技有限公司) wx75f72a7a5f898669 
// const rootUrl = "http://120.76.132.111:39555" //9 和兴电子科技 (和兴电子科技) wx157122f47fc97d44 
// const rootUrl = "http://120.76.132.111:39111" //10 八彩科技 (八彩科技) wx436aef36b863a15e 





import { request } from "./request";

const getCateListApi = () => {
  return request(`${rootUrl}/api/Goods/getCateList`, {}, "get");
};
const getGoodsListApi = (data) => {
  return request(`${rootUrl}/api/Goods/getGoodsList1`, data, "post", {
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
