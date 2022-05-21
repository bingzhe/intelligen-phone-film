function request(url, data = {}, method = "GET", options = {}) {
  //options.loadingHidden 表示是否显示请求加载动画，默认需要显示，如果不需要显示，loadingHidden字段传true即可
  if (!options.loadingHidden) {
    wx.showLoading({
      mask: true,
    });
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        //content-Type类型
        "content-Type":
          options.contentType == "form"
            ? "application/x-www-form-urlencoded"
            : "application/json;charset=UTF-8",
      },
      success: function (res) {
        !options.loadingHidden && wx.hideLoading();

        if (res.data.code == 200) {
          resolve(res.data);
        } else {
          reject(res);
          //请求失败
          wx.showToast({
            //TODO 错误信息
            title: `请求失败：${res.data.msg ? res.data.msg : "请联系我们"}`,
            // title:'?'+res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      },
      fail: function (err) {
        !options.loadingHidden && wx.hideLoading();
        reject("服务器连接异常，请检查网络再试");
      },
    });
  });
}

module.exports = {
  request,
};
