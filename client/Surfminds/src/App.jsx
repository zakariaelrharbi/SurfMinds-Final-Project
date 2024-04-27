import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from '../Pages/Login/UserLogin';
import Register from '../Pages/Register/Register';
import Terms_and_conditions from '../Pages/Register/Terms_and_conditions';


function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/terms-and-conditions" element={<Terms_and_conditions/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
