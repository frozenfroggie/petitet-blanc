import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../components/Layout'
import GalleryRoll from '../../components/GalleryRoll'

class GalleryIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderToOpen: null
    }
  }
  openFolder = (idx) => {
    this.setState({
      folderToOpen: idx
    }, () => {
      // window.scrollTo({top: window.innerHeight - 220, behavior: 'smooth'})
    })
  }
  goBack = () => {
    this.setState({
      folderToOpen: null
    })
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark
    return (
        <Layout>
            <section className="section section-main section-gallery" style={{zIndex: 99, position: 'relative', top: '100px', marginBottom: '-100vh'}}>
              <div className="container">
                <div className="content">
                  <GalleryRoll
                    folderToOpen={this.state.folderToOpen}
                    openFolder={this.openFolder}
                    goBack={this.goBack}
                    posts={posts} />
                </div>
              </div>
            </section>
        </Layout>
      )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
    query GalleryQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "gallery-page" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              galleryImages {
                image {
                  childImageSharp {
                    fluid(maxWidth: 200, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                description
              }
            }
          }
        }
      }
    }
    `}
    render={(data, location) => (
      <GalleryIndexPage data={data} {...props} />
    )}
  />
)
