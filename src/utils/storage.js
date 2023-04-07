const setChromeState = (password, val) => {
    window.chrome.storage.sync.set({ [password]: val })
}
const removeChromeState = (callback) => {

    window.chrome.storage.sync.clear(callback)

}
const getChromeState = () => {
    return window.chrome.storage.sync.get()
}
export { setChromeState, removeChromeState, getChromeState }