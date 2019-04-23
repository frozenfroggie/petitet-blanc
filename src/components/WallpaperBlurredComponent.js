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
  top: 50px;
  width: 100%;
  background-position: 48%;
  background-size: cover;
  background-image: url(${wallpaper_mobile});
  @media only screen and (min-width: 1088px) {
    grid-template-rows: 40% 34% 21%;
    background-image: url(${wallpaper});
  }
  transition: 1s filter;
`

const WallpaperContainer = styled.div`
  position: relative;
  top: -30px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 52% 29% 18%;
  grid-template-areas: "federationsContainer . ." "headerMain headerMain headerMain" " scrollDown scrollDown scrollDown";
  grid-template-columns: 50% 35% 15%;
  transition: all .2s;
`

const WallpaperBlurred = styled.div`
  z-index: 1;
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  overflow: hidden;
  width: 100vw;
  background-position: 48%;
  background-size: cover;
  background-image: url(${wallpaper_mobile});
  @media only screen and (min-width: 1088px) {
    grid-template-rows: 40% 34% 21%;
    background-image: url(${wallpaper});
  }
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0; right: 0; bottom: 0; left: 0;
    background-position: 48%;
    background-size: cover;
    background-image: url(${wallpaper_mobile});
    @media only screen and (min-width: 1088px) {
      grid-template-rows: 40% 34% 21%;
      background-image: url(${wallpaper});
    }
    box-shadow: inset 0 0 3000px rgba(255,255,255,.5);
    filter: blur(1px);
    margin: -20px;
  }
`


const FederationsContainer = styled.div`
  display: grid;
  grid-area: federationsContainer;
  align-self: end;
  justify-self: center;
  height: 90px;
  width: 100%;
  padding-top: 30px;
  margin-left: 10px;
  &:img {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media only screen and (min-width: 1088px) {
    align-items: center;
    justify-items: start;
    padding-left: 10vw;
  }
`

const ImgFederations = styled.img`
  width: 200px
`

const SpanBigSlim = styled.span`
  position: relative;
  font-weight: 200;
  color: #339933;
  font-size: 1.95em;
  letter-spacing: 0.9px;
  @media only screen and (min-width: 1088px) {
    font-size: 2.15em;
  }
`
const SpanStyled = styled.span`
  letter-spacing: 1px;
  left: -1px;
  font-size: 1em;
  font-weight: ${props => props.weight};
  white-space: pre;
  @media only screen and (min-width: 1088px) {
    white-space: normal;
    font-size: 1.1em;
  }
`

const SpanStyledBottom = styled(SpanStyled)`
  position: relative;
  top: -15px;
  @media only screen and (min-width: 1088px) {
    top: 0px;
    left: 4px;
  }
`

const HeaderMain = styled.h1`
  font-size: 1.5em;
  height: auto;
  line-height: 2em;
  padding-top: 25px;
  padding-bottom: 0px;
  width: 100%;
  color: #339933;
  grid-area: headerMain;
  background: radial-gradient(circle at center,hsla(0,0%,98%,.9),transparent 100%);
  align-self: end;
  text-align: center;
  white-space: pre-wrap;
  &:strong {
    color: #339933 !important;
  }
  @media only screen and (min-width: 1088px) {
    text-align: left;
    padding-left: 10vw;
    background: none;
  }
`

const scrollDownAnimation = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translate(0, 20px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}`

const ScrollDown = styled.div`
  grid-area: scrollDown;
  position: relative;
  top: -20px;
  left: 50%;
  width: 30px;
  height: 50px;
  margin-left: -15px;
  border: 2px solid #339933;
  border-radius: 50px;
  box-sizing: border-box;
  align-self: center;
  &:before {
    position: absolute;
    top: 10px;
    left: 50%;
    content: '';
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background-color: #339933;
    border-radius: 100%;
    -webkit-animation: ${scrollDownAnimation} 2s infinite;
    animation: ${scrollDownAnimation} 2s infinite;
    box-sizing: border-box;
  }
  &:hover {
    cursor: pointer;
  }
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
  onScroll = () => {
    const { innerHeight, scrollY } = window;
    console.log(innerHeight, scrollY)
    if(scrollY > 0.5 * innerHeight) {
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
        <WallpaperContainer style={
          this.state.blur === 0 ? {
            opacity: 1
          } : {
            opacity: 0
          }}>
          <FederationsContainer>
            <ImgFederations src={federations}  />
          </FederationsContainer>
          <HeaderMain>
            <SpanBigSlim>Petit & Blanc</SpanBigSlim><br/>
            <SpanStyled weight="100">
            {
              `hodowla psów rasowych`
            }
            </SpanStyled>
            <SpanStyledBottom weight="400">
            {
            `
bichon frise`
            }
            </SpanStyledBottom>
          </HeaderMain>
          <ScrollDown onClick={() => {
            const windowHeight = window.innerHeight;
            window.scrollTo({
              top: windowHeight,
                behavior: 'smooth'
              });
            }}>
            <a href="#thanks"><span></span></a>
          </ScrollDown>
        </WallpaperContainer>
      </WallpaperBlurredContainer>
    )
  }
}

export default WallpaperBlurredComponent
