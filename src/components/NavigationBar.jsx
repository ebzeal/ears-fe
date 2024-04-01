import { useNavigate } from "react-router-dom";
// import { validateToken } from '../../utils/helpers';

const NavigationBar = () => {
  const navigate = useNavigate();
  // const isValidated = validateToken();

  <div className="bg-black text-slate-100 font-poppins flex flex-row py-4 px-8 space-x-8 ">
   
      <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={()=> navigate('/')}>Home</div>
      <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600">Users</div>
      <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600">Committees</div>
      <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600">Openings</div>
      <div className="p-4 rounded cursor-pointer hover:text-slate-300 hover:bg-slate-600" onClick={()=> navigate('/user/profile')}>My Profile</div>
  </div>
}

export default NavigationBar;