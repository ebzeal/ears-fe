import { useEffect, useState } from 'react';
import {getTokenInfo, validateToken, getUserToken } from '../../utils/helpers';
import { createOpening } from '../../handlers/api';
import { useNavigate } from "react-router-dom";



const NewOpening = () => {
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
    },[]);
   
    const {tokenInfo} = userInfo;
  
    // const userTokenId = tokenInfo?.userId;
    // const {userId} = useParams()

      if(tokenInfo.privilege !== 'admin' ){
        navigate('/')
      }

    const [openingDetails, setOpeningDetails] = useState({
      title:"",
  description:"",
  status:"",
    });


  const { title,
  description,
  status,} = openingDetails;


  // const [error, setError] = useState([])
  // const [showError, setShowError] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target;
   setOpeningDetails(prevUserDetails => ({
      ...prevUserDetails,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
   const createdOpening = await createOpening( {title,
    description,
    status});
    //  const createdOpening = null

      if(createdOpening?.response?.data?.status === 'failure' || !createdOpening){
          // setError(createdOpening.response.data.data.error)
          // setShowError(true)
          // setTimeout(()=> {
          //   setShowError(false)
          // }, 5000)
      } else {
       
          navigate(`/openings`)
        }
      } 
  

  return (
    <>
    { openingDetails &&
      <div className="min-h-[900px] h-full flex flex-row bg-slate-50 w-[80%] p-8 ml-[10%] font-poppins">
    <div>
     <h2> Add New Opening </h2>
    </div>
    <div className='h-2/5 ml-32 mt-12'>
    
{openingDetails &&
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={openingDetails.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <select name="status" id="status" onChange={handleChange}>
          <option value="">Select status of opening here</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <textarea name="description" id="description" cols="30" rows="5" label="description" placeholder=' opening description' onChange={handleChange} value={ description  }  className="rounded">{description}</textarea>
       
        <div className="buttons">
          <button className="bg-slate-950 text-slate-300 mt-12" type="submit"> Create Opening </button>
        </div>
      </form>
}
    </div>
    </div>
  }
  </>
  )
}

export default NewOpening;