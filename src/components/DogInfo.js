import React from 'react'
import { FaMars, FaVenus } from 'react-icons/fa';
import classNames from 'classnames';

import Modal from './Modal.js';
import Lightbox from './Lightbox.js';

import defaultDog from '../img/default_dog.png'
import lineage from '../img/lineage.png'

const DogInfo = props => (
  <div className="is-parent centered column is-12" key={props.id}>
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
          <div>
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
                props.birthDate
                :
                props.exhibitionDate ?
                  props.exhibitionDate
                  :
                  ' - '
            }
            </strong></p>
            {
              props.lineage &&
                <div style={{marginTop: 23}}>
                  <p className="is-size-6">Rodowód:</p>
                  <a target="_blank" rel="noopener noreferrer" href={props.lineage}>
                    <div className="certificate" style={{
                      backgroundImage: `url(${lineage})`,
                      backgroundSize: 'cover'
                    }}>
                    </div>
                  </a>
                </div>
            }
          </div>
        </div>
        <div className="column is-6">
          <div >
            {
              props.achievements ?
              <p className="is-size-6" style={{marginBottom: 0}}>Osiągnięcia:</p>
              :
              <p className="is-size-6" style={{marginBottom: 0}}>Szczenięta:</p>
            }
            <ul className={'puppies-list'}>
              <strong>
                {
                  props.achievements && props.achievements.length > 0 && props.achievements[0] !== '' ?
                    props.achievements.map((achivement, idx) => <li key={idx} className='is-size-5'> { achivement || " - " } </li>)
                  :
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
                              <span className="gender-symbols"><FaVenus size="1.5em" style={{color: '#FF0075'}} /></span>
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
          <div style={{padding: "20px 0px"}}>
            <p className="is-size-6 dog-info-subheader">Galeria:</p>
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
