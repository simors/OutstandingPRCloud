var AV = require('leanengine');

function modifyMobilePhoneVerified(request, response) {
  var user = AV.Object.createWithoutData('_User', request.params.id)
  user.set("mobilePhoneVerified", true)
  user.save()
  response.success()
}

function getUserinfoById(request, response) {
  var userId = request.params.userId
  var query = new AV.Query('_User')
  var rsp = {
    error: 0,     // 正常返回
  }
  query.get(userId).then((result) => {
    var user = result.attributes
    var userInfo = {
      id: result.id,
      nickname: user.nickname ? user.nickname : user.mobilePhoneNumber,
      phone: user.mobilePhoneNumber,
      avatar: user.avatar,
      city: user.city,
      birthday: user.birthday,
      industry: user.industry,
      name: user.username,
      organization: user.organization,
      profession: user.profession,
    }
    rsp.userInfo = userInfo
    response.success(rsp)
  }).catch((error) => {
    response.error({error: error.code})
  })
}

function getUsers(request, response) {
  var userIds = request.params.userIds
  var query = new AV.Query('_User')
  var rsp = {
    error: 0,     // 正常返回
    users: [],
  }
  query.containedIn('objectId', userIds)
  query.find().then(function (result) {
    result.forEach((userRes) => {
      var user = userRes.attributes
      var userInfo = {
        id: userRes.id,
        nickname: user.nickname ? user.nickname : user.mobilePhoneNumber,
        phone: user.mobilePhoneNumber,
        avatar: user.avatar,
        gender: user.gender,
        birthday: user.birthday,
        identity: user.identity,
      }
      rsp.users.push(userInfo)
    })
    response.success(rsp)
  }).catch((error) => {
    response.error({error: error.code})
  })
}

function setUserNickname(request, response) {
  var userId = request.params.userId
  var nickname = request.params.nickname
  var user = AV.Object.createWithoutData('_User', userId)
  user.set('nickname', nickname)
  user.save().then(() => {
    response.success({
    errcode: 0,
  })
}, (err) => {
    response.error({
      errcode: -1,
    })
  })
}

var authFunc = {
  modifyMobilePhoneVerified: modifyMobilePhoneVerified,
  getUserinfoById: getUserinfoById,
  getUsers: getUsers,
  setUserNickname: setUserNickname,
}

module.exports = authFunc