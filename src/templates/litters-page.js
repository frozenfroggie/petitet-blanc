import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import DogTile from '../components/DogTile'
import DogInfo from '../components/DogInfo'

export const LittersPageTemplate = ({
  id,
  image,
  title,
  date,
  puppies,
  galleryImages,
  birthDate,
  parents,
  openLightbox,
  closeLightbox,
  lightbox,
  currentImage,
  photos
}) => {
  return (
    <section className="section section--gradient" style={{marginBottom: '-100vh'}}>
      <div className="container" style={{zIndex: 99, marginTop: 100}}>
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="dogs-container columns is-multiline" style={{ marginBottom: '20rem' }}>
                <DogInfo
                  id={id}
                  image={image}
                  parents={parents}
                  puppies={puppies}
                  title={title}
                  galleryImages={galleryImages}
                  birthDate={birthDate}
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
  )
}

LittersPageTemplate.propTypes = {
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

class LittersPage extends React.Component {
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
        <LittersPageTemplate
          id={frontmatter.id}
          puppies={frontmatter.puppies}
          parents={frontmatter.parents}
          image={frontmatter.image}
          title={frontmatter.title}
          birthDate={frontmatter.birthDate}
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

LittersPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default LittersPage

export const pageQuery = graphql`
query LittersPageByID($id: String!) {
  markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        templateKey
        date
        birthDate
        parents {
          father
          mother
        }
        puppies {
          name
          gender
        }
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
