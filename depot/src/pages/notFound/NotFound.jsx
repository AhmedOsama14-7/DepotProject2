import React from "react";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="img">
        <RiEmotionUnhappyLine />
      </div>

      <h6>404 error</h6>
      <p>The page requested couldn't be found. This could be a spelling error in the URL or a removed page.</p>
      <div className="button">
        <NavLink to={"/"} >Return to Home Page</NavLink>
      </div>
      
    </section>
  );
}
