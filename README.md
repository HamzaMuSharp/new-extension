# React Chrome Extension for Secret Key Generation

This is a React-based Chrome browser extension that generates and stores a user's secret key. The extension consists of four files: Auth.js, SecretManager.js, Signup.js, and Signin.js.

# File 1: Auth.js

This file contains the main authentication component Auth which handles the generation, storage, and retrieval of the secret key. It utilizes the generateSecret function from the ../../utils/generateSecret file for generating the secret key, and CryptoJS library for encryption and decryption. The Auth component also renders SecretManager, Signin, and Signup components based on the state of the secret key and whether the extension has been initialized.

# File 2: SecretManager.js

This file contains the SecretManager component which displays the user's secret key, provides options for regenerating the key and logging out. It receives props such as resetDecryptKey, generateKey, and decryptkey from the parent component.

# File 3: Signup.js

This file contains the Signup component which renders a form for the user to input a password and confirm password in order to generate the secret key. It also handles form submission and error handling for password mismatch.

# File 4: Signin.js

This file contains the Signin component which displays a form for the user to input their password to decrypt and retrieve the secret key. It handles form submission, decryption of the secret key, and error handling for incorrect password.

# Usage

To use this Chrome extension, follow these steps:

Load the extension in your Chrome browser by going to chrome://extensions/ and enabling "Developer mode" in the top right corner.
Click on "Load unpacked" and select the folder containing the four files mentioned above.
The extension will now be loaded and visible in your browser's toolbar.
Click on the extension icon to access the authentication functionality and generate, store, and retrieve the secret key.
Note: The extension utilizes the chrome.storage.sync API for storing and retrieving the encrypted secret key in the Chrome storage.

Please make sure to handle sensitive information, such as secret keys, with caution and follow best practices for securing user data in a production environment.
