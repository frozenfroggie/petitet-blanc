import React from 'react'
import { Router } from "@reach/router"
import { Link, graphql, StaticQuery, navigate } from 'gatsby'
import $ from "jquery";

import Layout from '../../components/Layout'
import TheGoogleMap from '../../components/TheGoogleMap'
import grooming1 from "../../img/grooming/grooming1.jpg";
import grooming2 from "../../img/grooming/grooming2.jpg";
import grooming3 from "../../img/grooming/grooming3.jpg";
import grooming4 from "../../img/grooming/grooming4.jpg";
import grooming5 from "../../img/grooming/grooming5.jpg";
import grooming6 from "../../img/grooming/grooming6.jpg";
import grooming7 from "../../img/grooming/grooming7.jpg";
import grooming8 from "../../img/grooming/grooming8.jpg";
import grooming9 from "../../img/grooming/grooming9.jpg";
import grooming10 from "../../img/grooming/grooming10.jpg";
import grooming11 from "../../img/grooming/grooming11.jpg";
import grooming12 from "../../img/grooming/grooming12.jpg";

let windowHeight;
let $slides;
let prevScrollingSlide = 1;
const navbarHeight = 68;
let locked = false;

class GroomingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogToShow: null
    }
  }
  componentDidMount() {
    windowHeight = $(window).height();
    $slides = $('.slide');
    this.init();
    $('#footer').css('display', 'none');
    window.addEventListener('wheel', this.onWheel, {passive: false});
    window.addEventListener('scroll', (ev) => {
      this.adjustPositions(ev);
    })
  }
  componentWillUnmount() {
    $('body').css('height', 'auto');
    $('#footer').css('display', 'block');
  }
  init = () => {
    if($slides) {
      $('body').css('height', ($slides.length * 100) + '%');
      var slideHeight = document.getElementById('slide-0').offsetHeight;
      $slides.each(function(index) {
        $(this).css({
          'z-index': 100 * index,
          'top': (index * slideHeight) + navbarHeight + 'px'
        });
      });

      const $scrollingSlide = $('.slide--scrolling').last();
      const scrollingSlideIndex = $('.slide').index($scrollingSlide);
      $(window).scrollTop((scrollingSlideIndex) * windowHeight);
    }
  }
  onWheel = (e) => {
    let delta;

    if (e.wheelDelta) {
      delta = e.wheelDelta;
    } else {
      delta = -1 * e.deltaY;
    }
    if (delta < 0){
      this.showNextSlide()
    } else if (delta > 0){
      console.log("UP");
      this.showPreviousSlide()
    }
    e.preventDefault();
  }
  showNextSlide = () => {
    var scrollPosition = $(window).scrollTop();
    let slideHeight;
    if(document.getElementById('slide-0')) {
      slideHeight = document.getElementById('slide-0').offsetHeight;
    }
    var scrollingSlide = Math.floor(scrollPosition / slideHeight) + 1;
    console.log(scrollingSlide);
    // document.getElementById('grooming-container').scrollTo({
    //   top: scrollingSlide * slideHeight + "px",
    //   behavior: 'smooth'
    // })
    if(scrollingSlide === 1) {
      window.scrollTo({top: (scrollingSlide + 1) * (windowHeight - navbarHeight), behavior: 'smooth'});
      locked = true;
      setTimeout(() => {
        window.scrollTo({top: (scrollingSlide + 2) * (windowHeight - navbarHeight), behavior: 'smooth'});
        locked = false;
      }, 750)
    } else if(scrollingSlide >= 14) {
      return window.scrollTo({
          top: 0,
          behavior: 'smooth'
      })
    } else if(!locked) {
      window.scrollTo({top: scrollingSlide * (windowHeight - navbarHeight), behavior: 'smooth'});
      locked = true;
      setTimeout(() => {
        window.scrollTo({top: (scrollingSlide + 1) * (windowHeight - navbarHeight), behavior: 'smooth'});
        locked = false;
      }, 750)
    }
  }
  showPreviousSlide = () => {
    var scrollPosition = $(window).scrollTop();
    if(document.getElementById('slide-0')) {
      var slideHeight = document.getElementById('slide-0').offsetHeight;
      var scrollingSlide = Math.floor(scrollPosition / slideHeight) - 2;
      window.scrollTo({top: scrollingSlide * (windowHeight - navbarHeight), behavior: 'smooth'});
    }
  }
  adjustPositions = (ev) => {
    console.log(ev);
  	var scrollPosition = $(window).scrollTop();
    let slideHeight;
    if(document.getElementById('slide-0')) {
      slideHeight = document.getElementById('slide-0').offsetHeight;
    }
    var scrollingSlide = Math.floor(scrollPosition / slideHeight) + 1;
    console.log(scrollPosition, slideHeight, scrollPosition / slideHeight);
  	// var scrollingSlide = Math.floor((scrollPosition / windowHeight) + (prevScrollingSlide * 0.045)) + 1;
    // console.log((scrollPosition / windowHeight) + (prevScrollingSlide * 0.045));
    // prevScrollingSlide = scrollingSlide;
    if(scrollingSlide > 1 && !locked) {
      var $scrollingSlide = $('#slide-' + scrollingSlide);
      $scrollingSlide.prevAll('.slide').removeClass('slide--scrolling').addClass('slide--locked');
      $scrollingSlide.removeClass('slide--locked').addClass('slide--scrolling');
      $scrollingSlide.nextAll('.slide').removeClass('slide--locked').removeClass('slide--scrolling');
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
          <section className="section section-main it" style={{marginBottom: '-100vh', width: '100%', padding: 0}}>
            <div id="grooming-container" className="grooming-container" style={{zIndex: 98, position: 'relative', top: 10, height: '100vh'}}>

              <article id="slide-0" className="slide slide--locked">
                <div className="maps-content">
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=50.768365,%2016.165263&zoom=17&size=550x490&markers=50.768365,%2016.165263&key=AIzaSyBtpEjog0thmTk4yMd_r4arB0q_QPNKM_I&signature=vyJ8FYBNmoc6zQrL0kDXHUvrOI0=" />
                </div>
              </article>
              <article id="slide-1" className="slide slide--text slide--locked">
                <div className="slide__inner__dashed">
                  <p className="demo-title">GALERIA NASZYCH FRYZUR</p>
                  <p className="demo-arrow" >&darr;</p>
                  <p className="demo-instructions">Przesuwaj dalej</p>
                </div>
              </article>

              <article id="slide-2" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming1})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-3" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming2})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>

              <article id="slide-4" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming3})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-5" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming4})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-6" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming5})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-7" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming6})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-8" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming7})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-9" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming8})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-10" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming9})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-11" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming10})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-12" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming11})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-13" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming12})`,
                  backgroundSize: 'cover'
                }}>
                </div>
              </article>
              <article id="slide-14" className="slide">

              </article>

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
