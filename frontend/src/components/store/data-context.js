import React, { useState } from "react";

const DataContext = React.createContext({});

export const DataContextProvider = (props) => {
  const [organizations, setOrganizations] = useState([]);
  const setOrganizationsHandler = (organizations) => {
    setOrganizations(organizations);
  };

  const contextValue = {
    organizations: organizations,
    setOrganizationsHandler: setOrganizationsHandler,
  };
  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
