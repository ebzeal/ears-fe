/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { validateToken, capitalizeFirstWord, getTokenInfo, getUserToken } from '../../utils/helpers';
import { useNavigate } from "react-router-dom";
import { getAllUsers, toggleUserType } from '../../handlers/api';


const ButtonRenderer = (params) => {
  const navigate = useNavigate();
  const userType = params.data.userType === 'faculty' ? 'applicant' : 'faculty';
  return (
    <div className='bg-slate-100 text-slate-600 rounded-large hover:bg-slate-400'>
      <button onClick={async()=> {
        await toggleUserType(params.data._id)
        // navigate('/users')
        window.location.reload();
      }}>Change to {userType}</button>
    </div>
 
  );
};

const Users =()=> {

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
 
  const {userInfo} = user
    const {userId} = userInfo;

  const [rowData, setRowData] = useState([
  ]);

  useEffect(()=> {
    const fetchUser = async () => {
      try {
        const user = await getAllUsers();
        setRowData(user)
        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
        return error;
      }
    };
    if (userId) {
      fetchUser(userId); // Call the function, but don't return its result here
    }
}, [userId])

    const handleCapital = (params) => {
      if (params.value && typeof params.value === 'string') {
        return capitalizeFirstWord(params.value)
      } else {
        return params.value;
      }
    };

    const handleRowClicked = (event) => {
      console.log("Clicked Row Data:", event.data);
      navigate(`/user/${event.data._id}`)
    };
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
      { field: "title", valueFormatter:  handleCapital, cellRenderer: FullNameRenderer},
      { field: "fullName", valueFormatter:  handleCapital,  cellRenderer: FullNameRenderer },
      { field: "userType", valueFormatter:  handleCapital,  cellRenderer: FullNameRenderer },

    {
      field: "actions",
      headerName: "Change user type",
      cellRenderer: ButtonRenderer,
    }
   ]);

   return (
    <div
     className="ag-theme-quartz min-h-[900px] h-full bg-slate-50 w-[80%] p-8 ml-[10%]" 
     style={{ height: 500 }}
    >
      <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
      />
    </div>
   )
}

const FullNameRenderer = (params) => {
  const navigate = useNavigate();
  return (<p onClick={()=> {  
  navigate(`/user/${params.data._id}`)}}>
      {capitalizeFirstWord(params.value)}
  </p>)
}



export default Users;