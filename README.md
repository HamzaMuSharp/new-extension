# React Chrome Extension for Secret Key Generation

This is a React-based Chrome browser extension that generates and stores a user's secret key. The extension consists of four files: Auth.js, SecretManager.js, Signup.js, and Signin.js.

# File 1: Auth.js

This is the main component that acts as the entry point for the authentication flow. It imports other components such as SecretManager, Signin, and Signup, as well as Redux hooks (useDispatch) from the Redux library. It also imports an action setKey from a Redux slice called keySlice.
Inside the Auth component, there are several states defined using the useState hook, including decryptkey, isInitialised, and keyPassword, which manage the decrypted key, initialization status, and password for generating the key, respectively. It also initializes a Redux dispatch function using useDispatch.

The Auth component contains two main functions: generateKey and resetDecryptKey. generateKey is called when the user submits a form to generate a secret key. It sends a message to the Chrome Extension background script with the action 'generateKey' and the password, and sets the decrypted key in the state using setdecryptkey hook. resetDecryptKey is a callback function that resets the decryptkey state and the isInitialised state.

The Auth component also includes two useEffect hooks. The first one monitors changes in the decryptkey state and sends a message to the Chrome Extension background script to get the current state. If the state has any data, it sets the isInitialised state to true, otherwise, it sets it to false. The second useEffect hook listens for changes in the Chrome storage and dispatches the setKey action with the new value or an empty object to update the Redux store accordingly.

The Auth component returns conditional rendering of the SecretManager, Signin, or Signup components based on the values of decryptkey and isInitialised states.

# File 2: SecretManager.js

This is a component that displays the decrypted secret key and provides options to regenerate the key or logout. It receives callback functions resetDecryptKey and generateKey as props, which are called when the logout or regenerate key buttons are clicked, respectively.

# File 3: Signin.js

This is a component that displays a form for users to enter their password to sign in. It uses the useState hook to manage the password and error state. It receives callback functions decryptkey, resetDecryptKey, and setKeyPassword as props, which are called when the form is submitted or the reset button is clicked. It sends a message to the Chrome Extension background script to get the encrypted secret key for the entered password, and if the key is found, it calls the decryptkey callback with the decrypted key, and sets the password in the state using setKeyPassword hook.

# File 4: Signup.js

Signup.js: This is a component that displays a form for users to enter their password and confirm password to sign up and generate a secret key. It uses the useState hook to manage the password, confirmPassword, and error state. It receives the generateKey callback as a prop, which is called when the form is submitted. It checks if the password and confirmPassword match, and if so, it calls the generateKey callback with the form data.

Overall, these files work together to implement an authentication flow in a React application using Redux and Chrome Extension APIs. The Auth component is the main entry point that manages the state and controls the rendering of other components based on the authentication status.

# File 5: manifest.json

manifest.json is likely the manifest.json file that is required for a Chrome Extension. In a Chrome Extension, the manifest.json file serves as the configuration file that defines the extension's properties and behavior, including its name, version, icons, permissions, and background scripts.

# Usage

To use this Chrome extension, follow these steps:

1. Load the extension in your Chrome browser by going to chrome://extensions/ and enabling "Developer mode" in the top right corner.
2. Click on "Load unpacked" and select the folder containing the four files mentioned above.
3. The extension will now be loaded and visible in your browser's toolbar.
4. Click on the extension icon to access the authentication functionality and generate, store, and retrieve the secret key.
   Note: The extension utilizes the chrome.storage.sync API for storing and retrieving the encrypted secret key in the Chrome storage.

Please make sure to handle sensitive information, such as secret keys, with caution and follow best practices for securing user data in a production environment.
