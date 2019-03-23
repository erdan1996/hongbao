import Cookie from 'js-cookie'
// const token = 'token'
const getCookie = (token) => {
  return Cookie.get(token)
}
const setCookie = (token,tok) => {
  return Cookie.set(token, tok)
}
const removeCookie = () => {
  return Cookie.remove(token)
}
const cookie = {
  get: getCookie,
  set: setCookie,
  remove: removeCookie
}
export default cookie
