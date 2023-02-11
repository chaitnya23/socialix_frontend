import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const UserContext  = createContext({});

function Context({children}) {
 
  const navigate = useNavigate();
  

    const [user, setuser] = useState({});

    useEffect(() => {
         
        const getUser = async()=>{
            try {
                
                const {data} = await  axios.get('/api/auth/get');
                setuser(data);
                console.log(data);
               

            } catch (error) {
                
                //navigate to login
                setuser({})
                console.log(error.message ,"not authenticated");
                //navigate("/login")
            }
        }

        getUser();
    }, [navigate])
    
    
  return (
    <UserContext.Provider value={{user ,setuser}}>
    {children}
    </UserContext.Provider>
    
  )
}

export default Context