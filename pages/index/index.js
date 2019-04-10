// pages/index/index.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '',
    sliderList: [
      { selected: true, imageSource: 'http://up.enterdesk.com/edpic/7d/35/13/7d3513ecabdf1f7eb4f1407f0e82f23c.jpg' },
      { selected: false, imageSource: '../../images/2.jpg' },
      { selected: false, imageSource: 'http://pic1.win4000.com/wallpaper/9/538544be6ae36.jpg' },
    ],
    today: "",
    inTheaters: {},
    containerShow: true,
    weatherData: '',
    air: '',
    dress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //更新当前日期
     app.globalData.day = util.formatTime(new Date()).split(' ')[0];
     this.setData({
       today: app.globalData.day
     });
    // 定位
    this.getLocation();
  },
//轮播图绑定change事件，修改图标的属性是否被选中
  switchTab: function (e) {
    var sliderList = this.data.sliderList;
    var i, item;
    for (i = 0; item = sliderList[i]; ++i) {
      item.selected = e.detail.current == i;
    }
    this.setData({
      sliderList: sliderList
    });
  },
  //定位当前城市
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //当前的经度和纬度
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?`,
          data: {
            "key" : "JNBBZ-KLTKJ-LOZF6-KGWBS-6KVNH-4EBKU",
            "location" : `${latitude},${longitude}`
          },
          method: 'GET',
          success: res => {
            app.globalData.defaultCity = res.data.result.ad_info.city;
            that.setData({
              location: app.globalData.defaultCity,
            });
            that.getWeather();
            // that.getAir();
          }
        })
      }
    })
  },
  getWeather:function(e){
    var length = this.data.location.length;
    var city = this.data.location.slice(0, length-1); //分割字符串
   
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    //发出请求
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/weather",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        app.globalData.weatherData = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0];
        var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
        var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : { txt: "暂无该城市天气信息"};
        that.setData({
          weatherData: weatherData, //今天天气情况数组 
          dress: dress //生活指数
        });
      }
    })
  },
  // getAir:function(){

  // },

})