const md5 = require('blueimp-md5')
function _md5(token) {
  const key = 'helloWorld!'
  return md5(token, key)
}
module.exports = {
  _md5
}
