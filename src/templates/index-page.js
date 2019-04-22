import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled, { keyframes } from "styled-components"

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

import wallpaper from '../img/wallpaper.jpg'
import federations from '../img/federations.png'

const WallpaperContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  position: fixed;
  top: 50px;
  background-position: 48%;
  display: grid;
  grid-template-rows: 52% 29% 18%;
  grid-template-areas: "federationsContainer . ." "headerMain headerMain headerMain" " scrollDown scrollDown scrollDown";
  grid-template-columns: 50% 35% 15%;
  @media only screen and (min-width: 1088px) {
    grid-template-rows: 35% 40% 25%;
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
  font-size: 1.9em;
  letter-spacing: 0.9px;
`
const SpanStyled = styled.span`
  letter-spacing: 1px;
  left: -1px;
  font-size: 1em;
  font-weight: ${props => props.weight};
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

const SectionMain = styled.section`
  position: relative;
  top: 100vh;
  width: 100vw;
  &:before {
    display: block;
    content: '';
    position: relative;
    top: 50vh;
    height: 100vh;
    width: 100vw;
    background-color: red;
    background-color: rgba(250,250,250,0.5);
    backdrop-filter: blur(100px);
    /* -webkit-backdrop-filter: blur(100px); */
  }

`

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <WallpaperContainer style={{
        backgroundImage: `url(${wallpaper})`
      }}>
      <FederationsContainer>
        <ImgFederations src={federations}  />
      </FederationsContainer>
      <HeaderMain>
        <SpanBigSlim>Petit & Blanc</SpanBigSlim><br/>
        <SpanStyled weight="100">hodowla psów rasowych</SpanStyled><br/>
        <SpanStyled weight="400" style={{position: 'relative', top: -15}}>bichon frise</SpanStyled>
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
    <SectionMain>
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
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
