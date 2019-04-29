import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import classNames from 'classnames'
import styled, { keyframes } from "styled-components"
import { FaClock } from 'react-icons/fa';

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
  height: 60px;
  display: flex;
  align-items: center;
  &:hover {
    color: #339933;
  }
`
const PostTileDate = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px;
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
                <PostTileImage image={post.frontmatter.image}></PostTileImage>
                <PostTileHeader>
                  <Link
                    className="title is-size-4"
                    to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                </PostTileHeader>
                <PostTileDate>
                  <span className="subtitle is-block">
                    <FaClock/>
                    {post.frontmatter.date}
                  </span>
                </PostTileDate>
                <PostTileExcerpt>
                  {post.excerpt}
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
                title
                templateKey
                date(formatString: "D MMMM, YYYY", locale: "pl")
                image {
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
