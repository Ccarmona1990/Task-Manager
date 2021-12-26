import React from 'react';
import { Outlet, Link } from "react-router-dom";

// import Todo from './pages/Todo';
// import Auth from './pages/Auth';

// <Todo /> 
// {/* {<Auth/>} */}

const Layout = () => {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Authentication</Link>
          </li>
          <li>
            <Link to="/task-manager">task manager</Link>
          </li>
        </ul>
      </nav> */}

      <Outlet />
    </>
  )
};

export default Layout;