import React from "react";
// import Layout from '../global/Layout';
import "lazysizes";
import Session from "./src/session.js";

//Wraps every page in a component
export const wrapPageElement = ({ element, props }) => (
  <Session>{element}</Session>
);
