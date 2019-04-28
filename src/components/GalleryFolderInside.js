import React from 'react'
import classNames from 'classnames'

import Modal from './Modal.js';
import Lightbox from './Lightbox.js';
import defaultDog from '../img/default_dog.png'

const GalleryFolderInside = props => {
  return (
  <div
    className="is-parent column is-12"
    key={props.id}>
        <ul className="columns is-multiline gallery-folder-list">
          {
            props.galleryImages && props.galleryImages.map(({image}, idx) => {
              return (
                <li key={idx} className="column is-4">
                  <div className="gallery-folder-image" style={{
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
          {
            props.galleryImages && props.galleryImages.map(({image}, idx) => {
              return (
                <li key={idx} className="column is-3">
                  <div className="gallery-image" style={{
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
        </ul>
  </div>
)}

export default GalleryFolderInside
