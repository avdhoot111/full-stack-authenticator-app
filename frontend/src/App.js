import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
