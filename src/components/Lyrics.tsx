import React from "react";
import { Outlet } from "react-router-dom";
class Lyrics extends React.Component {
  render() {
    return (
      <div>
        <Outlet />
        Lyrics
      </div>
    );
  }
}

export default Lyrics;
