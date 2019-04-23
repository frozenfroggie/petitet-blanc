import React from "react";
import { Link } from "gatsby";
import styled from "styled-components"

import github from "../img/github-icon.svg";
import logo_white from "../img/logo_white.png";
import logo_green from "../img/logo_green.png";

const NavStyled = styled.nav`
  top: 0px;
  position: fixed;
  width: 100vw;
  background-color: #339933;
  height: 60px;
  z-index: 100;
  color: white;
  font-size: 1.1em;
  transition: all .4s;
`

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-contet: space-between;
`

const NavBrand = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 4%;
`

const StyledLink = styled(Link)`
  display: flex;
  justify-items: center;
  align-items: center;
  height: 100%;
  padding-left: 20px;
`


const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: ""
            });
      }
    );
  };

  render() {
    return (
      <NavStyled
        style={typeof window !== 'undefined' && window.scrollY > 0.5 * window.innerHeight ? {backgroundColor: 'rgb(245,245,245)', color: '#339933', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'} : {}}
        role="navigation"
        aria-label="main-navigation">
        <NavContainer>
          <NavBrand>
            <StyledLink to="/" title="Logo">
              {
                typeof window !== 'undefined' && window.scrollY > 0.5 * window.innerHeight ?
                <img src={logo_green} alt="Petitet Blanc Logo" style={{ width: "auto", height: '40px' }} />
                :
                <img src={logo_white} alt="Petitet Blanc Logo" style={{ width: "auto", height: '40px' }} />
              }

            </StyledLink>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              style={typeof window !== 'undefined' && window.innerHeight < window.scrollY ? {color: '#339933'} : {}}
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </NavBrand>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/blog">
                BLOG
              </Link>
              <Link className="navbar-item" to="/products">
                NASZE PSY
              </Link>
              <Link className="navbar-item" to="/about">
                NASZE MIOTY
              </Link>
              <Link className="navbar-item" to="/contact">
                GROOMING
              </Link>
              <Link className="navbar-item" to="/contact/examples">
                GALERIA
              </Link>
              <Link className="navbar-item" to="/contact/examples">
                KONTAKT
              </Link>
            </div>
          </div>
        </NavContainer>
      </NavStyled>
    );
  }
};

export default Navbar;
