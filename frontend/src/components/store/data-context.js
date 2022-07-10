import React, { useState } from "react";

const DataContext = React.createContext({
  organizations: [],
  activeOrganization: "",
  activeBoard: "",
  activeBoardData: {},
  activeTicket: "",
  setOrganizations: (organizations) => {},
  setActiveOrganization: (organization) => {},
  setActiveBoard: (board) => {},
  setActiveBoardData: (data) => {},
  setActiveTicket: (ticket) => {},
});

export const DataContextProvider = (props) => {
  const [organizations, setOrganizations] = useState([]);
  const [activeOrganization, setActiveOrganization] = useState("");
  const [activeBoard, setActiveBoard] = useState("");
  const [activeBoardData, setActiveBoardData] = useState({
    name: "",
    columns: [],
    tickets: [],
  });
  const [activeTicket, setActiveTicket] = useState("");

  const setOrganizationsHandler = (orgs) => {
    setOrganizations(orgs);
  };

  const setActiveOrganizationHandler = (e) => {
    let id = e.target.id;

    const targetOrg = organizations.find((obj) => obj.id == id);

    setActiveOrganization(targetOrg);
  };

  const setActiveBoardHandler = (data) => {
    setActiveBoard(data);
  };

  const setActiveBoardDataHandler = (data) => {
    setActiveBoardData(data);
  };

  const setActiveTicketHandler = (ticket) => {
    setActiveTicket(ticket);
  };

  const contextValue = {
    organizations: organizations,
    activeOrganization: activeOrganization,
    activeBoard: activeBoard,
    activeBoardData: activeBoardData,
    activeTicket: activeTicket,
    setOrganizations: setOrganizationsHandler,
    setActiveOrganization: setActiveOrganizationHandler,
    setActiveBoard: setActiveBoardHandler,
    setActiveBoardData: setActiveBoardDataHandler,
    setActiveTicket: setActiveTicketHandler,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
