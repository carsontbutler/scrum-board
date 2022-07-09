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
  setActiveTicket: (ticket) => {}
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
    console.log('setActiveOrganization: ', e);
    let id = e.target.id;
    console.log(id);
    const targetOrg = organizations.find((obj) => obj.id == id);
    console.log(targetOrg);
    console.log(activeOrganization);
    setActiveOrganization(targetOrg);
    console.log(activeOrganization);
    console.log(activeBoard);
    if (targetOrg.boards.length > 0) {
      setActiveBoard(targetOrg.boards[0]);
      console.log(activeBoard);
    } else {
      setActiveBoard(); //either redirect to board creation page, or set a "noBoards" var to true, which allows rendering of a createboard component
    }
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
    setActiveTicket: setActiveTicketHandler
  };



  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
