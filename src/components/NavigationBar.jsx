import { useNavigate } from "react-router-dom";
import { getTokenInfo,  validateToken } from '../utils/helpers';

const NavigationBar = () => {
  const navigate = useNavigate();
  const isValidated = validateToken();
  console.log("🚀 ~ NavigationBar ~ isValidated:", isValidated)
  const userToken = getTokenInfo();
  console.log("🚀 ~ NavigationBar ~ userToken:", userToken)

  return (
    <>
    {isValidated && (
      <div className="bg-black text-slate-100 font-poppins flex flex-row py-4 px-8 space-x-8">
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={() => navigate('/')}>Home</div>
        {userToken.status === 'admin' &&
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={() => navigate('/users')}>Users</div>
    }
     {userToken.userType === 'applicant' ? null :
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600">Committees</div>
  }
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600">Openings</div>
        <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={() => navigate('/user/profile')}>My Profile</div>
      </div>
    )}
  </>
  );
}

export default NavigationBar;