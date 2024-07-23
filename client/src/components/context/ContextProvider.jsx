import React, { createContext, useState } from 'react'

export const userData = createContext()

const ContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState('')
  return (
    <>
      <userData.Provider value={{ userDetails, setUserDetails }} >
        { children }
      </userData.Provider>
    </>
  )
}

export default ContextProvider