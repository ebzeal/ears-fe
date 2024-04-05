import { useEffect, useState } from 'react';
import {getTokenInfo, validateToken, getUserToken } from '../../utils/helpers';
import { getOpening, updateOpening } from '../../handlers/api';
import { useNavigate, useParams } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid



const UpdateOpening = () => {
  const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
      tokenInfo:{}
    })
    useEffect(()=> {
    const userToken = getUserToken()
    const isValidated = validateToken(userToken);
      isValidated  ? '':  navigate('/');
    const tokenInfo = getTokenInfo(userToken);
    if( tokenInfo.userType !== 'faculty' ){
      navigate('/')
    }
      setUserInfo({tokenInfo})
    },[]);
   
    const {tokenInfo} = userInfo;
  
    const {openingId} = useParams()
const [rowData, setRowData] = useState([]);

    const [openingDetails, setOpeningDetails] = useState();



    useEffect(()=> {
      const fetchOpening = async (id) => {
        try {
          const opening = await getOpening(id);
          console.log("🚀 ~ fetchOpening ~ opening:", opening)
          setOpeningDetails(opening)
          setRowData(opening.applications);
          return opening;
        } catch (error) {
          console.error("Error fetching opening:", error);
          return error; 
        }
      };
        fetchOpening(openingId); 
  }, [openingId])

  useEffect(() => {
    // Check if openingDetails is not null
    if (openingDetails && openingDetails.applications) {
      const sortedApplications = openingDetails.applications.sort((a, b) => {
        // Check if both applications have reviews
        if (a.reviews.length === 0 && b.reviews.length === 0) {
          return 0; // If both have no reviews, consider them equal
        }
        // Check if only one application has reviews
        if (a.reviews.length === 0) {
          return 1; // If only a has no reviews, b should come first
        }
        if (b.reviews.length === 0) {
          return -1; // If only b has no reviews, a should come first
        }
        // Compare ratings in descending order
        return b.reviews[0].rating - a.reviews[0].rating;
      });
      console.log("🚀 ~ sortedApplications ~ sortedApplications:", sortedApplications);
      setRowData(sortedApplications);
    }
  }, [openingDetails]);

  const [colDefs, setColDefs] = useState([
    { field: "user",  cellRenderer: UserCellRenderer },
    { field: "bio",  cellRenderer: BioRenderer },
    { field: "status", cellRenderer: FullNameRenderer},
    {field:"ratings", cellRenderer: RatingRenderer}

 ]);
  if(!openingDetails){
    return null
  }


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
   await updateOpening( {bodyPayload:{title,
    description,
    status}, id:openingId});
          navigate(`/opening/${openingId}`)
      } 

      const handleRowClicked =  (params) => {
              navigate(`/opening/${openingId}/application/${params.data._id}`);
          } 

  return (
    <>
      <div className="min-h-[900px] h-full bg-slate-50 w-[80%] p-8 ml-[10%] font-poppins">
    
    <div className='h-2/5 ml-32 mt-8'>
    
{openingDetails &&
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Title"
        />
        <select name="status" id="status" onChange={handleChange}>
          <option value="">{status}</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <textarea name="description" id="description" cols="30" rows="5" label="description" placeholder='job description' onChange={handleChange} value={ description  }  className="rounded">{description}</textarea>
       
       {tokenInfo.privilege === 'admin' &&
        <div className="buttons">
          <button className="bg-slate-950 text-slate-300 mt-10" type="submit"> Edit Opening </button>
        </div>
}
      </form>
}
    </div>

{ openingDetails &&tokenInfo.userType==='faculty' ?

<div className='text-slate-600 font-poppins my-16'>
  <h2 className='mx-32'> <span className='font-bold '>{openingDetails.applications.length} Applicant/s</span> sorted by rating (with the highest rated candidate at the top)</h2>

  <div
     className="ag-theme-quartz min-h-[400px] h-full bg-slate-50 w-[100%] p-8 " 
     style={{ height: 300 }}
    >
      <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onRowClicked={handleRowClicked}
      />
    </div>
</div>
: null
}
    </div>

    </>
  )
}

const FullNameRenderer = (params) => {
  const navigate = useNavigate();
  return (
  // <p onClick={()=> {  
  // navigate(`/user/${params.data._id}`)}}>
  //     {params.value}
  // </p>
  <p>
        {params.value}
    </p>
  )
}

const UserCellRenderer = (params) => {
  const navigate = useNavigate();
  return (<p>
      {params.data.user.title} {params.data.user.fullName}
   </p>
  )
}

const BioRenderer = (params) => {
  return (<p>
      {params.data.user.bio}
   </p>
  )
}



const RatingRenderer = (params) => {
  const {reviews} = params.data;
  let totalRating =0;
  const numberOfReviews = reviews.length;
  reviews.map(review => {
   totalRating += review.rating
    return  null ;
  });

  const ratingAvg = totalRating/numberOfReviews || 0;

  return (<p>
      { `${ratingAvg}` }
   </p>
  )
}


export default UpdateOpening;