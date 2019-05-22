import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FaAngleRight, FaAngleLeft, FaTimesCircle } from 'react-icons/fa';

import './all.sass'

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
      minX: 0,
      swipeDet: {
        sX: 0,
        sY: 0,
        eX: 0,
        eY: 0
      }
    }
  }
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    this.setState({
      selectedImage: this.props.currentImage
    })
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }
  nextImage = (directionX) => {
    if(directionX < 0) {
      this.goBack()
    } else {
      this.goForward();
    }
  }
  handleClick = (e, index) => {
    e.preventDefault()
    this.setState({ selectedImage: index })
  }
  goBack = () => {
    if (this.state.selectedImage > 0) {
      this.setState({ selectedImage: this.state.selectedImage - 1 })
    }
  }
  goForward = () => {
    if (this.state.selectedImage < this.props.images.length - 1) {
      this.setState({ selectedImage: this.state.selectedImage + 1 })
    }
  }
  handleKeyUp = e => {
    console.log(e)
    const { keyCode } = e
    // alert(keyCode)
    if (keyCode === 37) {
      // Left Arrow Key
      this.goBack();
    }
    if (keyCode === 39) {
      // Right Arrow Key
      this.goForward();
    }
    if (keyCode === 27) {
      // Escape key
      this.props.onClose();
    }
  }
  handleTouchStart = (e) => {
    const { swipeDet } = this.state;
    const t = e.touches[0];
    swipeDet.sX = t.screenX;
    swipeDet.sY = t.screenY;
    this.setState({
      swipeDet
    })
  }
  handleTouchMove = (e) => {
    const { swipeDet, minX } = this.state;
    // const horizontalSwipe = ((swipeDet.eX - minX > swipeDet.sX) ||
    // (swipeDet.eX + minX < swipeDet.sX)) && (swipeDet.eX > 0);
    // if (horizontalSwipe) {
    //   return;
    // }
    const t = e.touches[0];
    swipeDet.eX = t.screenX;
    swipeDet.eY = t.screenY;
    this.setState({
      swipeDet
    })
  }
  handleTouchEnd = (e) => {
    let direcX = 0;
    const { swipeDet, minX } = this.state;
    const shouldSwipeHorizontaly = ((swipeDet.eX - minX > swipeDet.sX) ||
    (swipeDet.eX + minX < swipeDet.sX)) && (swipeDet.eX > 0);
    if (shouldSwipeHorizontaly) {
      if(swipeDet.eX > swipeDet.sX) {
        direcX = -1;
      } else {
        direcX = 1;
      }
    }
    if (direcX !== 0) {
      this.nextImage(direcX);
    }
    swipeDet.sX = 0;
    swipeDet.eX = 0;
    this.setState({
      swipeDet
    })
  }
  render() {
    const { images } = this.props
    const { selectedImage } = this.state
    return (
      <div className="gallery-modal">
        <div className="gallery"
          onTouchStart={e => this.handleTouchStart(e)}
          onTouchMove={e => this.handleTouchMove(e)}
          onTouchEnd={e => this.handleTouchEnd(e)}>
          <img alt="Podgląd zdjęcia" className="gallery-image" src={images[selectedImage].image.src} />
          <button className="gallery-button-container gallery-button-left" onClick={this.goBack}>
            <div className="button gallery-button">
              <FaAngleLeft size="2em" />
            </div>
          </button>
          {
            images[selectedImage].description !== '' &&
              <div className="gallery-image-description">
                {
                  images[selectedImage].description
                }
              </div>
          }
          <button className="gallery-button-container gallery-button-right" onClick={this.goForward}>
            <div className="button gallery-button">
              <FaAngleRight size="2em" />
            </div>
          </button>
          <div className="gallery-close" onClick={this.props.onClose} >
            <FaTimesCircle size="2em" />
          </div>
        </div>
      </div>
    )
  }
}

Lightbox.propTypes = {
  images: PropTypes.array.isRequired,
}

export default Lightbox
