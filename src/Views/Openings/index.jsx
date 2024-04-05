import {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { validateToken,  getTokenInfo, getUserToken, capitalizeFirstLetter } from '../../utils/helpers';
import { useNavigate } from "react-router-dom";
import { getAllOpenings, getOpening } from '../../handlers/api';

const Openings =()=> {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    userInfo:{}
  })

  const userToken = getUserToken();
  useEffect(()=> {
const isValidated = validateToken(userToken);
isValidated ? '':  navigate('/');
    const userInfo = getTokenInfo(userToken);
    setUser({userInfo})
  },[navigate, userToken])
  const userId = user.userInfo?.userId;

  const [rowData, setRowData] = useState([
  ]);

  useEffect(()=> {
    const fetchOpening = async () => {
      try {
        const opening = await getAllOpenings();
        setRowData(opening)
        return opening;
      } catch (error) {
        // console.error("Error fetching user:", error);
        return null; // or handle the error appropriately
      }
    };
    // if (userId) {
      fetchOpening(); // Call the function, but don't return its result here
    // }
}, [])

    // Row Data: The data to be displayed.
    
   
   
    const handleRowClicked = (params) => {
      if(user.userInfo.userType === 'applicant'){
      navigate(`/opening/${params.data._id}`);
    } else {
      navigate(`/opening/edit/${params.data._id}`);
      }
    }
 
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
      { field: "title", cellRenderer: CellRenderer },
      { field: "description", cellRenderer: CellRenderer },
      { field: "status", cellRenderer: StatusRenderer },
      { field: "", cellRenderer: AppliedCellRenderer },
    ]);

   return (
    <div
     className="ag-theme-quartz min-h-[900px] h-full bg-slate-50 w-[80%] p-8 ml-[10%]" 
     style={{ height: 500 }}
    >
      {user.userInfo.privilege === 'admin' &&
       <div className='m-4 mt-2'>
      <button className='rounded-full bg-slate-400 hover:bg-slate-200 cursor-pointer border-none' onClick={()=> {navigate('/opening/new')}}>Add New Opening</button>
    </div>
}
      
      <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          // onRowClicked={handleRowClicked}
      />
    </div>
   )
}

const AppliedCellRenderer = (params) => {
  console.log("🚀 ~ AppliedCellRenderer ~ params:", params)
  const userToken = getUserToken();
    const userInfo = getTokenInfo(userToken);

  const isApplied = params.data.applications.some(item=>item.user === userInfo.userId);
  return (<>
  {isApplied ? <p>Applied</p> : null}
  </>)
}

const CellRenderer = (params) => {
  const navigate = useNavigate();
  const userToken = getUserToken();
    const userInfo = getTokenInfo(userToken);

  return (<p onClick={()=> {  
    if(userInfo.userType === 'applicant'){
      navigate(`/opening/${params.data._id}`);
    } else {
      navigate(`/opening/edit/${params.data._id}`);
      }}}>
      {params.value}
  </p>)
}

const StatusRenderer = (params) => {
  const status = params.data.status;
  return (
  <div className={status === 'open' ? 'bg-green-300  pl-10' : 'bg-red-400  pl-10'}>
    <p>
      {capitalizeFirstLetter(params.data.status)}
  </p>
    </div>
  )
}

export default Openings;