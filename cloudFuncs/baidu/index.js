/**
 * Created by wanpeng on 2017/3/22.
 */
var request = require('request');

var config = {
  serviceUrl : "http://api.map.baidu.com"
}

function baiduGetSubAreaList(areaCode, cbk) {
  var url = config.serviceUrl + "/shangquan/forward/?qt=sub_area_list&ext=1&level=1&areacode=" + areaCode + "&business_flag=0"
  request(url, function(error, response, body){
    var result = null
    var json = JSON.parse(body)
    if (json && json['result'] && json['result']['error'] == "0") {
      result = json['content']
    }
    if (cbk) {
      cbk(result);
    }
  });
}

function baiduGetAllCityList(areaCode, cbk) {
  var url = config.serviceUrl + "/shangquan/forward/?qt=sub_area_list&ext=1&level=2&areacode=" + areaCode + "&business_flag=0"
  request(url, function(error, response, body){
    var country = null
    var allCityList = []
    var json = JSON.parse(body)
    if (json && json['result'] && json['result']['error'] == "0") {
      country = json['content']
      var provinceList = country['sub']
      provinceList.forEach((province) => {
        if(province['area_type'] == 2)
          allCityList.push(province)
        if(province['area_type'] == 1) {
          var cityList = province['sub']
          cityList.forEach((city) => {
            if(city['area_type'] == 2)
              allCityList.push(city)
          })
        }
      })
    }
    console.log("allCityList:", allCityList)
    if (cbk) {
      cbk(allCityList);
    }
  });
}

function getSubAreaList(request, response) {
  var areaCode = request.params.areaCode
  baiduGetSubAreaList(areaCode, function (results) {
    if(results && results.sub && results.sub.length) {
      response.success(results.sub)
    }else {
      response.error("get failed!")
    }
  })
}

function getProviceList(request, response) {
  var areaCode = 1
  baiduGetSubAreaList(areaCode, function (results) {
    if(results && results.sub && results.sub.length) {
      response.success(results.sub)
    }else {
      response.error("get failed!")
    }
  })
}

function getCityList(request, response) {
  var provinceCode = request.params.provinceCode
  baiduGetSubAreaList(provinceCode, function (results) {
    if(results && results.sub && results.sub.length) {
      response.success(results.sub)
    }else {
      response.error("get failed!")
    }
  })
}

function getDistrictList(request, response) {
  var cityCode = request.params.cityCode
  baiduGetSubAreaList(cityCode, function (results) {
    if(results && results.sub && results.sub.length) {
      response.success(results.sub)
    }else {
      response.error("get failed!")
    }
  })
}

function getAllCityList(request, response) {
  var areaCode = request.params.areaCode
  baiduGetAllCityList(areaCode, function (results) {
    if(results) {
      response.success(results)
    }else {
      response.error("get failed!")
    }
  })
}

var baiduFunc = {
  getProviceList: getProviceList,
  getCityList: getCityList,
  getDistrictList: getDistrictList,
  getSubAreaList: getSubAreaList,
  getAllCityList: getAllCityList,
}

module.exports = baiduFunc