import React from 'react'

import GalleryFolder from './GalleryFolder.js';

class GalleryRoll extends React.Component {
  render() {
    const { posts } = this.props
    // let post;
    // if(this.props.folderToOpen) {
    //   post = posts[this.props.folderToOpen - 1].node
    // }
    return (
      <div>
        <div className="dogs-container columns is-multiline">
          {
              posts.length > 0 ? (posts
                .map(({ node: post }, idx) => (
                  <GalleryFolder
                    openFolder={() => this.props.openFolder(idx + 1)}
                    title={post.frontmatter.title}
                    galleryImages={post.frontmatter.galleryImages}
                    slug={post.fields.slug}
                  />
                )))
                :
                <h2>No folders</h2>
          }
          </div>
        </div>
    );
  }
}

export default GalleryRoll
