import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from "styled-components"
import { FaClock, FaTags } from 'react-icons/fa';
import { kebabCase } from 'lodash'

import defaultDog from '../img/default_dog.png'

const PostTile = styled.article`
  display: flex;
  flex-direction: column;
  max-height: 650px;
  background-color: rgba(250,250,250,0.7);
  padding: 30px;
  border-radius: 5px;
  overflow: hidden;
`

const PostTileImage = styled.div`
  background-image: url(${props => !!(props.image && props.image.childImageSharp) ? props.image.childImageSharp.fluid.src : defaultDog});
  width: 100%;
  height: 250px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`

const PostTileHeader = styled.div`
  color: #202020;
  transition: color .2s;
  text-decoration: none;
  min-height: 60px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  &:hover {
    color: #339933;
  }
`
const PostTileDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;
  svg {
    position: relative;
    top: 1px;
    margin-right: 5px;
    color: #339933;
  }
  span {
    font-size: 0.9em;
  }
`

const PostTileExcerpt = styled.div`
`

const PostTileMore = styled.div`
  margin-top: 20px;
  .button {
    position: relative;
    border: 1px solid #339933;
    color: #339933;
    transition: all 0.3s;
    &:after {
      display: block;
      position: relative;
      top: -2px;
      opacity: 0;
      font-size: 32px;
      font-weight: 400;
      line-height: 1em;
      content: "";
      transition: all 0.5s;
    }
    &:hover {
      color: white;
      background-color: #339933;
      &:after {
        opacity: 1;
        padding-left: .3em;
        content: "»";
      }
    }
  }
`

const TagList = styled.ul`
  display: inline-block;
  list-style-type: none;
  width: auto;
  margin-bottom: 24px;
  li {
    display: inline-block;
    padding: 0px 5px;
    list-style-type: none;
    margin: 0px;
  }
`

const Subtitle = styled.div`
  display: flex;
  align-items: center;
`

const FaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 25px;
`

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id} style={{zIndex: 100}}>
              <PostTile className="is-child">
                <Link
                  className="title is-size-4"
                  to={post.fields.slug}>
                  <PostTileImage image={post.frontmatter.featuredimage}></PostTileImage>
                </Link>
                <PostTileHeader>
                  <Link
                    className="title is-size-4"
                    to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                </PostTileHeader>
                <PostTileDate>
                  <Subtitle>
                    <FaContainer>
                      <FaClock/>
                    </FaContainer>
                    <div>{post.frontmatter.date}</div>
                  </Subtitle>
                  <Subtitle>
                    <FaContainer>
                      <FaTags/>
                    </FaContainer>
                    <TagList>
                      {
                        post.frontmatter.tags.slice(0,2).map((tag, idx) => <li><Link to={`/tags/${kebabCase(tag)}/`}> {tag.charAt(0).toUpperCase() + tag.slice(1)}</Link>{idx === 0 && ','}</li>)
                      }
                    </TagList>
                  </Subtitle>
                </PostTileDate>
                <PostTileExcerpt>
                  {post.frontmatter.description}
                </PostTileExcerpt>
                <PostTileMore>
                  <Link className="button" to={post.fields.slug}>
                    czytaj dalej
                  </Link>
                </PostTileMore>
              </PostTile>
            </div>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 300)
              id
              fields {
                slug
              }
              frontmatter {
                tags
                title
                description
                templateKey
                date(formatString: "D MMMM, YYYY", locale: "pl")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 400, quality: 64) {
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
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
