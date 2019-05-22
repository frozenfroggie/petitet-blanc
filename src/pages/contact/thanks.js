import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"

import Layout from '../../components/Layout'

const Thanks = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0px;
  margin-bottom: -150px;
  z-index: 99;
`

export default class Index extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Layout>
        <section className="section">
            <Thanks className="content">
              <h1>Dziękuję za wiadomość!</h1>
              <h3>Wkrótce się z Toba skontaktuje</h3>
              <Link className="link-check-bitches" to="/">
                <button className="button-gold" style={{marginTop: 40}}>
                  Powrót do strony głównej
                </button>
              </Link>
            </Thanks>
        </section>
      </Layout>
    )
  }
}
