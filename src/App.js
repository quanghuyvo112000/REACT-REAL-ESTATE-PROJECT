import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DashboardAdmin from './Components/Admin/DashboardAdmin';
import DashboardBroker from './Components/Broker/DashboardBroker';
import Login from './Components/Login/LoginForm';
import PageError from './Components/PageError/PageError';
import CheckOTP from './Components/ResetPassword/CheckOTP';
import FormCheck from './Components/ResetPassword/FormCheck';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SignUp from './Components/SignUp/SignUp';
import DashboardUser from './Components/User/DashboardUser';
import ProfileUser from './Components/User/ProfileUser';
import GetDataByLocation from './Components/User/UserFunction/Components/GetDataByLocation';
import GetDataDetail from './Components/User/UserFunction/Components/GetDataDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/check-email" element={<FormCheck />} />
          <Route path="/check-opt" element={<CheckOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-broker" element={<DashboardBroker />} />
          <Route path="/get-data/location/:location" element={<GetDataByLocation />} />
          <Route path="/get-data/detail/:id" element={<GetDataDetail />} />


          <Route path="/" element={<DashboardUser />} />
          <Route path="/dashboard" element={<ProfileUser />} />
          <Route path="*" element={<PageError />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
