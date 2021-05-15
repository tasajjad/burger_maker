import React from 'react';
import Main from './Components/Main';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux//store'

function App() {
  return (
    <div>
     <Provider store={store}>
     <BrowserRouter>
      <Main/>
      </BrowserRouter>
     </Provider>
    </div>
  );
}

export default App;
