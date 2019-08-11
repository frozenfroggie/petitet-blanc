import React from 'react'
import { FaMars, FaVenus, FaPaperclip } from 'react-icons/fa';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/pl';

import Modal from './Modal.js';
import Lightbox from './Lightbox.js';

import defaultDog from '../img/default_dog.png'

const DogInfo = props => (
  <div className="is-parent column is-12" key={props.id}>
    <div className="box notification is-full">
      <div className="columns">
        <div className="column is-6" >
            <div className="dog-info" style={{
              backgroundImage: `url(${
                !!(props.image && props.image.childImageSharp)
                  ? props.image.childImageSharp.fluid.src
                  : defaultDog
              })`
            }}></div>
          <div style={{padding: '0px 10px'}}>
            {
              props.homeName ?
                <div>
                  <p className="is-size-6 dog-info-subheader">Imię domowe:</p>
                  <p className="is-size-5"><strong>{ props.homeName }</strong></p>
                </div>
                :
                props.parents ?
                  <div>
                    <p className="is-size-6 dog-info-subheader">Rodzice:</p>
                    <div>
                      <div className="is-size-5"><FaMars style={{color: '#19A1FF'}} /> <strong>{ props.parents.father }</strong></div>
                      <div className="is-size-5"><FaVenus style={{color: '#FF0075'}} /> <strong>{ props.parents.mother }</strong></div>
                    </div>
                  </div>
                  :
                  props.dogs &&
                    <div style={{margin: 10}}>
                      <p className="is-size-6 dog-info-subheader">Wystawiane psy:</p>
                      <ul className="puppies-list">
                        {
                          props.dogs &&
                          props.dogs.map((dog, idx) => {
                            console.log(dog)
                            return (
                              <li key={idx} className="is-size-5">
                                <strong>{ dog.dog } </strong>
                                {
                                  dog.achievements && dog.achievements[0] !== '' &&
                                  <div style={{paddingLeft: 10}}>
                                    <span>Osiągnięcia: </span>
                                    <ul style={{paddingLeft: 10}}>
                                    {
                                      dog.achievements.map(achievement => <li><strong>{achievement}</strong></li>)
                                    }
                                    </ul>
                                  </div>
                                }
                              </li>
                            )}
                          )
                        }
                      </ul>
                    </div>
            }
            {
              props.dogs ?
                <p className="is-size-6 dog-info-subheader">Data wystawy:</p>
                :
                <p className="is-size-6 dog-info-subheader">Data urodzenia:</p>
            }
            <p className="is-size-5"><strong>
            {
              props.birthDate ?
                moment(props.birthDate).local().format("D MMMM YYYY")
                :
                props.exhibitionDate ?
                  moment(props.exhibitionDate).local().format("D MMMM YYYY")
                  :
                  ' - '
            }
            </strong></p>
            {
              props.lineage &&
                <div>
                  <p className="is-size-6 dog-info-subheader" style={{marginBottom: 5}}>Rodowód:</p>
                  <a target="_blank" rel="noopener noreferrer" href={props.lineage}>
                    <FaPaperclip size="2em" />
                  </a>
                </div>
            }
            {
              props.achievements && props.achievements.length > 0 &&
              <div>
                <p className="is-size-6 dog-info-subheader">Osiągnięcia:</p>
                <ul>
                  {
                    props.achievements.map((achievement, idx) => <li className="is-size-5" key={idx}><strong>{achievement}</strong></li>)
                  }
                </ul>
              </div>
            }
            {
              props.description &&
              <p style={{padding: '10px 0px'}}>
                {
                  props.description
                }
              </p>
            }
          </div>
        </div>
        <div className="column is-6">
          {
            props.puppies &&
            <div>
              <p className="is-size-6" style={{marginBottom: 0}}>Szczenięta:</p>
              <ul className={'puppies-list'}>
                <strong>
                  {
                    props.puppies && props.puppies.length > 0 && props.puppies[0] !== '' ?
                      props.puppies.map((puppie, idx) =>
                        (
                          <li className={classNames('is-size-5', {'puppie-available': puppie.available})} key={idx}>
                            <div className="puppie" key={'puppie-'+idx}>
                            { puppie.name }
                            {
                              puppie.gender === 'male' ?
                                <span className="gender-symbols"><FaMars size="1.5em" style={{color: '#19A1FF'}} /></span>
                                :
                                puppie.gender === 'female' ?
                                  <span className="gender-symbols"><FaVenus size="1.5em" style={{color: '#FF0075'}} /></span>
                                  :
                                  <span className="gender-symbols"></span>
                            }
                            </div>
                          </li>
                        ))
                        :
                        <li> - </li>
                  }
                </strong>
              </ul>
            </div>
          }
          <div style={{padding: "0px 0px"}}>
            <p className="is-size-6 dog-info-subheader" style={{padding: "0px 10px"}}>Galeria:</p>
            <ul className="gallery">
              {
                props.galleryImages && props.galleryImages.map(({image}, idx) => {
                  return (
                    <li key={idx} className="gallery-image">
                      <div key={'dog-' + idx} className="dog" style={{
                        backgroundImage: `url(${
                          !!(image && image.childImageSharp)
                            ? image.childImageSharp.fluid.src
                            : image
                        })`
                      }} onClick={e => props.openLightbox(idx, e)}>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {
            props.lightbox &&
            <Modal>
              <Lightbox
                backdropClosesModal
                images={props.photos}
                currentImage={props.currentImage}
                onClose={() => props.onClose()}
                />
            </Modal>
          }
        </div>
      </div>
    </div>
  </div>
)

export default DogInfo
