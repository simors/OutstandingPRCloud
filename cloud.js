var AV = require('leanengine');
var authFunc = require('./cloudFuncs/Auth')

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define('prModifyMobilePhoneVerified', authFunc.modifyMobilePhoneVerified)
AV.Cloud.define('prGetUserinfoById', authFunc.getUserinfoById)
AV.Cloud.define('prSetUserNickname', authFunc.setUserNickname)


