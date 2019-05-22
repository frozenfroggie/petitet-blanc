import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaAt, FaUser, FaPhone, FaAngleDown, FaAngleUp, FaMoneyCheck, FaFacebookF } from 'react-icons/fa';
import styled from "styled-components"

const Field = styled.div`
  margin-bottom: 20px;
`

const FacebookField = styled.a`
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
    color: #339933;
  }
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValidated: false,
      showAccountDetails: false
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }
  toogleShowAccount = () => {
    this.setState(prevState => ({
      showAccountDetails: !prevState.showAccountDetails
    }))
  }
  render() {
    return (
      <Layout>
        <section className="section" style={{zIndex: 99, position: 'relative', top: '100px', marginBottom: '-100vh'}}>
          <div className="container container-contact">
            <div className="content columns">
              <div className="column is-6 contact">
                <Field className="is-size-5">
                  <div className="is-size-6 flex-centered-y"><FaPhone style={{transform: 'rotate(180deg)', marginRight: 8}}/>Telefon</div>
                  <div><strong>(+48) 604 419 577</strong></div>
                </Field>
                <Field className="is-size-5">
                  <div className="is-size-6 flex-centered-y"><FaAt style={{marginRight: 8}}/>E-mail</div>
                  <div><strong>madamar.magda@gmail.com</strong></div>
                </Field>
                <Field className="is-size-5 flex-centered-y facebook-container"
                  onMouseOver={() => this.setState({fbHover: true})} onMouseLeave={() => this.setState({fbHover: false})}>
                  <FacebookField
                    href="https://www.facebook.com/hodowlabichonfrise/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaFacebookF style={{color: '#339933', marginRight: 8, width: 15}} />
                    <div><strong style={{color: '#339933'}}>Odwiedź moją hodowlę na Facebooku</strong></div>
                  </FacebookField>
                </Field>
                <Field className="is-size-5 flex-centered-y facebook-container"
                  onMouseOver={() => this.setState({fbHover: true})} onMouseLeave={() => this.setState({fbHover: false})}>
                  <FacebookField
                    href="https://www.facebook.com/klub.bichona/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaFacebookF style={{color: '#339933', marginRight: 8, width: 15}} />
                    <div><strong style={{color: '#339933'}}>Klub miłośników Rasy Bichon Frise Polska</strong></div>
                  </FacebookField>
                </Field>
                <Field className="is-size-5">
                  <div className="is-size-6 flex-centered-y"><FaUser style={{marginRight: 8}}/>Adres</div>
                  <strong>Salon pielęgnacji psów - Plac Zwycięstwa 2,</strong><br/>
                  <strong>58-371 Boguszów-Gorce</strong><br/>
                </Field>
                <div style={{width: 250, position: 'relative', left: -2}} className="is-size-6 flex-centered-y show-account-details button-gold" onClick={this.toogleShowAccount}>
                  <FaMoneyCheck className="money-check"/>
                  Dane bankowe
                  {
                    this.state.showAccountDetails ?
                      <FaAngleUp style={{position: 'relative', top: 2, marginLeft: 8}}/>
                      :
                      <FaAngleDown style={{position: 'relative', top: 2, marginLeft: 8}}/>
                  }
                </div>
                <div className="account-details-wrapper">
                <TransitionGroup className='account-details-container'>
                  <CSSTransition
                    key={this.state.showAccountDetails}
                    timeout={300}
                    classNames='faq-slide-top'>
                    <div className="account-details">
                      {
                        this.state.showAccountDetails &&
                        <div>
                          <p>
                            Santander Bank Polska S.A.<br/>
                            61 1090 2590 0000 0001 3245 3078 <br/>
                            Magdalena Pilszak<br/>
                          </p>
                        </div>
                      }
                    </div>
                  </CSSTransition>
                </TransitionGroup>
                </div>
              </div>
              <div className="column is-6">
                <h3 style={{paddingBottom: 18}}>Napisz do mnie!</h3>
                <form
                  name="contact"
                  method="post"
                  action="/contact/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}>
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{' '}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        placeholder="Twoje imię"
                        className="input"
                        type={'text'}
                        name={'name'}
                        onChange={this.handleChange}
                        id={'name'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        placeholder="Twój e-mail"
                        className="input"
                        type={'email'}
                        name={'email'}
                        onChange={this.handleChange}
                        id={'email'}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <textarea
                        placeholder="Wiadomość"
                        className="textarea"
                        name={'message'}
                        onChange={this.handleChange}
                        id={'message'}
                        required={true}
                        rows="5"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <button className="button-gold" type="submit" style={{height: 58, marginTop: 18, paddingLeft: 50, paddingRight: 50}}>
                      Wyślij
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
