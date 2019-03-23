import {
  Toast
} from 'vant'
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
} from './storage'
export const catchError = () => {
  Toast({
    message: '请稍后再试',
    duration: 1000,
    forbidClick: true
  })
}

export const toast = (msg, time = 1000) => {
  Toast({
    message: msg,
    duration: time,
    forbidClick: true
  })
}
// code获取时间
export async function codeTime (fn) {
  // const defaultTime = 4 * 60 * 1000
  const now = +new Date()
  const time = JSON.parse(getLocalStorage('CODE_LOSE_EFFICACY'))
  if (time == null) {
    fn().then((res) => {
      setLocalStorage('CODE_LOSE_EFFICACY', JSON.stringify(now))
      return res
    })
  } else {
    removeLocalStorage('CODE_LOSE_EFFICACY')
    fn().then((res) => {
      setLocalStorage('CODE_LOSE_EFFICACY', JSON.stringify(now))
      return res
    })
  }
}
// 字符截断
export const ellipsis = (obj, size) => {
  if (obj.length > 0) {
    return obj.length > size ? obj.substring(0, size - 3) + '...' : obj
  }
}
