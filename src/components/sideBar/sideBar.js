import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sideBar.css";

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [users, setUsers] = useState(null);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const response = await axios.get('http://localhost:3030/users'); 
              const userArray = response.data;
              if (userArray.length > 0) {
                setUsers(userArray[0]); 
              }
          } catch (error) {
              console.error('Error fetching user:', error);
          }
      };
  }, []);

  return (
        <div>
        <span className="sidebar-toggle" onClick={toggleSidebar}>&#9776;
        {isOpen ? '' : ''} 
        </span> 
          <div className={`sidebar ${isOpen ? 'open' : ''}`}>
              <p><strong>First Name:</strong> {users.firstName}</p>
              <p><strong>Last Name:</strong> {users.lastName}</p>
              <p><strong>Email:</strong> {users.email}</p>
         </div>
      </div>
  );
};

export default Sidebar;
