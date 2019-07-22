import React from 'react'
import { Link } from 'gatsby'

import { FaFacebookF } from 'react-icons/fa';

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
                      <Link className="navbar-item" to="/dogs">
                        Nasze Psy
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/puppies/litters">
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
                <a className="socialLink" title="facebook" href="https://www.facebook.com/hodowlabichonfrise/">
                  <FaFacebookF color="#339933"></FaFacebookF>
                </a>
                <br/>
                <br/>
                <div>
                  <p><a target="_blank" href="https://www.facebook.com/dawid.pilszak.1">Graphic Design - Dawid Pilszak</a></p>
                  <p><a target="_blank" href="https://www.linkedin.com/in/jakub-wojtyra-07b783129/">Website Development - Jakub Wojtyra</a></p>
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
