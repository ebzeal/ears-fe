import { useEffect, useState } from 'react';
import {getTokenInfo, validateToken, getUserToken } from '../../utils/helpers';
import { applyToOpening, getOpening } from '../../handlers/api';
import { useNavigate, useParams } from "react-router-dom";



const ViewOpening = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userInfo:{}
  });
  const [isApplied, setIsApplied] = useState(false);

    useEffect(()=> {
    const userToken = getUserToken()
    const isValidated = validateToken(userToken);
      isValidated  ? '':  navigate('/');
    const tokenInfo = getTokenInfo(userToken);
      setUser({userInfo:tokenInfo})
    },[]);
   
    const {openingId} = useParams();
    const [openingDetails, setOpeningDetails] = useState();


    useEffect(() => {
      const fetchOpening = async (id) => {
        try {
          const opening = await getOpening(id);
          setOpeningDetails(opening);
          const checkApplied = opening.applications.some(item => item.user._id === user.userInfo.userId);
          setIsApplied(checkApplied);
          return opening;
        } catch (error) {
          console.error("Error fetching opening:", error);
          return error; 
        }
      };
    
      if (openingId) {
        fetchOpening(openingId); 
      }
    }, [openingId, user.userInfo.userId]);
  
  if(!openingDetails){
    return null
  }

  const { title,
  description,
  status,} = openingDetails;


      const handleApplication = async(id) => {
        await applyToOpening(id);
        setIsApplied(true)
        navigate(`/opening/${openingId}`)
      }

  return (
    <>
    { openingDetails &&
      <div className="min-h-[900px] h-full flex flex-row bg-slate-50 w-[80%] p-8 ml-[10%] font-poppins">
    
    <div className='h-2/5 ml-32 mt-12'>
    
{openingDetails &&
      <div >
        <input
          type="text"
          name="title"
          value={title}
          disabled
          placeholder="Title"
        />
        <select name="status" id="status" disabled>
          <option value="">{status}</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <textarea name="description" id="description" cols="30" rows="5" label="description" placeholder='job description' value={ description  }  className="rounded" disabled>{description}</textarea>
       
        {user.userInfo.userType==='applicant' &&
       <div className='m-4 mt-2'>
        {isApplied ? 
        <button className='rounded-full bg-slate-100 border-none' disabled>Applied</button> 
        :
        <button className='rounded-full bg-slate-400 hover:bg-slate-200 cursor-pointer border-none' onClick={()=>handleApplication(openingId)} >Apply</button> 
        }
      
    </div>
}
      </div>
}
    </div>
    </div>
  }
  </>
  )
}

export default ViewOpening;