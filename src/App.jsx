import {useState} from 'react';
import AuthPage from './Views/Auth';
import { MyContext } from "./MyContext";
import {
  Routes,
  Route,
} from "react-router-dom";
import UserProfile from './Views/Profile';
import NavigationBar from './components/NavigationBar';

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
    </Routes>
    </div>
      </MyContext.Provider>
    </>
  )
}

export default App
