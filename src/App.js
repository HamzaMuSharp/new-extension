
import './App.css';
import Auth from './Pages/Auth/Auth';
import CryptoJS from "crypto-js"

function App() {
  window.CryptoJS = CryptoJS
  console.log(window.CryptoJS, "window.CryptoJS")
  return (
    <div className="App_container">
      <Auth></Auth>
    </div>
  );
}

export default App;


