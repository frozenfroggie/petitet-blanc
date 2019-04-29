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
  parents
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
                  openLightbox={() => alert('Niedostępne w podglądzie')}
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

const LittersPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

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
      />
    </Layout>
  )
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
        date(formatString: "MMMM DD, YYYY", locale: "pl")
        birthDate(formatString: "D MMMM YYYY", locale: "pl")
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
