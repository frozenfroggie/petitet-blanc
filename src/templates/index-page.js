import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled, { keyframes } from "styled-components"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import WallpaperBlurredComponent from '../components/WallpaperBlurredComponent'
import Card from '../components/Card'

import wallpaper from '../img/wallpaper.jpg'
import wallpaper_mobile from '../img/wallpaper_mobile.jpg'
import federations from '../img/federations.png'

/* position: fixed; */

const WallpaperContainer = styled.div`
  /* background-color: blue; */
  z-index: 1000;
  top: 0px;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 52% 29% 19%;
  grid-template-areas: "federationsContainer . ." "headerMain headerMain headerMain" " scrollDown scrollDown scrollDown";
  grid-template-columns: 50% 35% 15%;
  transition: all .2s;
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
  top: -10px;
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

// const Section = styled.section`
//   /* position: relative; */
//   /* top: -50vh; */
//   /* margin: 50px 0px; */
//   width: 100vh;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transform: rotate(90deg);
//   transform-origin: right top;
//   border: 1px dotted blue;
// `
//
// const SectionMain = styled.section`
//   z-index: 98;
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   width: 100vh;
//   height: 100vw;
//   border: 1px solid red;
//   /* background-color: red; */
//   transform: rotate(-90deg) translateY(-50vw);
//   transform-origin: right top;
//   overflow-y: auto;
//   overflow-x: hidden;
// `

const Section = styled.section`
  z-index: 10000;
  width: 100vw;
  min-height: 100vh;
  /* border: 1px solid blue; */
  /* background-color: blue; */
  /* transform: rotate(90deg) translate(50vh, 50vh); */
  transform: rotate(90deg) translateX(-200vh);
  margin-top: 100vh;
  transform-origin: left bottom;
  /* background-color: red; */
  /* border: 1px solid blue; */
`

const SectionMain = styled.section`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 99;
  width: 100vh;
  height: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  transform: rotate(-90deg) translateY(-100vh);
  transform-origin: right top;
`

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  showDog,
  blur
}) => (
    <SectionMain>
      <Section>
        <WallpaperContainer style={
          blur === 0 ? {
            opacity: 1,
            transform: 'translateY(0%)'
          } : {
            opacity: 0,
            transform: 'translateY(-10%)'
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
            const innerHeight = window.innerHeight;
            console.log(innerHeight)
            window.scrollTo({
              top: innerHeight,
              behavior: 'smooth'
              });
            }}>
            <a href="#thanks"><span></span></a>
          </ScrollDown>
        </WallpaperContainer>
      </Section>
      {
        showDog.map((shouldShowCard, idx) => (
            <Section>
              <Card
                img={require(`../img/dog${idx + 1}.jpg`)}
                shouldShowCard={shouldShowCard}
                idx={idx}>
                {
                  idx === 0 ?
                    'Blog' :
                    idx === 1 ?
                    'Nasze Psy' :
                      idx === 2 ?
                      'Nasze Mioty' :
                      'Grooming'
                }
              </Card>
            </Section>
        ))
      }
    </SectionMain>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDog: [true, true, true, true],
      blur: 0,
      currentDog: 0,
      minX: 0,
      minY: 0,
      swipeDet: {
        sX: 0,
        sY: 0,
        eX: 0,
        eY: 0
      }
    }
  }
  componentDidMount() {
    // window.addEventListener('scroll', this.onScroll);
    // window.addEventListener('wheel', this.onWheel);
    // this.detectSwipe('aboutDescription', this.swipeDetected);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('wheel', this.onWheel)
  }
  onWheel = (e) => {
    let delta;

    if (e.wheelDelta) {
      delta = e.wheelDelta;
    } else {
      delta = -1 * e.deltaY;
    }
    console.log(this.state.currentDog)
    if (delta < 0){
      // console.log(window.pageYOffset, window.innerHeight)
      this.showNextDog()
    } else if (delta > 0){
      console.log("UP");
      this.showPreviousDog()
    }
    e.preventDefault();
  }
  showNextDog = () => {
    if(this.state.currentDog + 1 <= 4) {
      // const innerHeight = Math.min(document.documentElement.clientHeight, window.screen.height, window.innerHeight);
      console.log(document.documentElement.clientHeight)
      console.log(window.screen.height)
      console.log(window.innerHeight)
      console.log(window.visualViewport.height)
      const innerHeight = window.visualViewport.height;
      // alert(document.documentElement.clientHeight, window.screen.height, window.innerHeight)
      window.scrollTo({
         top: (this.state.currentDog + 1) * innerHeight,
         behavior: 'smooth'
       })
    }
  }
  showPreviousDog = () => {
    // const innerHeight = Math.min(document.documentElement.clientHeight, window.screen.height, window.innerHeight);
    const innerHeight = window.visualViewport.height;
    window.scrollTo({
      top: (this.state.currentDog - 1) * innerHeight,
      behavior: 'smooth'
    })
  }
  onScroll = (e) => {
    // console.log(e)
    const { scrollY } = window;
    // const innerHeight = Math.min(document.documentElement.clientHeight, window.screen.height, window.innerHeight);
    const innerHeight = window.visualViewport.height;
    const showDogLen = this.state.showDog.length;
    let showDogCopy = Object.assign([], this.state.showDog);
    let currentDog = 0;
    for(let i = 0; i < showDogLen; i++) {
      if(scrollY >= (i + 1) * innerHeight) {
        currentDog = i + 1;
        showDogCopy[i] = true;
      } else {
        showDogCopy[i] = false;
      }
    }

    if(scrollY > 0.25 * innerHeight) {
      this.setState({
        blur: 5,
        showDog: showDogCopy,
        currentDog
      })
    } else {
      this.setState({
        blur: 0,
        showDog: showDogCopy,
        currentDog
      })
    }
  }
  detectSwipe = (elementId, func) => {
    let swipe_det = {};
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    const min_x = 30;  //min x swipe for horizontal swipe
    // const max_x = 30;  //max x difference for horizontal swipe
    const min_y = 30;  //min y swipe for vertical swipe
    // const max_y = 60;
    let direcX = 0;
    let direcY = 0;
    let element = document.getElementById(elementId);
    console.log(element)
    if(!element)
      return;
    element.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
      e.preventDefault();
    }, false);
    element.addEventListener('touchmove', (e) => {
      const horizontalSwipe = ((swipe_det.eX - min_x > swipe_det.sX) ||
      (swipe_det.eX + min_x < swipe_det.sX)) && (swipe_det.eX > 0);
      const verticalSwipe = ((swipe_det.eY - min_y > swipe_det.sY) ||
      (swipe_det.eY + min_y < swipe_det.sY)) && (swipe_det.eY > 0);
      console.log(horizontalSwipe, verticalSwipe)
      if (horizontalSwipe || verticalSwipe) {
        e.preventDefault();
      }
      const t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    }, false);
    element.addEventListener('touchend', () => {
      //horizontal detection
      const shouldSwipeHorizontally = ((swipe_det.eX - min_x > swipe_det.sX) ||
      (swipe_det.eX + min_x < swipe_det.sX)) && (swipe_det.eX > 0);
      const shouldSwipeVertically = ((swipe_det.eY - min_y > swipe_det.sY) ||
      (swipe_det.eY + min_y < swipe_det.sY)) && (swipe_det.eY > 0);
      if (shouldSwipeHorizontally) {
        if(swipe_det.eX > swipe_det.sX) direcX = -1;
        else direcX = 1;
      } else if (shouldSwipeVertically) {
        if(swipe_det.eY > swipe_det.sY) direcY = -1;
        else direcY = 1;
      }

      if (direcX !== 0 || direcY !== 0) {
        if (typeof func == 'function') func(direcX, direcY);
      }
      direcX = 0;
      direcY = 0;
      swipe_det.sY = 0;
      swipe_det.eY = 0;
      swipe_det.sX = 0;
      swipe_det.eX = 0;
    }, false);
  }
  swipeDetected = (directionX, directionY) => {
    if(directionY > 0) {
      this.showNextDog();
    } else if(directionY < 0) {
      this.showPreviousDog();
    }
  }
  render() {
    const { frontmatter } = this.props.data.markdownRemark
    return (
      <Layout>
        <IndexPageTemplate
          showDog={this.state.showDog}
          blur={this.state.blur}
          image={frontmatter.image}
          title={frontmatter.title}
          heading={frontmatter.heading}
          subheading={frontmatter.subheading}
          mainpitch={frontmatter.mainpitch}
          description={frontmatter.description}
          intro={frontmatter.intro}
        />
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
