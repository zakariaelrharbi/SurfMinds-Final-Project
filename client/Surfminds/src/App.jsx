import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/Auth/Register/Register.jsx';
import UserLogin from './pages/Auth/Login/UserLogin.jsx';
import Terms_and_conditions from './pages/Auth/Register/Terms_and_conditions.jsx';
import Layout from './components/shared/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';


function App() {
  return (
    <div className="wrapper">
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
          </Route>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/terms-and-conditions" element={<Terms_and_conditions/>}/>
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
