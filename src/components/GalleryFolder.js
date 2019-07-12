import React from 'react'
import classNames from 'classnames'
import defaultDog from '../img/default_dog.png'
import { Link } from 'gatsby'

import { FaCamera } from 'react-icons/fa';

const GalleryFolder = props => {
  return (
  <div
    style={{display: 'flex', justifyContent: 'center', marginBottom: '50vh'}}
    className="is-parent column is-4"
    key={props.id}>
    <Link to={props.slug}>
      <div key={`folder-${props.id}`} className={classNames("is-child", "folder")} onClick={() => props.openFolder()}>
        {
          props.galleryImages && props.galleryImages.length > 0 && props.galleryImages.slice(0,3).map(({image}, idx) => (
            <img key={`image-${idx}`} className={classNames('folder-image', `folder-image-${idx}`)}
              src={!!(image && image.childImageSharp) ? image.childImageSharp.fluid.src : defaultDog} />
          ))
        }
        <FaCamera className="camera" size="1.1em" color="#fff"/>
        <div className="title is-size-5" style={{color: "#339933"}}>
          { props.title + ` (${props.galleryImages.length})`}
        </div>
      </div>
    </Link>
  </div>
)}

export default GalleryFolder
