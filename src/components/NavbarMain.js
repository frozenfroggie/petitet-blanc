import React from 'react'
import { Link } from 'gatsby'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navigate, globalHistory } from '@reach/router';

import classNames from 'classnames'

let $navbarBurgers;

const NavbarMain = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbHover: false,
      expandDropdown: {
        home: false,
        puppies: false,
        dogs: false,
      }
    }
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
  componentDidUpdate() {
    console.log('update')
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
  getDashboardData() {
    console.log('Success!')
  }
  render() {
    let style;
    let isScrolled = false;
    let isMainPage = false;
    isMainPage = globalHistory.location.pathname === '/';
    style = {height: 100, position: 'fixed', width: '100vw'}
    if(typeof window !== 'undefined') {
      isScrolled = window.scrollY >= window.innerHeight;
      if(isMainPage && isScrolled) {
        style = {'backgroundColor': 'white', height: 70, width: '100vw', position: 'fixed', boxShadow: '0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)'}
      }
    }
    return (
      <nav
        className={classNames("navbar", "is-transparent")}
        style={style}
        role="navigation"
        aria-label="main-navigation">
        <div className="container" >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <div className="navbar-logo" style={{overflow: 'hidden', position: 'relative'}}>
              </div>
            </Link>
            <div className="fb-mobile navbar-end has-text-centered flex-centered mobile-only">
              <a className="navbar-item"
                href="https://www.facebook.com/aria.kowalska"
                target="_blank"
                rel="noopener noreferrer">
              </a>
            </div>
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu" style={{'zIndex': 1000}}>
            <div className="navbar-start has-text-centered">
              <div className="nav-dropdown-container"
                onMouseLeave={() => this.hideDropdown('home')}>
                <div className={classNames("navbar-item", "navbar-item-hoverable", {"active":  typeof window !== 'undefined' && window.location.pathname === '/dogs'})}
                  onMouseOver={() => this.expandDropdown('home')}>
                  Strona Główna
                  </div>
                  <TransitionGroup className='dropdown'>
                    <CSSTransition
                      key={this.state.expandDropdown.home}
                      timeout={400}
                      classNames='transition-opacity'>
                      <ul className={classNames("nav-dropdown", {"nav-dropdown-expand": this.state.expandDropdown.home})}>
                        <li>
                          <div className="navbar-item" onClick={() => this.navigateTo("/#about")}>
                            O mnie
                          </div>
                        </li>
                        <li>
                          <div className="navbar-item" onClick={() => this.navigateTo("/#news")}>
                            Aktualności
                          </div>
                        </li>
                        <li>
                          <div className="navbar-item" onClick={() => this.navigateTo("/#faq")}>
                            Informacje dla kupujących
                          </div>
                        </li>
                      </ul>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              <div className="nav-dropdown-container"
                onMouseLeave={() => this.hideDropdown('dogs')}>
                <div className={classNames("navbar-item", "navbar-item-hoverable", {"active":  typeof window !== 'undefined' && window.location.pathname === '/dogs'})}
                  onMouseOver={() => this.expandDropdown('dogs')}>Nasze Psy</div>
                  <TransitionGroup className='dropdown'>
                    <CSSTransition
                      key={this.state.expandDropdown.dogs}
                      timeout={400}
                      classNames='transition-opacity'>
                    <ul className={classNames("nav-dropdown", {"nav-dropdown-expand": this.state.expandDropdown.dogs})}>
                      <li>
                        <div className="navbar-item" onClick={() => this.navigateTo('/dogs/male', {gender: 'male'})}>
                          Psy
                        </div>
                      </li>
                      <li>
                        <div className="navbar-item"  onClick={() => this.navigateTo('/dogs/female', {gender: 'female'})}>
                          Suki
                        </div>
                      </li>
                    </ul>
                  </CSSTransition>
                </TransitionGroup>
              </div>
              <div className="nav-dropdown-container"
                onMouseLeave={() => this.hideDropdown('puppies')}>
                <div className="navbar-item navbar-item-hoverable"
                  onMouseOver={() => this.expandDropdown('puppies')}>Szczenięta</div>
                  <TransitionGroup className='dropdown'>
                    <CSSTransition
                      key={this.state.expandDropdown.puppies}
                      timeout={400}
                      classNames='transition-opacity'>
                  <ul className={classNames("nav-dropdown", {"nav-dropdown-expand": this.state.expandDropdown.puppies})}>
                    <li>
                      <Link className="navbar-item" to="/puppies/litters">
                        Nasze mioty
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/puppies/new-home">
                        Pieski w nowym domu
                      </Link>
                    </li>
                  </ul>
                </CSSTransition>
              </TransitionGroup>
              </div>
              <Link className="navbar-item navbar-item-hoverable" to="/exhibitions">
                Wystawy
              </Link>
              <Link className="navbar-item navbar-item-hoverable" to="/gallery">
                Galeria
              </Link>
              <Link className="navbar-item navbar-item-hoverable" to="/contact">
                Kontakt
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <a className="navbar-item"
                href="https://www.facebook.com/aria.kowalska"
                target="_blank"
                rel="noopener noreferrer">
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavbarMain
