import { useEffect, useState } from 'react';
import johnDoe from '../../assets/johndoe.jpeg';
import {capitalizeFirstLetter, capitalizeFirstWord, getTokenInfo, validateToken } from '../../utils/helpers';
import { getUser } from '../../handlers/api';
import { useNavigate } from "react-router-dom";



const UserProfile = () => {
  const navigate = useNavigate();
  const userToken = validateToken()
    userToken ? '':  navigate('/');
    const user = getTokenInfo()
    const userId = user?.userId;

    const [userDetails, setUserDetails] = useState();
    useEffect(()=> {
      const fetchUser = async (id) => {
        try {
          const user = await getUser(id);
          setUserDetails(user)
          return user;
        } catch (error) {
          // console.error("Error fetching user:", error);
          return null; // or handle the error appropriately
        }
      };
    
      if (userId) {
        fetchUser(userId); // Call the function, but don't return its result here
      }
  }, [userId])

  return (
    <>
    { userDetails &&
      <div className="min-h-[900px] h-full flex flex-row bg-slate-50 w-[80%] p-8 ml-[10%]">
    <div>
      <img src={johnDoe} className='h-[300px]  mr-8' />
    </div>
    <div className='h-2/5 ml-32'>
      <p className='text-neutral-950 w-full text-xl font-poppins mt-4'><span className='text-base pr-8'>Name: </span> { capitalizeFirstLetter(userDetails?.title) } {capitalizeFirstWord(userDetails.fullName)}</p>
      <p className='text-neutral-950 w-full text-xl font-poppins mt-4'><span className='text-base pr-8'>Email: </span> { capitalizeFirstLetter(userDetails.email) }</p>
      <p className='text-neutral-950 w-full text-xl font-poppins mt-4'><span className='text-base pr-8'>Phone: </span> { capitalizeFirstLetter(userDetails?.phone) }</p>
      <p className='text-neutral-950 w-full text-xl font-poppins mt-4'><span className='text-base pr-8'>Status: </span> { capitalizeFirstLetter(userDetails.userType) }</p>
    </div>
    <div className='ml-48'>
      <button className='rounded-full bg-slate-400 hover:bg-slate-200 cursor-pointer border-none'>edit profile</button>
    </div>
    </div>
  }
  </>
  )
}

export default UserProfile;