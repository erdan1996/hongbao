export function getLocalStorage (prop) {
  return localStorage.getItem(prop)
}

export function setLocalStorage (propname, prop) {
  return localStorage.setItem(propname, prop)
}

export function removeLocalStorage (propname) {
  return localStorage.removeItem(propname)
}
