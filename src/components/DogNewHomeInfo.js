import React from 'react'

import Modal from './Modal.js';
import Lightbox from './Lightbox.js';

import defaultDog from '../img/default_dog.png'

const DogNewHomeInfo = props => (
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
          <p>
          {
            props.description
          }
          </p>
        </div>
        <div className="column is-6">
          <div style={{padding: "20px 0px"}}>
            <h2 className="is-size-5"><strong>Galeria:</strong></h2>
            <ul className="gallery">
              {
                props.galleryImages && props.galleryImages.map(({image}, idx) => {
                  return (
                    <li key={idx} className="gallery-image">
                      <div className="dog" style={{
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

export default DogNewHomeInfo
