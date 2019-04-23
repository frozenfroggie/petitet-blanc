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
  height: 0vh;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 50px;
  background-color: transparent;
`

const Section = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0px;
`

const SectionMain = styled.section`
  z-index: 10;
  position: relative;
  top: 0vh;
  width: 100vw;
  top: 100vh;
`

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  showDog
}) => (
  <div>
    <WallpaperContainer>
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
      showDog: [false, false, false, false]
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
      if(scrollY >= (i + 1) * innerHeight) {
        showDogCopy[i] = true;
      } else {
        showDogCopy[i] = false;
      }
    }
    this.setState({
      showDog: showDogCopy
    })
  }
  render() {
    const { frontmatter } = this.props.data.markdownRemark
    return (
      <Layout>
        <IndexPageTemplate
          showDog={this.state.showDog}
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
