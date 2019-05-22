import React from 'react'

import DogTile from './DogTile.js';

class DogsRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareOpen: false,
      anchorEl: null,
      lightbox: false,
      photos: [],
      filteredPosts: [],
      currentImage: 0
    }
  }
  openLightbox = (post, idx, event) => {
    event.preventDefault();
    const photos = post.frontmatter.galleryImages.map(({image, description}) => ({image: image.childImageSharp.fluid, description}))
    this.setState({ lightbox: true, photos, currentImage: idx });
  }
  closeLightbox = () =>{
    this.setState({ lightbox: false });
  }
  render() {
    const { gender, showDog, dogToShow } = this.props
    let forSale;
    const filteredPosts = this.props.posts.filter(({node}) => node.frontmatter.gender === gender)
    // if(dogToShow) {
    //   post = filteredPosts[dogToShow - 1].node;
    // }
    return (
      <div>
        <div className="dogs-container columns is-multiline">
        {
            filteredPosts.length > 0 && (filteredPosts
              .map(({ node: post }, idx) => (
                <DogTile
                  key={idx}
                  idx={idx}
                  id={post.id}
                  slug={post.fields.slug}
                  image={post.frontmatter.image}
                  officialName={post.frontmatter.officialName}
                  title={post.frontmatter.title}
                  showDog={(idx, name) => showDog(idx, name)}
                  forSale={post.frontmatter.puppies && !!post.frontmatter.puppies.find(puppie => puppie.available === true)}
                />
              )))
              // :
              // <div className="dogs-error">
              //   Brak { gender === 'male' ? 'psów' : 'suk' } w hodowli
              //   <Link className="link-check-bitches" to="/dogs/female" state={{gender: 'female'}}>
              //     <button className="button-gold">
              //       Zobacz Nasze { gender === 'male' ? 'Suki' : 'Psy' }
              //     </button>
              //   </Link>
              // </div>
          }
          </div>
        </div>
    );
  }
}

export default DogsRoll
