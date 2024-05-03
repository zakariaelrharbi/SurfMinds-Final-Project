import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from '../Pages/Register/Register';
import Terms_and_conditions from '../Pages/Register/Terms_and_conditions';
import UserLogin from '../Pages/Login/UserLogin';

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/terms-and-conditions" element={<Terms_and_conditions/>}/>
      </Routes>
    </div>
  );
}

export default App;
