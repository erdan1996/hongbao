import commonWx from './wx'
import api from '../../index'

export default function _initShare (prop) {
  api.share[prop]()
    .then(getShareInfoSucc)
}
function getShareInfoSucc (res) {
  res = res.data
  if (res.code === api.CODE_OK && res.data) {
    const data = res.data
    const url = window.location.href
    commonWx.onMenuShareAppMessage(data.friends_title, url, data.friends_logo, data.friends_desc)
    commonWx.onMenuShareTimeline(data.circle_title, url, data.circle_logo, data.circle_desc)
  }
}
