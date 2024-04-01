import {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { validateToken, capitalizeFirstLetter, capitalizeFirstWord, getTokenInfo } from '../../utils/helpers';
import { useNavigate } from "react-router-dom";
import { getAllUsers } from '../../handlers/api';

const Openings =()=> {

  const navigate = useNavigate();
  const userToken = validateToken()
    userToken ? '':  navigate('/');
    const user = getTokenInfo(userToken)
    const userId = user?.userId;
  // const [users, setUsers] = useState();

  const [rowData, setRowData] = useState([
  ]);

  useEffect(()=> {
    const fetchUser = async () => {
      try {
        const user = await getAllUsers();
        console.log("🚀 ~ useEffect ~ user:", user);
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
      { field: "fullName" },
      { field: "userType" },
      { field: "committee" }
    ]);
   

   return (
    // wrapping container with theme & size
    <div
     className="ag-theme-quartz min-h-[900px] h-full bg-slate-50 w-[80%] p-8 ml-[10%]" // applying the grid theme
     style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
      />
    </div>
   )
}

export default Openings;