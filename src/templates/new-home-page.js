import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled, { keyframes } from "styled-components"

import Layout from '../components/Layout'
import DogNewHomeInfo from '../components/DogNewHomeInfo'

const Title = styled.h2`
  position: relative;
  top: -50px;
  font-size: 2.5em;
  color: #339933;
  text-align: center;
  margin: auto;
  margin-bottom: -30px;
`

export const NewHomePageTemplate = ({
  id,
  image,
  title,
  description,
  galleryImages,
  openLightbox,
  closeLightbox,
  lightbox,
  currentImage,
  photos
}) => {
  return (
    <div>
    <section className="section section--gradient"  style={{marginBottom: '-100vh'}}>
      <div className="container" style={{zIndex: 99}}>
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="dogs-container columns is-multiline" style={{ marginBottom: '20rem' }}>
                <Title> { title } </Title>
                <DogNewHomeInfo
                  title={title}
                  description={description}
                  galleryImages={galleryImages}
                  image={image}
                  lightbox={lightbox}
                  onClose={closeLightbox}
                  openLightbox={(idx, e) => openLightbox(idx, e)}
                  currentImage={currentImage}
                  photos={photos}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

NewHomePageTemplate.propTypes = {
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

class NewHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightbox: false,
      currentImage: 0,
      photos: []
    }
  }
  openLightbox = (galleryImages, idx, event) => {
    event.preventDefault();
    const photos = galleryImages.map(({image, description}) => ({image: image.childImageSharp.fluid, description}))
    this.setState({ lightbox: true, photos, currentImage: idx });
  }
  closeLightbox = () =>{
    this.setState({ lightbox: false });
  }
  render() {
    const { frontmatter } = this.props.data.markdownRemark
    return (
      <Layout>
        <NewHomePageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
          description={frontmatter.description}
          galleryImages={frontmatter.galleryImages}
          openLightbox={(idx, e) => this.openLightbox(frontmatter.galleryImages, idx, e)}
          closeLightbox={this.closeLightbox}
          lightbox={this.state.lightbox}
          currentImage={this.state.currentImage}
          photos={this.state.photos}
        />
      </Layout>
    )
  }
}

NewHomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default NewHomePage

export const pageQuery = graphql`
query NewHomePageByID($id: String!) {
  markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        templateKey
        description
        galleryImages {
          image {
            childImageSharp {
              fluid(maxWidth: 2400, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
