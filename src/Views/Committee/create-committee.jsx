import { useEffect, useState } from 'react';
import {getTokenInfo, validateToken, getUserToken } from '../../utils/helpers';
import { createCommittee, getAllUsers } from '../../handlers/api';
import { useNavigate } from "react-router-dom";


const CreateCommittee = () => {
  const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
      tokenInfo:{}
    })

    const [allFaculty, setAllFaculty] = useState()

    useEffect(()=> {
    const userToken = getUserToken()
    const isValidated = validateToken(userToken);
      isValidated  ? '':  navigate('/');
    const tokenInfo = getTokenInfo(userToken);
      setUserInfo({tokenInfo})

      const fetchUsers = async()=> {
        const allUsers = await getAllUsers();

        const allFaculty = allUsers.filter(user=>user.userType === 'faculty')
        setAllFaculty(allFaculty);
      };

      fetchUsers();
    },[]);
   
    const {tokenInfo} = userInfo;
  
    // const userTokenId = tokenInfo?.userId;
    // const {userId} = useParams()

      if(tokenInfo.privilege !== 'admin' ){
        navigate('/')
      }

      const [committeeDetails, setCommitteeDetails] = useState({
        name:"",
    description:"",
    committee_head:"",
      });
  
  
    const { name,
    description,
    committee_head,} = committeeDetails;

    const handleChange = e => {
      const { name, value } = e.target;
     setCommitteeDetails(prevUserDetails => ({
        ...prevUserDetails,
        [name]: value
      }));
    };

    const committee_members =[];

    const handleCheck = (event) => {
      event.target.checked ? committee_members.push(event.target.value) : null;
    }
  
    const handleSubmit = async e => {
      e.preventDefault();
     const createdCommitee = await createCommittee({name,
      description,
      committee_head, committee_members});
  
        if(createdCommitee?.response?.data?.committee_head === 'failure' || !createdCommitee){
            // setError(createdCommitee.response.data.data.error)
            // setShowError(true)
            // setTimeout(()=> {
            //   setShowError(false)
            // }, 5000)
        } else {
         
            navigate(`/committees`)
          }
        } 

        

  return (
    <>
    { committeeDetails &&
      <div className="min-h-[900px] h-full flex flex-row bg-slate-50 w-[80%] p-8 ml-[10%] font-poppins">
    <div>
     <h2 className='font-bold'> Add New Committee </h2>
    </div>
    <div className='h-2/5 ml-32 mt-12'>
    
{committeeDetails && allFaculty &&
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={committeeDetails.name}
          onChange={handleChange}
          placeholder="committee name"
        />
        <select name="committee_head" id="committee_head" onChange={handleChange}>
          <option value="">Select committee head here</option>
          {
            allFaculty.map((item)=>{
              return <option key={item._id} value={item._id}>{item.title} {item.fullName}</option>
            })
          }
        </select>
        <textarea name="description" id="description" cols="30" rows="5" label="description" placeholder='committee description' onChange={handleChange} value={ description  }  className="rounded">{description}</textarea>

        <p className='mt-10 font-bold'>Select Committee Members</p>

{ allFaculty.map((item)=>{
              return <div key={item._id} className='flex justify-between h-[30px] border-b-2 my-4'>
              <label htmlFor={item._id}>{item.title} {item.fullName}</label>
              <input className='bg-slate-100 h-[15px] -mt-[.5px]' value={item._id} type="checkbox" id={item._id} name={item._id} onChange={handleCheck}/>
          </div>
            })}
        

       
        <div className="buttons">
          <button className="bg-slate-950 text-slate-300 mt-12" type="submit"> Create Committee </button>
        </div>
      </form>
}
    </div>
    </div>
  }
  </>
  )
}

export default CreateCommittee;