import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../../components/Layout'
import DogsRoll from '../../../components/DogsRoll'

class NewHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileToShow: null
    }
  }
  goBack = () => {
    this.setState({
      tileToShow: null
    })
  }
  showDog = (idx) => {
    this.setState({
      tileToShow: idx + 1
    }, () => {
      // window.scrollTo({top: window.innerHeight - 220, behavior: 'smooth'})
    })
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark
    return (
      <Layout>
        <section className="section section-main" style={{zIndex: 99, position: 'relative', top: '100px', marginBottom: '-100vh'}}>
          <div className="container">
            <div className="content">
              <DogsRoll
                posts={posts}
                path="/puppies/litters"
                location={this.props.location}
                goBack={this.goBack}
                dogToShow={this.state.tileToShow}
                showDog={(idx) => this.showDog(idx)} />
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
    query NewHomeQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "new-home-page" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              description
              galleryImages {
                image {
                  childImageSharp {
                    fluid(maxWidth: 2400, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                description
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
      }
    }
    `}
    render={(data, location) => (
      <NewHome data={data} {...props} />
    )}
  />
)
