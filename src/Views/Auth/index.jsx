import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import landingImage from '../../assets/landing.jpg'
import LoginComponent from '../../components/Login';
import RegisterComponent from '../../components/Register';
import { getUserToken, validateToken } from '../../utils/helpers';

const AuthPage = () => {
  const [isAccount, setIsAccount] = useState(true)
  const [isValidated, setIsValidated] = useState(true)
  useEffect(()=>{
    const userToken = getUserToken();
    setIsValidated(validateToken(userToken));
  }, [])

  return (
    <div className="flex items-center flex-row h-[full] p-0">
        <div className='m-0  w-3/5' style={{ height: '100%' }}> 
          <img src={landingImage} className='h-[100%]' alt="Landing Image" /> 
        </div>
        <div className='h-full w-2/5 items-center p-8'>
          <h1 className='text-neutral-950 w-full font-bold font-poppins mt-4'>Employment Application Review System</h1>
         {isValidated ? <></> :
          <div className='ml-10'>
          <AnimatePresence mode="wait">
          <motion.div
            key={isAccount}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isAccount ?
            <LoginComponent />
            :
            <RegisterComponent />
            }
             </motion.div>
        </AnimatePresence>

<div className='mt-6'>
  {isAccount ? <h2>Yet to register?
      <span onClick={()=> setIsAccount(false)} className='cursor-pointer'> Sign up here </span> </h2> : <h2>Already have an account?
      <span onClick={()=> setIsAccount(true)} className='cursor-pointer'> Sign in here</span> </h2> }
            
      </div>
          </div>
}
        </div>
      </div>
  
  )
}

export default AuthPage;