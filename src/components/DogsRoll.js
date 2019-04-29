import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery, navigate } from 'gatsby'

import DogTile from './DogTile.js';
import DogInfo from './DogInfo.js';
import DogNewHomeInfo from './DogNewHomeInfo.js';

class DogsRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareOpen: false,
      anchorEl: null,
      lightbox: false,
      photos: [],
      posts: [],
      currentImage: 0
    }
  }
  componentDidMount() {
    const { posts } = this.props;
    const filteredPosts = Object.assign([], posts.filter(({node}) => node.frontmatter.gender === this.props.gender))
    this.setState({posts: filteredPosts});
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.gender !== nextProps.gender) {
      const { posts } = this.props;
      const filteredPosts = Object.assign([], posts.filter(({node}) => node.frontmatter.gender !== this.props.gender))
      this.setState({posts: filteredPosts})
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
    const { data, gender, showDog, dogToShow } = this.props
    let post, forSale;
    if(dogToShow) {
      post = this.state.posts[dogToShow - 1].node;
    }
    console.log('?', this.state.posts, this.props.dogToShow)
    console.log('?', post)
    return (
      <div>
        <div className="dogs-container columns is-multiline">
        {
            this.state.posts.length > 0 && (this.state.posts
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
