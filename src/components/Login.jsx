import { useState } from "react";
import { loginUserHandler } from "../handlers/api";
import { saveUserToken, getUserToken } from "../utils/helpers";
import {useNavigate} from "react-router-dom"

const LoginComponent = () => {
  const navigate = useNavigate();

  const [userCredentials, setCredentials] = useState({
    user: "",
    password: ""
  });
  const { user, password } = userCredentials;
  const [error, setError] = useState([])
  const [showError, setShowError] = useState(false)
  const handleSubmit = async event => {
    event.preventDefault();

    const loginUser = await loginUserHandler({
      user,
      password
    });

      if(loginUser?.response?.data?.status === 'failure'){
          setError([loginUser.response.data.data.message])
          setShowError(true)
          setTimeout(()=> {
            setShowError(false)
          }, 5000)
      } else {
        await saveUserToken(loginUser)
        if(getUserToken()){
          navigate("/user/profile")
        }
      } 
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
  <>
  <div className="mt-20">
  {showError && error.map((e, index)=>{
      return <p className="text-red-900 pb-4" key={index}>{e}</p>
      })}
      <form onSubmit={handleSubmit}>
        <input
          name="user"
          type="user"
          value={user}
          required
          onChange={handleChange}
          label="user"
        />
        <input
          name="password"
          type="password"
          value={password}
          required
          onChange={handleChange}
          label="password"
        />
        <div className="buttons">
          <button className="bg-slate-950 text-slate-300 mt-12" type="submit"> Sign In </button>
        </div>
      </form>
    </div>
  </>
  )
}

export default LoginComponent;