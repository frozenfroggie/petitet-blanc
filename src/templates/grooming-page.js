import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

export const GroomingPageTemplate = () => {
  return (
    <div>
      <section className="section section--gradient" style={{marginBottom: '-100vh'}}>
        <div className="container" style={{zIndex: 99, marginTop: 100}}>
          <div className="section">
            <div className="columns">
              <div className="column is-12">
                <div className="dogs-container columns is-multiline" style={{ marginBottom: '20rem' }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

class GroomingPage extends React.Component {
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
        <GroomingPageTemplate />
      </Layout>
    )
  }
}

export default GroomingPage

export const pageQuery = graphql`
query GroomingPageTemplate {
  markdownRemark(frontmatter: {templateKey: {eq: "grooming-page"}}) {
      html
      frontmatter {
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
      }
    }
  }
`
