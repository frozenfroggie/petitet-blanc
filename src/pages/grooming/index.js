import React from 'react'
import { Router } from "@reach/router"
import { Link, graphql, StaticQuery, navigate } from 'gatsby'

import Layout from '../../components/Layout'
import TheGoogleMap from '../../components/TheGoogleMap'

class GroomingPage extends React.Component {
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
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=50.768365,%2016.165263&zoom=17&size=400x400&markers=50.768365,%2016.165263&key=AIzaSyBtpEjog0thmTk4yMd_r4arB0q_QPNKM_I&signature=H7feWa2h_auj155jJI8E_gF5PBY=" />
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
    query GroomingQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "grooming-page" } }}
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
              date
              description
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
            }
          }
        }
      }
    }
    `}
    render={(data, location) => (
      <GroomingPage data={data} {...props} />
    )}
  />
)
