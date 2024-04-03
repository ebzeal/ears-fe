import { useNavigate } from "react-router-dom";
import { getTokenInfo,  removeUserToken,  validateToken, getUserToken } from '../utils/helpers';
import { useEffect, useState } from "react";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    isValidated: false,
    userInfo:{}
  })

  const userToken = getUserToken();
  useEffect(()=> {
const isValidated = validateToken(userToken);
    const userInfo = getTokenInfo(userToken);
    setUser({isValidated, userInfo})
  },[userToken ])
 
  const {isValidated, userInfo} = user

  const handleLogout = () => {
    removeUserToken();
    setUser({isValidated: false,
    userInfo:{}
  })
    navigate('/');
    return null
  }

  return (
    <>
    {isValidated && (
      <div className="bg-black text-slate-100 font-poppins flex flex-row py-4 px-8 space-x-8">
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={() => navigate('/')}>Home</div>
        {userInfo.privilege === 'admin' &&
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={() => navigate('/users')}>Users</div>
    }
     {userInfo.userType !== 'faculty' ? null :
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600">Committees</div>
  }
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={() => navigate('/openings')}>Openings</div>
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={() => navigate('/user/profile')}>My Profile</div>
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600 mr-[50%]" onClick={() => handleLogout()}>Log Out</div>

      </div>
    )}
  </>
  );
}

export default NavigationBar;