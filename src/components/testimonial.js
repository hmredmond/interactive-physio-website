import React, { Component } from "react";
import Slider from "react-slick";

var settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 6000,
};

export default class Testimonial extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="slider-section section testimonials" id="Testimonials">
        <div className="container">
          <div className="section-head text-center">
            <h2>Testimonials</h2>
          </div>
          <Slider {...settings}>
            {data.edges.map((item, index) => {
              return (
                <div key={item + "-" + index} className="testimonials-item">
                  <div className="testi-inner">
                    <img
                      className="avatar"
                      alt={item.node.name}
                      src={item.node.avatarImage.file.url}
                    />
                    <h4>{item.node.subTitle}</h4>
                    <div className="quote-box">
                      <span className="quotation quotation-start">“</span>
                      <p
                        className="quote"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.node.description.childMarkdownRemark.html +
                            ` <span class="author">` +
                            item.node.name +
                            `</span>
                            <span class="quotation quotation-end">”</span>`,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}
