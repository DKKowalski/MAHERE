import React, { useState } from "react";

const MathContext = React.createContext();

export const MathProvider = ({ children }) => {
  const [mathData, setMathData] = useState({});

  const addFile = (file) => {
    setMathData(file);
  };
  return (
    <MathContext.Provider value={{ mathData, addFile }}>
      {children}
    </MathContext.Provider>
  );
};

export default MathContext;
