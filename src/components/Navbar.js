import React from "react";
import { Link } from "gatsby";
import styled from "styled-components"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navigate } from '@reach/router';
import classNames from 'classnames';

import logo_white from "../img/logo_white.png";
// import logo_green from "../img/logo_green.png";
// import cut from "../img/cut.png";

const NavStyled = styled.nav`
  top: 0px;
  position: fixed;
  width: 100vw;
  background-color: #339933;
  height: 68px;
  z-index: 100;
  color: white;
  font-size: 1.1em;
  transition: all .4s;
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
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

let $navbarBurgers;

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
      expandDropdown: {
        home: false,
        puppies: false,
        dogs: false,
      }
    };
  }
  componentDidMount() {
    // console.log(props.data)
    // // Get all "navbar-burger" elements
    // this.forceUpdate();
    $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    )
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target
          const $target = document.getElementById(target)

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active')
          $target.classList.toggle('is-active')
        })
      })
    }
  }
  expandDropdown = field => {
    const expandDropdownCopy = Object.assign({}, this.state.expandDropdown);
    expandDropdownCopy[field] = true;
    this.setState({
      expandDropdown: expandDropdownCopy
    });
  }
  hideDropdown = field => {
    const expandDropdownCopy = Object.assign({}, this.state.expandDropdown);
    expandDropdownCopy[field] = false;
    this.setState({
      expandDropdown: expandDropdownCopy
    });
  }
  navigateTo = (location, state = null) => {
    navigate(location, {
      state
    });
    $navbarBurgers.forEach(el => {
      const target = el.dataset.target
      const $target = document.getElementById(target)
      let isActive1 = el.classList.contains('is-active')
      let isActive2 = $target.classList.contains('is-active')
      console.log(isActive1)
      console.log(isActive2)
      // el.classList && el.classList.forEach(className => {
      //   if(className === 'is-active') {
      //     isActive = true
      //   }
      // })
      // if(isActive1) {
      el.classList.toggle('is-active')
      // }
      if(isActive2) {
        $target.classList.toggle('is-active')
      }
    })
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
        role="navigation"
        aria-label="main-navigation">
        <NavContainer>
          <NavBrand>
            <StyledLink to="/" title="Logo">
              {
                // typeof window !== 'undefined' && window.scrollY > 0.5 * window.innerHeight ?
                // <img src={logo_green} alt="Petitet Blanc Logo" style={{ width: "auto", height: '40px' }} />
                // :
                <img src={logo_white} alt="Petitet Blanc Logo" style={{ width: "auto", height: '40px' }} />
              }

            </StyledLink>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              // style={typeof window !== 'undefined' && window.innerHeight < window.scrollY ? {color: '#339933'} : {}}
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
              <div className="nav-dropdown-container"
                onMouseLeave={() => this.hideDropdown('dogs')}>
                <div className={classNames("navbar-item", "navbar-item-hoverable", {"active":  typeof window !== 'undefined' && window.location.pathname === '/dogs'})}
                  onMouseOver={() => this.expandDropdown('dogs')}>NASZE PSY</div>
                  <TransitionGroup className='dropdown'>
                    <CSSTransition
                      key={this.state.expandDropdown.dogs}
                      timeout={400}
                      classNames='transition-opacity'>
                    <ul className={classNames("nav-dropdown", {"nav-dropdown-expand": this.state.expandDropdown.dogs})}>
                      <li>
                        <div className="navbar-item" onClick={() => this.navigateTo('/dogs/male', {gender: 'male'})}>
                          PSY
                        </div>
                      </li>
                      <li>
                        <div className="navbar-item"  onClick={() => this.navigateTo('/dogs/female', {gender: 'female'})}>
                          SUKI
                        </div>
                      </li>
                      <li>
                        <div className="navbar-item"  onClick={() => this.navigateTo('/dogs/veteran', {gender: 'veteran'})}>
                          WETERANY
                        </div>
                      </li>
                      <li>
                        <div className="navbar-item"  onClick={() => this.navigateTo('/dogs/gone', {gender: 'gone'})}>
                          ODESZŁY OD NAS
                        </div>
                      </li>
                    </ul>
                  </CSSTransition>
                </TransitionGroup>
              </div>
              <div className="nav-dropdown-container"
                onMouseLeave={() => this.hideDropdown('puppies')}>
                <div className="navbar-item navbar-item-hoverable"
                  onMouseOver={() => this.expandDropdown('puppies')}>SZCZENIĘTA</div>
                  <TransitionGroup className='dropdown'>
                    <CSSTransition
                      key={this.state.expandDropdown.puppies}
                      timeout={400}
                      classNames='transition-opacity'>
                  <ul className={classNames("nav-dropdown", {"nav-dropdown-expand": this.state.expandDropdown.puppies})}>
                    <li>
                      <Link className="navbar-item" to="/puppies/litters">
                        NASZE MIOTY
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/puppies/new-home">
                        PIESKI W NOWYM DOMU
                      </Link>
                    </li>
                  </ul>
                </CSSTransition>
              </TransitionGroup>
              </div>
              <Link className="navbar-item" to="/grooming" style={{whiteSpace: 'pre'}}>
                GR<span style={{position: 'relative', top: 0, fontSize: '0.85em'}}>α</span>MING
              </Link>
              <Link className="navbar-item" to="/exhibitions">
                WYSTAWY
              </Link>
              <Link className="navbar-item" to="/gallery">
                GALERIA
              </Link>
              <Link className="navbar-item" to="/contact">
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
