import React, { createContext, useContext, useState } from 'react';

export const CommonContext = createContext({
  user: {},
  setUser: () => {},
});

export function CommonContextProvider({ children }) {
  const [user, setUser] = useState({ name: 'Common State' });
  return (
    <CommonContext.Provider value={{ user, setUser }}>
      {children}
    </CommonContext.Provider>
  );
}

export const useCommonContext = () => useContext(CommonContext);