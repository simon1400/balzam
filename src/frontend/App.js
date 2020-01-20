import React from 'react';

import { withRouter } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
import Routes from "./routes";

import "./assets/css/hamburgers.min.css";
import './styles/main.scss'

const App = () =>
    <div id="app">
      <Header />
      <Routes />
      <Footer />
    </div>


export default withRouter(App);
