import React, { useState, createContext, useMemo } from 'react';

const PageContext: any = createContext(null);

function PageContextComp(props: { children: any }) {
  const [loading, setLoading] = useState(true);

  const value = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading, setLoading],
  );

  return (
    <PageContext.Provider value={value}>{props.children}</PageContext.Provider>
  );
}

export { PageContext, PageContextComp };
