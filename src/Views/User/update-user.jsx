import { useEffect, useState } from 'react';
import johnDoe from '../../assets/johndoe.jpeg';
import {capitalizeFirstLetter, capitalizeFirstWord, getTokenInfo, validateToken, getUserToken } from '../../utils/helpers';
import { getUser, updateUser } from '../../handlers/api';
import { useNavigate, useParams } from "react-router-dom";



const UpdateUser = () => {
  const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
      tokenInfo:{}
    })
    useEffect(()=> {
    const userToken = getUserToken()
    const isValidated = validateToken(userToken);
      isValidated  ? '':  navigate('/');
    const tokenInfo = getTokenInfo(userToken);
      setUserInfo({tokenInfo})
    },[])
   
    const {tokenInfo} = userInfo;
  
    const userTokenId = tokenInfo?.userId;
    const {userId} = useParams()

    // useEffect(()=>{
      if(userTokenId !== userId && tokenInfo.privilege !== 'admin' ){
        navigate('/')
      }
    // }, [])
    


    const [userDetails, setUserDetails] = useState();
    useEffect(()=> {
      const fetchUser = async (id) => {
        try {
          const user = await getUser(id);
          setUserDetails(user)
          return user;
        } catch (error) {
          console.error("Error fetching user:", error);
          return error; 
        }
      };
    
      if (userId) {
        fetchUser(userId); // Call the function, but don't return its result here
      }
  }, [])
  if(!userDetails){
    return null
  }

  const { title,
  firstName,
  lastName,
  email,
  phone, bio } = userDetails;


  // const [error, setError] = useState([])
  // const [showError, setShowError] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target;
   setUserDetails(prevUserDetails => ({
      ...prevUserDetails,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
   const updatedUser = await updateUser({
   bodyPayload: {title,
      firstName,
      lastName,
      email,
      phone, bio}, id:userId});
    //  const updatedUser = null
    navigate(`/user/${userId}`)

      if(updatedUser?.response?.data?.status === 'failure' || !updatedUser){
          // setError(updatedUser.response.data.data.error)
          // setShowError(true)
          // setTimeout(()=> {
          //   setShowError(false)
          // }, 5000)
      } else {
       
          navigate(`/user/${userId}`)
        }
      } 
  

  return (
    <>
    { userDetails &&
      <div className="min-h-[900px] h-full flex flex-row bg-slate-50 w-[80%] p-8 ml-[10%]">
    <div>
      <img src={johnDoe} className='h-[300px]  mr-8' />
    </div>
    <div className='h-2/5 ml-32'>
    
{userDetails &&
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={userDetails.title ? capitalizeFirstLetter(userDetails?.title) :""}
          onChange={handleChange}
        />
         <input
          type="firstName"
          name="firstName"
          // value={firstName}
          value={ firstName || userDetails.fullName.length > 1 ? capitalizeFirstLetter(((userDetails.fullName).split(" "))[0]) : ''}
          label="firstName"
          onChange={handleChange}
        />
        <input
          type="lastName"
          name="lastName"
          // value={lastName}
          value={userDetails.fullName.length > 1  ? capitalizeFirstLetter(((userDetails.fullName).split(" "))[1]) : ''}
          label="lastName"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={ email }
          label="email"
          onChange={handleChange}
        />
      <input
          type="phone"
          name="phone"
          value={ phone }
          label="PhoneNumber"
          placeholder="PhoneNumber"
          onChange={handleChange}
        /> 
        <textarea name="bio" id="bio" cols="30" rows="5" label="bio" placeholder='bio' onChange={handleChange} value={ userDetails?.bio ? capitalizeFirstWord(userDetails?.bio) : ''  }  className="rounded">{bio}</textarea>
     
        <div className="buttons">
          <button className="bg-slate-950 text-slate-300 mt-12" type="submit"> Update Profile </button>
        </div>
      </form>
}
    </div>
    </div>
  }
  </>
  )
}

export default UpdateUser;