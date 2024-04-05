import { useState } from "react";
import { registerUserHandler } from "../handlers/api";
import { getUserToken, saveUserToken } from "../utils/helpers";
// import Notify from "./notification";
import {useNavigate} from "react-router-dom"


const RegisterComponent = () => {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { title,
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword } = userCredentials;

  const [error, setError] = useState([])
  const [showError, setShowError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(["passwords don't match"])
      setShowError(true)
      setTimeout(()=> {
        setShowError(false)
        setError()
      }, 5000)
    //  return (<Notify text={"passwords don't match"} type="error" />)
      return;
    }
   const registerUser = await registerUserHandler({title,
      firstName,
      lastName,
      email,
      password,
      confirmPassword});

      if(registerUser?.response?.data?.status === 'failure' || !registerUser){
          setError(registerUser.response.data.data.error)
          setShowError(true)
          setTimeout(()=> {
            setShowError(false)
          }, 5000)
      } else {
        saveUserToken(registerUser)
        if(getUserToken()){
          navigate("/user/profile")
        }
      } 
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value
    });
  };

  return (
      
    <div className="mt-10">
      {showError && error.map((e, index)=>{
      return <p className="text-red-900 pb-4" key={index}>{e}</p>
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          label="Prefix"
          onChange={handleChange}
          placeholder="Title (Dr., Mr., Ms, Prof,...)"
          required
        />
        <input
          type="firstName"
          name="firstName"
          value={firstName}
          label="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="lastName"
          name="lastName"
          value={lastName}
          label="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          label="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          label="Password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          label="confirm Password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <div className="buttons">
          <button className="bg-slate-950 text-slate-300 mt-12" type="submit"> Register </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;