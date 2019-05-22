import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import DogInfo from '../components/DogInfo'
import InfoWrapper from '../components/InfoWrapper'

import { Title } from '../components/style'

export const DogsPageTemplate = ({
  title,
  lineage,
  birthDate,
  officialName,
  homeName,
  gender,
  achievements,
  galleryImages,
  image,
  openLightbox,
  closeLightbox,
  lightbox,
  currentImage,
  photos,
  description
}) => {
  return (
    <InfoWrapper>
      <Title> { officialName } </Title>
      <DogInfo
        image={image}
        homeName={homeName}
        officialName={officialName}
        achievements={achievements}
        galleryImages={galleryImages}
        birthDate={birthDate}
        lightbox={lightbox}
        onClose={closeLightbox}
        openLightbox={(idx, e) => openLightbox(idx, e)}
        currentImage={currentImage}
        photos={photos}
        description={description}
        lineage={lineage}
        />
    </InfoWrapper>
  )
}

class DogsPage extends React.Component {
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
        <DogsPageTemplate
          description={frontmatter.description}
          title={frontmatter.title}
          lineage={frontmatter.lineage}
          birthDate={frontmatter.birthDate}
          officialName={frontmatter.officialName}
          homeName={frontmatter.homeName}
          gender={frontmatter.gender}
          achievements={frontmatter.achievements}
          galleryImages={frontmatter.galleryImages}
          image={frontmatter.image}
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

export default DogsPage

export const pageQuery = graphql`
query DogsPageByID($id: String!) {
  markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        lineage
        templateKey
        birthDate
        officialName
        homeName
        gender
        achievements
        description
        galleryImages {
          image {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
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
`
