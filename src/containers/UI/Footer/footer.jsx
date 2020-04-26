import React, { Component } from 'react';
import './footer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faYoutube, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.yearRef = React.createRef();
  }

  componentDidMount () {
    let date = new Date(),
        yearVal = date.getFullYear();
    this.yearRef.current.textContent = yearVal;
  }

  render () {
    return (
      <footer className="site__footer">
        <div className="footer__content">
          <div class="footer__content-dots dots__top">
            <img src="/images/bkg/dots-footer.svg" />
          </div>
          <div class="footer__content-dots dots__bottom">
            <img src="/images/bkg/dots-footer.svg" />
          </div>
          <div className="footer__item">
            <h5 className="footer__item-title">Where to find us</h5>
            <p className="footer__item-desc">Global Maritime Forum<br />
              Amaliegade 33B, 2nd Floor<br />
              1256 Copenhagen K<br />
              Denmark</p>
            <h5 className="footer__item-title">Follow us</h5>
            <ul className="footer__list footer__list-inline">
              <li className="footer__list-item social_link"><a href="" title="Facebook">
                  <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                </a></li>
              <li className="footer__list-item social_link"><a href="" title="Twitter">
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </a></li>
              <li className="footer__list-item social_link"><a href="" title="Instagram">
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </a></li>
              <li className="footer__list-item social_link"><a href="" title="Youtube">
                <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
              </a></li>
            </ul>
          </div>
          <div className="footer__item">
            <h5 className="footer__item-title">Get in touch</h5>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href=""><span class="footer__list-icon"><FontAwesomeIcon icon={faMobileAlt}></FontAwesomeIcon></span>+45 3840 1800</a>
              </li>
              <li className="footer__list-item">
                <a href=""><span class="footer__list-icon"><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></span>info@ippa.in</a>
              </li>
            </ul>
          </div>
          <div className="footer__item has__border-left">
            <h5 className="footer__item-title">Services</h5>
            <ul className="footer__list">
              <li className="footer__list-item"><a href="">Videos</a></li>
              <li className="footer__list-item"><a href="">Forums</a></li>
              <li className="footer__list-item"><a href="">News</a></li>
              <li className="footer__list-item"><a href="">Articles</a></li>
              <li className="footer__list-item"><a href="">Promotions</a></li>
              <li className="footer__list-item"><a href="">Game Finder</a></li>
              <li className="footer__list-item"><a href="">Learning Curve</a></li>
            </ul>
          </div>
          <div className="footer__item">
            <h5 className="footer__item-title">Resources</h5>
            <ul className="footer__list">
              <li className="footer__list-item"><a href="">Press</a></li>
              <li className="footer__list-item"><a href="">Blogs</a></li>
            </ul>
          </div>
          <div className="footer__item">
            <h5 className="footer__item-title">Support</h5>
            <ul className="footer__list">
              <li className="footer__list-item"><a href="">Terms</a></li>
              <li className="footer__list-item"><a href="">Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__band">
          <p className="footer__band-desc">
            Copyright &copy; <span ref={this.yearRef}>2019</span> Indian Poker Players Association. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer;