import React from 'react';
import './carousel.scss';

import PropTypes from 'prop-types';

import CustomButton from '../customComponents/CustomButton';

class Carousel extends React.PureComponent {

    constructor(props) {
        super(props);
        this.slideIndex = 0;
        this.slidesConfig = [
            {
                header: 'Become a Successful Poker Player soon',
                content: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
                imgUrl: '/images/poker-carousel-img.jpg'
            },
            {
                header: 'Become a Successful Poker Player Today',
                content: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
                imgUrl: '/images/poker-carousel-img.jpg'
            },
            {
                header: 'Become a Successful Poker Player Today again',
                content: 'Pick up profitable tricks and useful tips in the poker video strategy lessons from ippa.com, the leading poker school worldwide.',
                imgUrl: '/images/poker-carousel-img.jpg'
            }
        ];
    }

    componentDidMount() {
        this.showSlides(this.slideIndex);
    }

    changeSlides = (n) => {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide = (n) => {
        this.showSlides(this.slideIndex = n);
    }

    showSlides = (n) => {
        var i;
        var slides = document.getElementsByClassName('mySlides');
        if (slides.length) {
            var dots = document.getElementsByClassName('dots');
            if (n >= slides.length) {
                this.slideIndex = 0;
            }
            if (n < 0) {
                this.slideIndex = slides.length - 1;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            } slides[this.slideIndex].style.display = 'flex';
            dots[this.slideIndex].className += ' active';
        }
    }
    render() {
        return (
            <>
                <div className="slideshow-container">
                    {/* <div> */}
                        {this.slidesConfig.map((data, index) =>
                            <div className="mySlides fade" id={'mySlides'} key={`${index}-${data.imgUrl}`}>
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
                                    <div className='something'>
                                        {/* {this.slidesConfig.map((data, index) => */}
                                            <span className='dots' onClick={() => this.currentSlide(index)} key={`${index}`}></span>
                                        {/* )} */}
                                    </div>
                                </div>
                            </div>
                        )}
                    {/* </div> */}
                    <div className='carousel-arrows--container'>
                        <img src='images/carousel-arrow.svg' alt='prev-arrow' className="prev" onClick={() => this.changeSlides(-1)} />
                        <img src='images/carousel-arrow.svg' alt='next-arrow' className="next" onClick={() => this.changeSlides(1)} />
                    </div>
                </div>
            </>
        );
    }
}

Carousel.propTypes = {

}

Carousel.defaultProps = {

}

export default Carousel;