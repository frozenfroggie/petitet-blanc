import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../components/Layout'
import DogsRoll from '../../components/DogsRoll'

class ExhibitionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogToShow: null
    }
  }
  goBack = () => {
    this.setState({
      dogToShow: null
    })
  }
  showDog = (idx) => {
    this.setState({
      dogToShow: idx + 1
    }, () => {
      // window.scrollTo({top: window.innerHeight - 220, behavior: 'smooth'})
    })
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark
    console.log(posts)
    return (
        <Layout>
            <section className="section section-main it" style={{marginBottom: '-100vh'}}>
              <div className="container" style={{zIndex: 99, position: 'relative', top: 100}}>
                <div className="content">
                  <DogsRoll
                    path="/puppies/litters"
                    location={this.props.location}
                    goBack={this.goBack}
                    posts={posts}
                    dogToShow={this.state.dogToShow}
                    goBack={this.goBack}
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
    query ExhibitionsQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "exhibitions-page" } }}
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
              date
              exhibitionDate
              dogs {
                dog
                achievements
              }
              galleryImages {
                image {
                  childImageSharp {
                    fluid(maxWidth: 1024, quality: 64) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                description
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
      }
    }
    `}
    render={(data, location) => (
      <ExhibitionsPage data={data} {...props} />
    )}
  />
)
