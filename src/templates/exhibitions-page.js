import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import DogTile from '../components/DogTile'
import DogInfo from '../components/DogInfo'

export const ExhibitionsPageTemplate = ({
  id,
  image,
  title,
  templateKey,
  date,
  exhibitionDate,
  dogs,
  achievements,
  galleryImages
}) => {
  return (
    <div>
    <section className="section section--gradient" style={{marginBottom: '-100vh'}}>
      <div className="container" style={{zIndex: 99, marginTop: 100}}>
        <div className="section">
          <div className="columns">
            <div className="column is-12">
              <div className="dogs-container columns is-multiline" style={{ marginBottom: '20rem' }}>
                <DogInfo
                  id={id}
                  image={image}
                  title={title}
                  templateKey={templateKey}
                  date={date}
                  dogs={dogs}
                  exhibitionDate={exhibitionDate}
                  achievements={achievements}
                  galleryImages={galleryImages}
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

ExhibitionsPageTemplate.propTypes = {
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

const ExhibitionsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ExhibitionsPageTemplate
        id={frontmatter.id}
        image={frontmatter.image}
        title={frontmatter.title}
        templateKey={frontmatter.templateKey}
        date={frontmatter.date}
        exhibitionDate={frontmatter.exhibitionDate}
        dogs={frontmatter.dogs}
        achievements={frontmatter.achievements}
        galleryImages={frontmatter.galleryImages}
      />
    </Layout>
  )
}

ExhibitionsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ExhibitionsPage

export const pageQuery = graphql`
query ExhibitionPageByID($id: String!) {
  markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
          title
          templateKey
          date(formatString: "MMMM DD, YYYY", locale: "pl")
          exhibitionDate(formatString: "MMMM DD, YYYY", locale: "pl")
          dogs
          achievements
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
