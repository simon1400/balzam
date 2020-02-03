import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import HeaderLogo from "./components/header-logo";
import LeavesLeft from "./components/leaves-left";
import LeavesRight from "./components/leaves-right";

import sanityClient from "../lib/sanity.js";

const query = `*[_type == "menu"] | order(rating) {
  _id,
  title,
  menuUrl
}[0...7]
`;

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {},
      toggle: false
    };
    this.getData = this.getData.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    sanityClient
      .fetch(query)
      .then(this.getData)
      .catch(err => console.log(err));
  }

  getData(menu) {
    this.setState({
      menu: menu
    });
  }

  toggle() {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    var menu = this.state.menu;
    return (
      <header id="header" className="header_homepage uk-height-viewport uk-position-relative">
        <nav className="top_nav uk-visible@m">
          <ul>
            {menu[0] ? menu.map((link, index) =>
                <li key={index}>
                  <Link to={link.menuUrl} scroll={el => el.scrollIntoView({behavior: "smooth",block: "start"})}>{link.title}</Link>
                </li>)
              : ""}
          </ul>
        </nav>

        <div className="responsive_head uk-hidden@m">
          <button className={`hamburger hamburger--collapse${this.state.toggle ? ' is-active' : ''}`} type="button" onClick={() => this.toggle()}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>

          <nav className={this.state.toggle ? 'active_nav' : ''}>
            <ul>
              {menu[0] ? menu.map((link, index) =>
                  <li key={index}>
                    <Link to={link.menuUrl} scroll={el => el.scrollIntoView({behavior: "smooth",block: "start"})}>{link.title}</Link>
                  </li>)
                : ""}
            </ul>
          </nav>
        </div>

        <HeaderLogo />
        <LeavesLeft />
        <LeavesRight />
      </header>
    );
  }
}
