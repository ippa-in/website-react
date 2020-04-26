import React, { Component }  from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: [
        {
          title: 'Become a Successful Poker Player Today',
          description: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
          cta: 'Get Started',
          imgSrc: '/images/banner_slider/poker-carousel-img.png'
        },
        {
          title: 'Become a Professional Poker Player Today',
          description: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
          cta: 'Get Started',
          imgSrc: '/images/banner_slider/poker-carousel-img.png'
        },
        {
          title: 'Become a Successful Poker Player Today',
          description: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
          cta: 'Get Started',
          imgSrc: '/images/banner_slider/poker-carousel-img.png'
        },
        {
          title: 'Become a Professional Poker Player Today',
          description: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
          cta: 'Get Started',
          imgSrc: '/images/banner_slider/poker-carousel-img.png'
        }
      ],
      advUrl: ['/images/home_page_ad/1.jpg', '/images/home_page_ad/2.jpg', '/images/home_page_ad/3.jpg', '/images/home_page_ad/4.jpg', '/images/home_page_ad/5.jpg', '/images/home_page_ad/6.jpg']
    }
    this.cardContent = [
      {
        title: 'Sign-up',
        desc: 'Sign-up on Indian Poker Player Association (IPPA)',
        icon: '/images/home_page/sign-up-icon.svg'
      },
      {
        title: 'KYC Verification',
        desc: 'Update your KYC and banking details',
        icon: '/images/home_page/kyc-icon.svg'
      },
      {
        title: 'Referral Code',
        desc: "Signup on one of our partnered websites using Code 'IPPA'",
        icon: '/images/home_page/referral-icon.svg'
      },
      {
        title: 'Redeem',
        desc: 'Collect points and redeem Rewards',
        icon: '/images/home_page/redeem-icon.svg'
      }
    ]
  }
  render () {
    return (
    <>
    {/* Site Banner */}
      <BannerSlider content={this.state.sliderData}/>
      <section className="ippa__container has__triangle-bkg">
        <div className="ippa__container-dots dots-1">
          <img src="/images/bkg/dots-poker-room-1.svg" width="161" />
        </div>
        <div className="ippa__container-dots dots-2">
          <img src="/images/bkg/dots.svg" width="109"/>
        </div>
        <div className="ippa__ad">
          {this.state.advUrl.map((url, i) => {
            return (
              <div key={i} className="ippa__ad-item">
                <a href="" className="ippa__ad-link"><img src={this.state.advUrl[i]} /></a>
              </div>
            )
          })}
        </div>
        <div className="ippa__content">
          <div className="intro__content">
            <h6 className="intro__subtitle">What We Do</h6>
            <h2 className="intro__title">No capes. No mind control. Just Gaming Experience</h2>
            <p className="intro__desc">After being India's biggest Poker community of more than 12k passionate Indian poker players we aim to reach out to masses to promote Poker as a game of Skill, educate people about the game and provide a platform in India where everyone can share, learn and celebrate the growth of Poker.</p>
            <p className="intro__desc">We at IPPA aim to provide the best gaming experience in India by working with our partnered websites to provide an A to Z solution place for Indian Poker enthusiasts. Whether you are beginning your Poker journey and want to learn and improve your poker skills or looking for the most advantageous promotions &amp; deals or simply want to boost your Bankroll we have something for everyone.</p>
          </div>
        </div>
        <div className="ippa__content">
          <div className="ippa_work">
            <header className="ippa__section-header">
              <div class="ippa__section-dots"><img src="/images/bkg/dots-poker-room-1.svg"/></div>
              <div class="ippa__header-content">
                <h3 className="ippa__header-title">How it works</h3>
                <h6 className="ippa__header-subtitle">30 second sign-up because your time is money</h6>
              </div>
            </header>
            <div class="work__content ippa__card-container">
              {this.cardContent.map((card, i) => {
                return <div key={i} className="ippa__card">
                  <div className="ippa__card-icon"><img src={card.icon} width="80" /></div>
                  <h5 className="ippa__card-title">{card.title}</h5>
              <p className="ippa__card-desc">{card.desc}</p>
                </div>
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="ippa__container has__triangle-bkg has__triangle-inverse">
        <div class="ippa__content faq__content">
            <header className="ippa__section-header">
              <div class="ippa__section-dots"><img src="/images/bkg/dots-poker-room-1.svg"/></div>
              <div class="ippa__header-content">
                <h3 className="ippa__header-title">FAQ’s</h3>
                <h6 className="ippa__header-subtitle">Wondering how does it all work? Or you are new to poker and don't know where to begin? Well Anyways we are here to help you.</h6>
              </div>
            </header>
        </div>
      </section>
    </>
    )
  }
}

export default Home;

class BannerSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sliderContent = props.content;
    this.bannerRef = React.createRef();
  }

  componentDidMount () {
    let bannerHt = 0,
        headerEle = document.querySelector('.site__header'),
        headerHt = headerEle.getBoundingClientRect().height;
    bannerHt = window.innerHeight - headerHt - 8 + 'px';
    this.bannerRef.current.style.height = bannerHt;
  }

  render() {
    const params = {
      pagination: {
        el: '.banner__slider-pagination',
        clickable: true
      },
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      navigation: {
        nextEl: '.nav-right',
        prevEl: '.nav-left'
      },
      renderPrevButton: () => <div className="banner__slider-nav nav-left"><img src="/images/banner_slider/carousel-arrow-left.svg" alt="Left Arrow" width="34" /></div>,
      renderNextButton: () => <div className="banner__slider-nav nav-right"><img src="/images/banner_slider/carousel-arrow-right.svg" alt="Right Arrow" width="34" /></div>
    }
    return(
      <div className="site__banner" ref={this.bannerRef}>
        <Swiper {...params}>
          {this.sliderContent.map((con, i) => {
            return (
              <div className="banner__slider">
                <div className="banner__slider-item item-static">
                  <div className="banner__item-dots top"><img src="/images/bkg/dots-poker-room-1.svg"></img></div>
                  <div className="banner__item-dots bottom"><img src="/images/bkg/dots-poker-room-1.svg"></img></div> 
                  <div className="banner__slider-content">
                    <h1 className="banner__slider-title">{con.title}</h1>
                    <p className="banner__slider-desc">{con.description}</p>
                    <a href="" className="btn ippa__btn btn-primary banner__slider-cta">{con.cta}</a>
                  </div>
                </div>
                <div className="banner__slider-item item-float" style={{backgroundImage: `url(${con.imgSrc})`}}></div>
              </div>
            );
          })}
        </Swiper>
        <div className="banner__slider-pagination"></div>
      </div>
    )
  }
}