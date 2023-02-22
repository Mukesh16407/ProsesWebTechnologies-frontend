import React, { createContext, useState } from "react";

export const addUserData = createContext();
export const updateUser = createContext();
export const dltUser = createContext();

export const ContextProvider = ({ children }) => {
  const [useradd, setUseradd] = useState("");
  const [update, setUpdate] = useState("");
  const [deletedata, setDLtdata] = useState("");
  return (
    <>
      <addUserData.Provider value={{ useradd, setUseradd }}>
        <updateUser.Provider value={{ update, setUpdate }}>
          <dltUser.Provider value={{ deletedata, setDLtdata }}>
            {children}
          </dltUser.Provider>
        </updateUser.Provider>
      </addUserData.Provider>
    </>
  );
};