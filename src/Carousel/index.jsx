import React from 'react';
import './carousel.scss';

import PropTypes from 'prop-types';

import CustomButton from '../customComponents/CustomButton';

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
    const slidesConfig = [
        {
            header: 'Become a Successful Poker Player soon',
            content: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
            imgUrl: '/images/poker-carousel-img.jpg'
        },
        // {
        //     header: 'Become a Successful Poker Player Today',
        //     content: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
        //     imgUrl: '/images/poker-carousel-img.jpg'
        // },
        // {
        //     header: 'Become a Successful Poker Player Today again',
        //     content: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
        //     imgUrl: '/images/poker-carousel-img.jpg'
        // }
    ];
    return (
        <>
            <div className="slideshow-container">
                {slidesConfig.map((data, index) =>
                    <div className="mySlides active fade" key={`${index}-${data.imgUrl}`}>
                        <div className="text">
                            <div className='carousel-text--container'>
                                <header className='carousel--header'>{data.header}</header>
                                <p>{data.content}</p>
                                <CustomButton
                                    style={{ marginTop: 40 }}
                                    label={'Get Started'}
                                    isPrimary={true}
                                />
                            </div>
                        </div>
                        <div className='img--container'>
                            <img src={data.imgUrl} style={{ width: '100%', borderRadius: 6 }} alt='' />
                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                <span className='dots active' onClick={currentSlide(slideIndex, 1)}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div className='carousel-arrows--container'>
                    <img src='images/carousel-arrow.svg' alt='prev-arrow' className="prev" onClick={changeSlides(slideIndex, -1)} />
                    <img src='images/carousel-arrow.svg' alt='next-arrow' className="next" onClick={changeSlides(slideIndex, 1)} />
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