import {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { validateToken,  getTokenInfo, getUserToken } from '../../utils/helpers';
import { useNavigate } from "react-router-dom";
import { getAllOpenings } from '../../handlers/api';

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
    const fetchUser = async () => {
      try {
        const user = await getAllOpenings();
        setRowData(user)
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

    // Row Data: The data to be displayed.
    
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
      { field: "title" },
      { field: "Description" },
      { field: "Status" },
      { field: "" }
    ]);
   

   return (
    <div
     className="ag-theme-quartz min-h-[900px] h-full bg-slate-50 w-[80%] p-8 ml-[10%]" 
     style={{ height: 500 }}
    >
      {user.userInfo.privilege === 'admin' &&
       <div className='m-4 mt-2'>
      <button className='rounded-full bg-slate-400 hover:bg-slate-200 cursor-pointer border-none' onClick={()=> {}}>Add New Opening</button>
    </div>
}
      <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
      />
    </div>
   )
}

export default Openings;