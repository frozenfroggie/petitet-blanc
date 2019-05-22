import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import $ from "jquery";

import Layout from '../../components/Layout'
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
// let prevScrollingSlide = 1;
const navbarHeight = 68;
let locked = false;
let scrollingSlide = 0;

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
    window.addEventListener('scroll', this.adjustPositions);
    this.detectSwipe('sectionMain2', this.swipeDetected);
  }
  componentWillUnmount() {
    $('body').css('height', 'auto');
    $('#footer').css('display', 'block');
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('scroll', this.adjustPositions);
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
      this.showNextSlide(2)
    } else if (delta > 0){
      // console.log("UP");
      this.showPreviousSlide(2)
    }
    e.preventDefault();
  }
  detectSwipe = (elementId, func) => {
    let swipe_det = {};
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    const min_x = 30;  //min x swipe for horizontal swipe
    // const max_x = 30;  //max x difference for horizontal swipe
    const min_y = 30;  //min y swipe for vertical swipe
    // const max_y = 60;
    let direcX = 0;
    let direcY = 0;
    let element = document.getElementById(elementId);
    if(!element)
      return;
    element.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
      e.preventDefault();
    }, false);
    element.addEventListener('touchmove', (e) => {
      const horizontalSwipe = ((swipe_det.eX - min_x > swipe_det.sX) ||
      (swipe_det.eX + min_x < swipe_det.sX)) && (swipe_det.eX > 0);
      const verticalSwipe = ((swipe_det.eY - min_y > swipe_det.sY) ||
      (swipe_det.eY + min_y < swipe_det.sY)) && (swipe_det.eY > 0);
      console.log(horizontalSwipe, verticalSwipe)
      if (horizontalSwipe || verticalSwipe) {
        e.preventDefault();
      }
      const t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    }, false);
    element.addEventListener('touchend', () => {
      //horizontal detection
      const shouldSwipeHorizontally = ((swipe_det.eX - min_x > swipe_det.sX) ||
      (swipe_det.eX + min_x < swipe_det.sX)) && (swipe_det.eX > 0);
      const shouldSwipeVertically = ((swipe_det.eY - min_y > swipe_det.sY) ||
      (swipe_det.eY + min_y < swipe_det.sY)) && (swipe_det.eY > 0);
      if (shouldSwipeHorizontally) {
        if(swipe_det.eX > swipe_det.sX) direcX = -1;
        else direcX = 1;
      } else if (shouldSwipeVertically) {
        if(swipe_det.eY > swipe_det.sY) direcY = -1;
        else direcY = 1;
      }

      if (direcX !== 0 || direcY !== 0) {
        if (typeof func == 'function') func(direcX, direcY);
      }
      direcX = 0;
      direcY = 0;
      swipe_det.sY = 0;
      swipe_det.eY = 0;
      swipe_det.sX = 0;
      swipe_det.eX = 0;
    }, false);
  }
  swipeDetected = (directionX, directionY) => {
    console.log(directionY)
    if(directionY > 0) {
      scrollingSlide += 1;
      if(scrollingSlide <= 2) {
        scrollingSlide = 3
      }
      var $scrollingSlide = $('#slide-' + scrollingSlide);
      console.log($scrollingSlide)
      if(scrollingSlide > 14) {
        $scrollingSlide.prevAll('.slide').removeClass('slide--locked').addClass('slide--scrolling');
        // $scrollingSlide.removeClass('slide--locked').addClass('slide--scrolling');
        // $scrollingSlide.nextAll('.slide').removeClass('slide--locked').removeClass('slide--scrolling');
        scrollingSlide = 0;
        var $scrollingSlide = $('#slide-' + scrollingSlide);
        $scrollingSlide.prevAll('.slide').removeClass('slide--scrolling').addClass('slide--locked');
        $scrollingSlide.removeClass('slide--locked').addClass('slide--scrolling');
        $scrollingSlide.nextAll('.slide').removeClass('slide--locked').removeClass('slide--scrolling');
      } else {
        $scrollingSlide.prevAll('.slide').removeClass('slide--scrolling').addClass('slide--locked');
        $scrollingSlide.removeClass('slide--locked').addClass('slide--scrolling');
        $scrollingSlide.nextAll('.slide').removeClass('slide--locked').removeClass('slide--scrolling');
      }
    } else if(directionY < 0) {
      scrollingSlide -= 1;
      if(scrollingSlide > 1) {
        var $scrollingSlide = $('#slide-' + scrollingSlide);
        $scrollingSlide.prevAll('.slide').removeClass('slide--scrolling').addClass('slide--locked');
        $scrollingSlide.removeClass('slide--locked').addClass('slide--scrolling');
        $scrollingSlide.nextAll('.slide').removeClass('slide--locked').removeClass('slide--scrolling');
      }
    }
  }
  showNextSlide = step => {
    var scrollPosition = $(window).scrollTop();
    let slideHeight;
    if(document.getElementById('slide-0')) {
      slideHeight = document.getElementById('slide-0').offsetHeight;
    }
    var scrollingSlide = Math.floor(scrollPosition / slideHeight) + (step - 1);
    // console.log(scrollingSlide);
    // document.getElementById('grooming-container').scrollTo({
    //   top: scrollingSlide * slideHeight + "px",
    //   behavior: 'smooth'
    // })
    if(scrollingSlide === 1) {
      window.scrollTo({top: (scrollingSlide + step) * (windowHeight - navbarHeight), behavior: 'smooth'});
      locked = true;
      setTimeout(() => {
        locked = false
      }, 300 * step)
    } else if(scrollingSlide >= 14 || step === 1 && scrollingSlide >= 13) {
      return window.scrollTo({
          top: 0,
          behavior: 'smooth'
      })
    } else if(!locked) {
      locked = true;
      setTimeout(() => {
        locked = false
      }, 300 * step)
      window.scrollTo({top: (scrollingSlide + 1) * (windowHeight - navbarHeight), behavior: 'smooth'});
    }
  }
  showPreviousSlide = step => {
    var scrollPosition = $(window).scrollTop();
    if(document.getElementById('slide-0') && !locked) {
      var slideHeight = document.getElementById('slide-0').offsetHeight;
      var scrollingSlide = Math.floor(scrollPosition / slideHeight) - step;
      locked = true;
      setTimeout(() => {
        locked = false
      }, 300 * step)
      window.scrollTo({top: scrollingSlide * (windowHeight - navbarHeight), behavior: 'smooth'});
    }
  }
  adjustPositions = (ev) => {
    // console.log(ev);
  	var scrollPosition = $(window).scrollTop();
    let slideHeight;
    if(document.getElementById('slide-0')) {
      slideHeight = document.getElementById('slide-0').offsetHeight;
    }
    var scrollingSlide = Math.floor(scrollPosition / slideHeight) + 1;
    // console.log(scrollPosition, slideHeight, scrollPosition / slideHeight);
  	// var scrollingSlide = Math.floor((scrollPosition / windowHeight) + (prevScrollingSlide * 0.045)) + 1;
    // console.log((scrollPosition / windowHeight) + (prevScrollingSlide * 0.045));
    // prevScrollingSlide = scrollingSlide;
    if(scrollingSlide > 1) {
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
          <section id="sectionMain2"  className="section section-main it" style={{marginBottom: '-100vh', width: '100%', padding: 0}}>
            <div id="grooming-container" className="grooming-container" style={{zIndex: 98, position: 'relative', top: 10, height: '100vh'}}>

              <article id="slide-0" className="slide slide--locked">
                <a className="maps-content" target="_blank" href="https://www.google.pl/maps/place/Dog+Model+-+salon+piel%C4%99gnacji+ps%C3%B3w/@50.7683451,16.1647107,19z/data=!3m1!4b1!4m5!3m4!1s0x470e57d5c55b1693:0xd8f20886b9c2657c!8m2!3d50.7683451!4d16.1652579">
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=50.768365,%2016.165263&zoom=17&size=550x490&markers=50.768365,%2016.165263&key=AIzaSyBtpEjog0thmTk4yMd_r4arB0q_QPNKM_I&signature=vyJ8FYBNmoc6zQrL0kDXHUvrOI0=" />
                </a>
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
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-3" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming2})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>

              <article id="slide-4" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming3})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-5" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming4})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-6" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming5})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-7" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming6})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-8" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming7})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-9" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming8})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-10" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming9})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-11" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming10})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-12" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming11})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                </div>
              </article>
              <article id="slide-13" className="slide">
                <div className="slide__inner" style={{
                  backgroundImage: `url(${grooming12})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
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
