import React from 'react'
import { Router } from "@reach/router"
import { Link, graphql, StaticQuery, navigate } from 'gatsby'

import Layout from '../../components/Layout'
import DogsRoll from '../../components/DogsRoll'
import DogsMenu from '../../components/DogsMenu'

class DogsIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogToShow: null
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.location.state && nextProps.location.state && this.props.location.state.gender !== nextProps.location.state.gender) {
      this.setState({
        dogToShow: null
      })
    }
  }
  goBack = () => {
    this.setState({
      dogToShow: null
    })
  }
  showDog = (idx, name) => {
    this.setState({
      dogToShow: idx + 1
    }, () => {
      // console.log(this.props.location.pathname)
      // navigate(`${this.props.location.pathname}?name=${name}`);
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
                  <Router>
                    <DogsMenu
                      path="/dogs" />
                    <DogsRoll
                      path="/dogs/male"
                      gender="male"
                      location={this.props.location}
                      goBack={this.goBack}
                      posts={posts}
                      dogToShow={this.state.dogToShow}
                      showDog={(idx, name) => this.showDog(idx, name)} />
                    <DogsRoll
                      path="/dogs/female"
                      gender="female"
                      location={this.props.location}
                      goBack={this.goBack}
                      posts={posts}
                      dogToShow={this.state.dogToShow}
                      showDog={(idx, name) => this.showDog(idx, name)} />
                    <DogsRoll
                      path="/dogs/veteran"
                      gender="veteran"
                      location={this.props.location}
                      goBack={this.goBack}
                      posts={posts}
                      dogToShow={this.state.dogToShow}
                      showDog={(idx, name) => this.showDog(idx, name)} />
                    <DogsRoll
                      path="/dogs/gone"
                      gender="gone"
                      location={this.props.location}
                      goBack={this.goBack}
                      posts={posts}
                      dogToShow={this.state.dogToShow}
                      showDog={(idx, name) => this.showDog(idx, name)} />
                  </Router>
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
    query DogsQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "dogs-page" } }}
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
              lineage
              templateKey
              date
              birthDate
              officialName
              homeName
              gender
              achievements
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
      <DogsIndexPage data={data} {...props} />
    )}
  />
)
