import { createContext, useState } from "react";

export const UserContext = createContext(null)
 import React from 'react'
 
 function Context({children}) {
    const [user,setUser]=useState()
   return (
    <UserContext.Provider value={{user,setUser}}>
{children}
    </UserContext.Provider>

   )
 }
 
 export default Context