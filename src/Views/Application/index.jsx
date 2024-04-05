import {useEffect, useState} from 'react';
import { validateToken,  getTokenInfo, getUserToken } from '../../utils/helpers';
import { useNavigate, useParams } from "react-router-dom";
import { getApplication, submitReview } from '../../handlers/api';
import johnDoe from '../../assets/johndoe.jpeg';

const Application=()=> {
  const navigate = useNavigate();
  const {openingId, applicationId} = useParams()

  const [user, setUser] = useState({
    userInfo:{}
  });

  const [applicationDetails, setApplicationDetails] = useState()
  console.log("🚀 ~ Application ~ applicationDetails:", applicationDetails)

  const userToken = getUserToken();
  useEffect(()=> {
const isValidated = validateToken(userToken);
isValidated ? '':  navigate('/');
    const userInfo = getTokenInfo(userToken);
    setUser({userInfo})
  },[navigate, userToken])
  const userId = user.userInfo?.userId;

  useEffect(()=> {
    const fetchApplication = async(openingId, applicationId)=> {
      const application = await getApplication(openingId, applicationId);
      setApplicationDetails(application);
    }

    fetchApplication(openingId, applicationId)
  }, [])

  const [reviewDetails, setReviewDetails] = useState({
    review:"",
    rating:0,
    comments:"",
  });

  const {review, rating, comments} = reviewDetails

  const handleChange = e => {
    const { name, value } = e.target;
   setReviewDetails(prevUserDetails => ({
      ...prevUserDetails,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    // const submittedReview = await submitReview( {bodyPayload:{review, rating,comments}, ids:{openingId, applicationId}});
          // console.log("🚀 ~ handleSubmit ~ submittedReview:", submittedReview)
          navigate(`/opening/edit/${openingId}`)
      } 



  return (<>
  {applicationDetails &&
    <div className="min-h-[900px] h-full bg-slate-50 w-[80%] p-8 ml-[10%] font-poppins">
      <h2> <span className='font-bold'>Position:</span> {applicationDetails.opening.title}</h2>
      <h2> <span className='font-bold'>Number of Applications:</span> {applicationDetails.opening.applications.length}</h2>
    <div className='h-2/5 ml-32 mt-16 flex space-x-16'>
      <div>
        
    <h2> <span className='font-bold'>Applicant:</span> {applicationDetails.application.user.title} {applicationDetails.application.user.fullName}</h2>
    <p> <span className='font-bold'>Bio:</span> {applicationDetails.application.user.bio}</p>
  
    </div>  
   < div>
      <img src={johnDoe} className='h-[300px]  mr-8' />
     
    </div>
      </div>
      <h2 className='font-bold mt-12'>Submit Review</h2>

      <form onSubmit={handleSubmit}>
        <select name="review" id="review" onChange={handleChange} required>
          <option value="">Choose a review</option>
          <option value="considered">Consider</option>
          <option value="reject">Reject</option>
        </select>
       
       <div className='w-[90%]'>
       <label htmlFor="rating" className='pr-8 text-slate-500'>Rate Applicant from 1 - 10</label>
        <input
       className='w-[60%]'
          type="number"
          name="rating"
          value={rating}
          onChange={handleChange}
          min={1}
          max={10}
          required
        />
        </div>
        <textarea name="comments" id="comments" cols="30" rows="5" label="comments" placeholder='comments on applicant' onChange={handleChange} value={ comments  }  className="rounded">{comments}</textarea>
       
        <div className="buttons">
          <button className="bg-slate-950 text-slate-300 mt-10" type="submit"> Submit Review </button>
        </div>

      </form>
      <div>

      </div>

   </div>
}
  </>)
}

export default Application