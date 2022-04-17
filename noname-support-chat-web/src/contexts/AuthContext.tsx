import React, { useState, createContext, useMemo } from 'react';

const AuthContext: any = createContext(null);

function AuthContextComp(props: { children: any }) {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComp };
