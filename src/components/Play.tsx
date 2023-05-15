import React from "react";
import { Outlet } from "react-router-dom";
class Play extends React.Component {
  render() {
    return (
      <div>
        <Outlet />
        Play
      </div>
    );
  }
}

export default Play;
