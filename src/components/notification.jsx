import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  const Notify = (text, type) =>{

    return (
      <div>
         {
         toast[`${type}`](text, {
        position: "top-right"
      })
    }
        <ToastContainer />
      </div>
    );
  }

  export default Notify;
