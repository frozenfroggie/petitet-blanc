import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import GalleryFolderInside from '../components/GalleryFolderInside'

export const GalleryPageTemplate = ({
  id,
  title,
  galleryImages,
  openLightbox,
  closeLightbox,
  lightbox,
  currentImage,
  photos
}) => {
  return (
    <div>
    <section className="section section--gradient" style={{marginBottom: '-100vh'}}>
      <div className="container" style={{zIndex: 99, marginTop: 100}}>
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="dogs-container columns is-multiline" style={{ marginBottom: '20rem' }}>
                <GalleryFolderInside
                  title={title}
                  galleryImages={galleryImages}
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

GalleryPageTemplate.propTypes = {
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

class GalleryPage extends React.Component {
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
        <GalleryPageTemplate
          id={frontmatter.id}
          title={frontmatter.title}
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

GalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default GalleryPage

export const pageQuery = graphql`
query GalleryPageByID($id: String!) {
  markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        galleryImages {
          image {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
