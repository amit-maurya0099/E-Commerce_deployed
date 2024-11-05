import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((store) => store.users.isAuthenticated);
  const role=useSelector((store)=>store.users.user.role)

  if (!isAuthenticated) {
    return <Navigate to="/signUp" />;
  }
  if(role && role!=="admin"){
    return <div className='flex text-xl font-bold h-screen justify-center items-center '><p>Not Authorised to access this Resource</p></div>
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;