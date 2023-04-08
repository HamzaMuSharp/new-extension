/* global chrome*/
import CryptoJS from "crypto-js";

const staticKey = "MySecretKey@1"
const generateSecret = () => {
    return Math.random().toString(36).substring(2, 15)
}

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.windows.getCurrent({ populate: true }, function (currentWindow) {
            var left = Math.round((currentWindow.width - 300) / 2);
            var top = Math.round((currentWindow.height - 300) / 2);

            chrome.windows.create({
                url: chrome.runtime.getURL('index.html'),
                type: 'popup',
                width: 300,
                height: 340,

                left: left + currentWindow.left,
                top: top + currentWindow.top
            })
        })
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "generateKey") {
        const secretkey = generateSecret()
        const encryptedText = CryptoJS.AES.encrypt(secretkey, staticKey).toString();
        chrome.storage.sync.set({ [message.password]: encryptedText })
        const decryptedText = CryptoJS.AES.decrypt(
            encryptedText,
            staticKey
        ).toString(CryptoJS.enc.Utf8);
        sendResponse({ encryptedText: encryptedText, decryptedText: decryptedText });
        return true
    }
    else if (message.action === "reset") {
        chrome.storage.sync.clear((res) => {
            sendResponse(res);
        });
        return true;
    }
    else if (message.action === "getState") {
        chrome.storage.sync.get(null, (res) => {                   //null means to return whole chrome storage but if we specify a password(key) it will only return the value of that property
            sendResponse(res);
        });

        return true;
    }
    else if (message.action === "decrypt") {
        const decryptedText = CryptoJS.AES.decrypt(
            message.key,
            staticKey
        ).toString(CryptoJS.enc.Utf8);
        sendResponse(decryptedText);
        return true;
    }
});
