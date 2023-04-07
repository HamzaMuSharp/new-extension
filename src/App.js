
import './App.css';
import Auth from './Pages/Auth/Auth';
import { Provider } from 'react-redux';
import store from "./store"


function App() {

  return (
    <Provider store={store}>
      <div className="App_container">
        <Auth></Auth>
      </div>
    </Provider>

  );
}

export default App;


