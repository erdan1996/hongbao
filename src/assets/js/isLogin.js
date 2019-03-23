import api from "@/api/index"
/**
 * 登录判定
 * @param {path} 记录当前路径
 * @param {next} 登陆后执行的函数next()
 */
export const isLogin = () => {
  api.accredit.accreditLogin("/wap/#/author")
}
