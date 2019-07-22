import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled, { keyframes } from "styled-components"
import { FaPaw } from 'react-icons/fa';
import { navigate } from '@reach/router';
import Tappable from 'react-tappable';

import ProgressBar from '../components/ProgressBar'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Modal from '../components/Modal.js';
import Newsletter from '../components/Newsletter.js';
import federations from '../img/federations3.png'

/* position: fixed; */

const WallpaperContainer = styled.div`
  /* background-color: blue; */
  z-index: 1000;
  top: 0px;
  height: 100vh;
  width: 100vw;
  display: grid;
  /* grid-template-rows: 25% 53% 22%; */
  /* grid-template-rows: 20% 50% 30%; */
  grid-template-rows: 22% 52% 26%;
  @media only screen and (min-width: 1088px) {
    grid-template-rows: 46% 34% 20%;
  }
  grid-template-areas: "federationsContainer . ." "headerMain headerMain headerMain" ". . .";
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
    padding-top: 0px;
  }
`

const ImgFederations = styled.img`
  width: 200px;
  opacity: 0.3;
  @media only screen and (min-width: 1088px) {
    width: 250px;
  }
`

const SpanBigSlim = styled.span`
  position: relative;
  font-weight: 300;
  color: #339933;
  font-size: 1.95em;
  letter-spacing: 0.9px;
  @media only screen and (min-width: 1088px) {
    letter-spacing: 1.2px;
    font-size: 3.75em;
  }
`

const SpanStyled = styled.span`
  position: relative;
  letter-spacing: 1px;
  left: -1px;
  font-size: 1em;
  font-weight: ${props => props.weight};
  white-space: pre;
  @media only screen and (min-width: 1088px) {
    white-space: normal;
    left: 2px;
    font-size: 1.24em;
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
//
// const scrollDownAnimation = keyframes`
//   0% {
//     transform: translate(0, 0);
//     opacity: 0;
//   }
//   40% {
//     opacity: 1;
//   }
//   80% {
//     transform: translate(0, 20px);
//     opacity: 0;
//   }
//   100% {
//     opacity: 0;
//   }
// }`
//
// const ScrollDown = styled.div`
//   grid-area: scrollDown;
//   position: relative;
//   top: -10px;
//   left: 50%;
//   width: 30px;
//   height: 50px;
//   margin-left: -15px;
//   border: 2px solid #339933;
//   border-radius: 50px;
//   box-sizing: border-box;
//   align-self: center;
//   &:before {
//     position: absolute;
//     top: 10px;
//     left: 50%;
//     content: '';
//     width: 6px;
//     height: 6px;
//     margin-left: -3px;
//     background-color: #339933;
//     border-radius: 100%;
//     -webkit-animation: ${scrollDownAnimation} 2s infinite;
//     animation: ${scrollDownAnimation} 2s infinite;
//     box-sizing: border-box;
//   }
//   &:hover {
//     cursor: pointer;
//   }
// `

const Section = styled.section`
  z-index: 10000;
  width: 100vw;
  min-height: 100vh;
  transform: rotate(90deg) translateX(-200vh);
  @media only screen and (min-width: 1088px) {
    /* margin-top: 100vh; */
  }
  transform-origin: left bottom;
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

const ProgressBarContainer = styled.section`
  position: absolute;
  bottom: 0px;
  @media only screen and (min-width: 1088px) {
    bottom: 10px;
  }
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  height: 100px;
  width: 100vw;
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
  blur,
  activateDot,
  activeDot,
  isNewsletterOpen,
  toogleModal
}) => (
    <SectionMain id="sectionMain">
      <Section style={{marginTop: '100vh'}}>
        <WallpaperContainer style={
          blur === 0 ? {
            opacity: 1,
            transform: 'translateX(0%)'
          } : {
            opacity: 0,
            transform: 'translateX(-10%)'
          }}>
          <FederationsContainer>
            <ImgFederations src={federations}  />
          </FederationsContainer>
          <HeaderMain>
            <SpanBigSlim>Petit & Blanc</SpanBigSlim><br/>
            <SpanStyled weight="300">
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

        </WallpaperContainer>
      </Section>
      {
        showDog.map((shouldShowCard, idx) => (
            <Section key={`section-${idx}`}>
              <Tappable key={`tappable-${idx}`}
                onTap={() => navigate(idx === 0 ? '/blog' : idx === 1 ? '/dogs' : idx === 2 ? '/puppies/litters' : idx === 3 ? '/grooming' : '/exhibitions')}>
                <Card
                  img={require(`../img/dog${idx + 1}.jpg`)}
                  shouldShowCard={shouldShowCard}
                  key={`card-${idx}`}
                  idx={idx}
                  tab={idx === 0 ? '/blog' : idx === 1 ? '/dogs' : idx === 2 ? '/puppies/litters' : idx === 3 ? '/grooming' : '/exhibitions'}>
                  {
                    idx === 0 ?
                      'blog' :
                      idx === 1 ?
                      '<span>nasze</span>psy' :
                        idx === 2 ?
                        '<span>nasze</span>mioty' :
                          idx === 3 ?
                          'grooming' :
                          'wystawy'
                  }
                </Card>
              </Tappable>
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
      showDog: [false, false, false, false, false],
      blur: 0,
      currentDog: 0,
      minX: 0,
      minY: 0,
      swipeDet: {
        sX: 0,
        sY: 0,
        eX: 0,
        eY: 0
      },
      activeDot: 0,
      isNewsletterOpen: false
    }
  }
  componentDidMount() {
    // document.getElementById('sectionMain').addEventListener('scroll', this.onScroll);
    window.addEventListener('wheel', this.onWheel, {passive: false});
    this.detectSwipe('sectionMain', this.swipeDetected);
  }
  componentWillUnmount() {
    // document.getElementById('sectionMain').removeEventListener('scroll', this.onScroll)
    window.removeEventListener('wheel', this.onWheel)
  }
  toogleModal = () => {
    // clearTimeout(timeout);
    this.setState(prevState => ({
      isNewsletterOpen: !prevState.isNewsletterOpen
    }));
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
      this.showNextDog()
    } else if (delta > 0){
      console.log("UP");
      this.showPreviousDog()
    }
    e.preventDefault();
  }
  showNextDog = () => {
    if(this.state.currentDog < 5) {
      let showDogCopy = Object.assign([], this.state.showDog);
      if(this.state.currentDog > 0) {
        showDogCopy[this.state.currentDog - 1] = false // hide prev dog
      }
      showDogCopy[this.state.currentDog + 1 - 1] = true // show next dog
      this.setState({
        showDog: showDogCopy,
        activeDot: this.state.currentDog + 1,
        currentDog: this.state.currentDog + 1
      }, () => {
        this.scrollToCurrentDog();
      })
    }
  }
  showPreviousDog = () => {
    if(this.state.currentDog > 0) {
      let showDogCopy = Object.assign([], this.state.showDog);
      showDogCopy[this.state.currentDog - 1] = false // hide next dog
      showDogCopy[this.state.currentDog - 1 - 1] = true // show prev dog
      this.setState({
        showDog: showDogCopy,
        activeDot: this.state.currentDog - 1,
        currentDog: this.state.currentDog - 1
      }, () => {
        this.scrollToCurrentDog();
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
    if(directionX > 0) {
      this.showNextDog();
    } else if(directionX < 0) {
      this.showPreviousDog();
    }
  }
  activateDot = (dot) => {
    let showDogCopy = Object.assign([], this.state.showDog);
    showDogCopy[this.state.currentDog - 1] = false; // hide current dog
    showDogCopy[dot - 1] = true; // show current dog
    this.setState({
      activeDot: dot,
      currentDog: dot,
      showDog: showDogCopy
    }, () => {
      this.scrollToCurrentDog()
    })
  }
  scrollToCurrentDog = () => {
    const visualWidth = document.getElementById('sectionMain').getBoundingClientRect().height;
    document.getElementById('sectionMain').scrollTo({
      top: (this.state.currentDog) * visualWidth,
      behavior: 'smooth'
    })
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
          activateDot={this.activateDot}
          activeDot={this.state.activeDot}
          isNewsletterOpen={this.state.isNewsletterOpen}
          toogleModal={this.toogleModal}
        />
        <ProgressBarContainer>
          <ProgressBar activeDot={this.state.activeDot} activateDot={(dot) => this.activateDot(dot)} />
        </ProgressBarContainer>
        {
          !this.state.isNewsletterOpen &&
          <button className="newsletter-button" onClick={this.toogleModal} >
            <FaPaw size='2em' />
          </button>
        }
        {
          this.state.isNewsletterOpen &&
          <Modal>
            <Newsletter
              isNewsletterOpen={this.state.isNewsletterOpen}
              toogleModal={this.toogleModal} />
          </Modal>
        }
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
      }
    }
  }
`
