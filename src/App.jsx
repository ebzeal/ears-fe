import {useState} from 'react';
import AuthPage from './Views/Auth';
import { MyContext } from "./MyContext";
import {
  Routes,
  Route,
} from "react-router-dom";
import UserProfile from './Views/Profile';
import NavigationBar from './components/NavigationBar';
import Users from './Views/Users';
import User from './Views/User';
import UpdateUser from './Views/User/update-user';
import Openings from './Views/Openings';

function App() {
  const [state, setState] = useState(null);

  const updateState = (value) => {
    setState(value);
  };

  const clearState = () => {
    setState(null);
  };
  return (
    <>
<MyContext.Provider value={{ state, updateState, clearState }}>
  <div>

 <NavigationBar />
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/user/:userId" element={<User />} />
      <Route path="/user/update/:userId" element={<UpdateUser />} />
      <Route path="/openings" element={<Openings />} />
    </Routes>
    </div>
      </MyContext.Provider>
    </>
  )
}

export default App
