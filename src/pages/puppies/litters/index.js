import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../../../components/Layout'
import DogsRoll from '../../../components/DogsRoll'

class LittersPage extends React.Component {
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
    console.log('ok', posts)
    return (
      <Layout>
        <section className="section section-main" style={{zIndex: 99, position: 'relative', top: '100px', marginBottom: '-100vh'}}>
          <div className="container">
            <div className="content">
              <DogsRoll
                path="/puppies/litters"
                location={this.props.location}
                goBack={this.goBack}
                posts={posts}
                dogToShow={this.state.dogToShow}
                goBack={this.goBack}
                showDog={(idx) => this.showDog(idx)}
              />
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
    query LittersQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "litters-page" } }}
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
              birthDate(formatString: "D MMMM YYYY", locale: "pl")
              parents {
                father
                mother
              }
              puppies {
                name
                gender
                available
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
      <LittersPage data={data} {...props} />
    )}
  />
)
