/* global chrome*/
// import CryptoJS from "./crypto-js"


// chrome.browserAction.onClicked.addListener(function (tab) {
//     // Perform an action when the button is clicked, e.g., send a message to the content script
//     chrome.tabs.sendMessage(tab.id, { message: "Hello from the extension!" });
// });

// navigator.serviceWorker.register('background.js').then((registration) => {
//     console.log('Service Worker registered with scope:', registration.scope);
// }).catch((error) => {
//     console.error('Service Worker registration failed:', error);
// });

const generateSecret = () => {
    return Math.random().toString(36).substring(2, 15)
}
const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}

const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}

const staticKey = "MySecretKey@1"

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.windows.getCurrent({ populate: true }, function (currentWindow) {
            var left = Math.round((currentWindow.width - 300) / 2);
            var top = Math.round((currentWindow.height - 300) / 2);

            chrome.windows.create({
                url: chrome.runtime.getURL('index.html'),
                type: 'popup',
                width: 300,
                height: 300,
                left: left + currentWindow.left,
                top: top + currentWindow.top
            })
        })
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "generateKey") {
        // Use the CryptoJS object here
        const secretkey = generateSecret()
        const encryptedText = cipher(staticKey)(secretkey)
        console.log(encryptedText, "encryptedText")
        chrome.storage.sync.set({ [message.password]: encryptedText })
        const decryptedText = decipher(staticKey)(encryptedText)
        sendResponse(decryptedText);
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

        return true; // Return true to indicate that sendResponse will be called asynchronously
    }
    else if (message.action === "decrypt") {
        const decryptedText = decipher(staticKey)(message.key)
        sendResponse(decryptedText);
        return true;
    }
});

// self.oninstall = () => {
//     // The imported script shouldn't do anything, but only declare a global function
//     // (someComplexScriptAsyncHandler) or use an analog of require() to register a module
//     tryImport('/js/some-complex-script.js');
//   };

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message, "message")
//     sendResponse("message")
// });