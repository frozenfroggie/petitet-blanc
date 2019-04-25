import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled, { keyframes } from "styled-components"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import wallpaper from '../img/wallpaper.jpg'
import wallpaper_mobile from '../img/wallpaper_mobile.jpg'
import federations from '../img/federations.png'

const WallpaperBlurredContainer = styled.div`
  position: fixed;
  top: 60px;
  width: 100vw;
  height: 100vh;
  z-index: 97;
  background-position: 48%;
  background-size: cover;
  background-image: url(${wallpaper_mobile});
  @media only screen and (min-width: 1088px) {
    grid-template-rows: 40% 34% 21%;
    background-image: url(${wallpaper});
  }
  transition: 1s filter;
`

const WallpaperBlurredComponent = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blur: 0
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
  onScroll = (e) => {
    const { innerHeight, scrollY } = window;
    // console.log(e)
    if(scrollY > 0.25 * innerHeight) {
      this.setState({
        blur: 5
      })
    } else {
      this.setState({
        blur: 0
      })
    }
  }
  render() {
    return (
      <WallpaperBlurredContainer style={{
        filter: `blur(${this.state.blur}px)`
      }}>
      </WallpaperBlurredContainer>
    )
  }
}

export default WallpaperBlurredComponent
