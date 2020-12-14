import React from "react";
import { Media } from "reactstrap";
import nomatch from "../404.png";
import ReactLogo from "../besinflogo.png";


export const NoMatch = () => {
  return (
    <div>
       <div class="text-center" >
        <Media middle href="#" >
          <Media object src={ReactLogo}  height="400" alt="logo" />
        </Media>
        </div>
      <div class="text-center" >
        <Media middle href="#" >
          <Media object src={nomatch}  height="400" alt="logo" />
        </Media>
        </div>
    </div>
  );
};
