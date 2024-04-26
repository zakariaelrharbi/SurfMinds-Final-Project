import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserLogin from '../components/UserLogin';
import UserRegister from '../components/UserRegister';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path='/' element={<UserLogin />} />
          <Route exact path='/register' element={<UserRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
