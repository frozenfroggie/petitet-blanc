import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import DogInfo from '../components/DogInfo'

export const DogsPageTemplate = ({
  title,
  lineage,
  birthDate,
  officialName,
  homeName,
  gender,
  achievements,
  galleryImages,
  image
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
                  image={image}
                  name={homeName}
                  officialName={officialName}
                  achievements={achievements}
                  photos={galleryImages}
                  birthDate={birthDate}
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

const DogsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <DogsPageTemplate
        title={frontmatter.title}
        lineage={frontmatter.lineage}
        birthDate={frontmatter.birthDate}
        officialName={frontmatter.officialName}
        homeName={frontmatter.homeName}
        gender={frontmatter.gender}
        achievements={frontmatter.achievements}
        galleryImages={frontmatter.galleryImages}
        image={frontmatter.image}
      />
    </Layout>
  )
}

export default DogsPage

export const pageQuery = graphql`
query DogsPageTemplate {
  markdownRemark(frontmatter: {templateKey: {eq: "dogs-page"}}) {
      html
      frontmatter {
        title
        lineage
        templateKey
        birthDate(formatString: "D MMMM YYYY", locale: "pl")
        officialName
        homeName
        gender
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
