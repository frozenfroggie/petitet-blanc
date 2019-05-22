import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo_white.png'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer id="footer" className="footer has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Kaldi"
            style={{ width: '14em', height: 'auto' }}
          />
        </div>
        <div className="content has-text-centered has-text-white-ter">
          <div className="container has-text-white-ter">
            <div className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/blog" className="navbar-item">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        Nasze Psy
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/products">
                        Szczenięta
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/grooming">
                        Grooming
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/exhibitions">
                        Wystawy
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/gallery">
                        Galeria
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Kontakt
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <br/>
                <br/>
                <div>
                  <p>Graphic Design - Dawid Pilszak</p>
                  <p>Website Development - Jakub Wojtyra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
