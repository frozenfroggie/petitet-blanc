import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import DogTile from '../components/DogTile'
import DogInfo from '../components/DogInfo'

export const NewHomePageTemplate = ({
  title,
  image,
  galleryImages
}) => {
  return (
    <div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="dogs-container columns is-multiline" style={{ marginBottom: '20rem' }}>
                <DogTile
                  idx={0}
                  id={0}
                  image={image}
                  title={title}
                  showDog={() => alert('Niedostępne w podglądzie')}
                />
                <DogInfo
                  image={image}
                  title={title}
                  galleryImages={galleryImages}
                  openLightbox={() => alert('Niedostępne w podglądzie')}
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

const NewHomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <NewHomePageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        description={frontmatter.description}
        galleryImages={frontmatter.galleryImages}
      />
    </Layout>
  )
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
