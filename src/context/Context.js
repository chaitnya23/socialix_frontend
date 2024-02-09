import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useVerifyUser, verifyUser } from '../apis';
import { Loader } from '../components';
import { routes } from '../utils';

export const UserContext = createContext({});

function Context({ children }) {

  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  
  const { data, isError, isLoading } = useVerifyUser(setuser,navigate);
  

  return (
    <UserContext.Provider value={{ user, setuser }}>
    <Loader loading={isLoading}/>
      {children}
    </UserContext.Provider>

  )
}


export default Context;