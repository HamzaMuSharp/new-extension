const setChromeState = (password, val) => {
    window.chrome.storage.sync.set({ [password]: val })
}
const getChromeState = (password, callback) => {
    window.chrome.storage.sync.get(password, callback)
}
const removeChromeState = (callback) => {

    window.chrome.storage.sync.clear(callback)

}
const getChromeStorage = () => {
    return window.chrome.storage.sync.get()
}
export { setChromeState, getChromeState, removeChromeState, getChromeStorage }