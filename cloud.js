var AV = require('leanengine');
var authFunc = require('./cloudFuncs/Auth')
var baiduFunc = require('./cloudFuncs/baidu')

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define('prModifyMobilePhoneVerified', authFunc.modifyMobilePhoneVerified)
AV.Cloud.define('prGetUserinfoById', authFunc.getUserinfoById)
AV.Cloud.define('prSetUserNickname', authFunc.setUserNickname)

AV.Cloud.define('prGetSubAreaList', baiduFunc.getSubAreaList)
AV.Cloud.define('prGetProviceList', baiduFunc.getProviceList)
AV.Cloud.define('prGetCityList', baiduFunc.getCityList)
AV.Cloud.define('prGetDistrictList', baiduFunc.getDistrictList)
AV.Cloud.define('prGetAllCityList', baiduFunc.getAllCityList)

