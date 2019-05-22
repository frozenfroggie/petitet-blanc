import React from 'react'
import styled from "styled-components"

import wallpaper from '../img/wallpaper.jpg'
import wallpaper_mobile from '../img/wallpaper.jpg'

const WallpaperBlurredContainer = styled.div`
  position: fixed;
  top: 60px;
  width: 100vw;
  height: 100vh;
  z-index: 97;
  background-position: 55%;
  background-size: cover;
  background-image: url(${wallpaper_mobile});
  @media only screen and (min-width: 1088px) {
    background-position: 48%;
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
    const sectionMain = document.getElementById('sectionMain');
    sectionMain && sectionMain.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    const sectionMain = document.getElementById('sectionMain');
    sectionMain && sectionMain.removeEventListener('scroll', this.onScroll)
  }
  onScroll = (e) => {
    const { innerHeight } = window;
    const { scrollTop } = document.getElementById('sectionMain');
    // console.log(e)
    if(scrollTop > 0.5 * innerHeight) {
      this.setState({
        blur: 3
      })
    } else {
      this.setState({
        blur: 0
      })
    }
  }
  render() {
    if(typeof window !== 'undefined' && window.location.pathname !== '/' && this.state.blur === 0) {
      this.setState({
        blur: 3
      })
    }
    return (
      <WallpaperBlurredContainer style={{
        filter: `blur(${this.state.blur}px)`
      }}>
      </WallpaperBlurredContainer>
    )
  }
}

export default WallpaperBlurredComponent
