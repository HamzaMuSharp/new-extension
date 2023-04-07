/* global chrome*/


const setChromeState = (password, val) => {
    return chrome.storage.sync.set({ [password]: val })
}
const removeChromeState = () => {
    return chrome.storage.sync.clear()
}
const getChromeState = () => {
    return chrome.storage.sync.get()
}
export { setChromeState, removeChromeState, getChromeState }