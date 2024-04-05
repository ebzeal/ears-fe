import {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { validateToken,  getTokenInfo, getUserToken, capitalizeFirstLetter } from '../../utils/helpers';
import { useNavigate } from "react-router-dom";
import { getAllOpenings, getCommittees, getOpening } from '../../handlers/api';



const Committee = () => {
  const navigate = useNavigate();

  // const [rowData, setRowData] = useState([
  // ]);

  const [user, setUser] = useState();
  const [committees, setCommittees] = useState();

  useEffect(()=> {
    const userToken = getUserToken()
    const isValidated = validateToken(userToken);
      isValidated  ? '':  navigate('/');
    const tokenInfo = getTokenInfo(userToken);
      setUser(tokenInfo)

      const fetchCommittees = async() => {
        const allCommittees = await getCommittees()
        setCommittees(allCommittees);
      }

      fetchCommittees();

    },[]);

   // Column Definitions: Defines the columns to be displayed.
   const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "committee_head", headerName:'Chair Person', cellRenderer:CommitteeHeadRenderer },
    { field: "description", cellRenderer:DescriptionRenderer },
    { field: "" },
  ]);

  return (
    <div
    className="ag-theme-quartz min-h-[900px] h-full bg-slate-50 w-[80%] p-8 ml-[10%]" 
    style={{ height: 500 }}
   >
     { user && user.privilege === 'admin' &&
      <div className='m-4 mt-2'>
     <button className='rounded-full bg-slate-400 hover:bg-slate-200 cursor-pointer border-none' onClick={()=> {navigate('/committee/new')}}>Create Committee</button>
   </div>
}
     
     <AgGridReact
         rowData={committees}
         columnDefs={colDefs}
         // onRowClicked={handleRowClicked}
     />
   </div>
  )
}

const CommitteeHeadRenderer = (params) => {
  return <div>
    {params.data.committee_head.title} {params.data.committee_head.fullName}
  </div>
}

const DescriptionRenderer = (params) => {
  return <div>
    {params.data.committee_head.description}
  </div>
}
export default Committee;