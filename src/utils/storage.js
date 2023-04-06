const setChromeState = (val) => {
    window.chrome.storage.sync.set({ "mySecretKey": val })

}
const getChromeState = (callback) => {

    window.chrome.storage.sync.get("mySecretKey", callback)
}
const removeChromeState = (callback) => {

    window.chrome.storage.sync.remove(["mySecretKey"], callback)

}
export { setChromeState, getChromeState, removeChromeState }