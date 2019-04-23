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


const WallpaperContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 0px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
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

const Section = styled.section`
  position: relative;
  top: -50vh;
  margin: 50px 0px;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`

const SectionMain = styled.section`
  z-index: 98;
  position: relative;
  top: 100vh;
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
  blur
}) => (
  <div>
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
        const windowHeight = window.innerHeight;
        window.scrollTo({
          top: 0.5 * windowHeight,
          behavior: 'smooth'
          });
        }}>
        <a href="#thanks"><span></span></a>
      </ScrollDown>
    </WallpaperContainer>
    <SectionMain>
      {
        showDog.map((shouldShowCard, idx) => (
          <div className="container" key={idx}>
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
          </div>
        ))
      }
    </SectionMain>
  </div>
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
      showDog: [false, false, false, false],
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
    const showDogLen = this.state.showDog.length;
    let showDogCopy = Object.assign([], this.state.showDog);
    for(let i = 0; i < showDogLen; i++) {
      if(scrollY >= (i + 1) * innerHeight - (0.5 * innerHeight)) {
        showDogCopy[i] = true;
      } else {
        showDogCopy[i] = false;
      }
    }

    if(scrollY > 0.25 * innerHeight) {
      this.setState({
        blur: 5,
        showDog: showDogCopy
      })
    } else {
      this.setState({
        blur: 0,
        showDog: showDogCopy
      })
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
