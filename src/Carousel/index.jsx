import React from 'react';
import './carousel.scss';

import PropTypes from 'prop-types';

const changeSlides = (slideIndex, n) => {
    showSlides(slideIndex += n);
}

const currentSlide = (slideIndex, n) => {
    showSlides(slideIndex = n);
}

const showSlides = (slideIndex, n) => {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('dots');
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    // slides[slideIndex - 1].style.display = 'block';
    // dots[slideIndex - 1].className += ' active';
}

const Carousel = () => {
    var slideIndex = 1;
    return (
        <>
            <div className="slideshow-container">
                <div className="mySlides fade">
                    <div className="text">Caption Text</div>
                    <div className='img--container'>
                        <img src="/images/poker-carousel-img.jpg" style={{ width: '100%', zIndex: 1 }} alt='' />
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <span className='dots active' onClick={currentSlide(slideIndex, 1)}></span>
                        </div>
                        <div className='carousel-arrows--container'>
                            <div className="prev" onClick={changeSlides(slideIndex, -1)}><img src='images/carousel-arrow.svg' alt='' /></div>
                            <div className="next" onClick={changeSlides(slideIndex, 1)}><img src='images/carousel-arrow.svg' alt='' /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Carousel.prototype = {

}

Carousel.defaultProps = {

}

export default Carousel;