import React, { Component } from "react";

export default class footer extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="site-footer" id="footer">
        <section className="connect">
          <h4>
            <span>Connect</span>
            <span>with</span>
            <span>us</span>
          </h4>
          <ul className="social">
            <li key="social-email">
              <a
                className="far fa-envelope"
                href={`mailto:` + data.email}
                rel="noopener noreferrer"
              >
                <span className="sr-only">Email link</span>
              </a>
            </li>

            <li key="social-twitter">
              <a
                className="fab fa-twitter"
                href={data.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter link</span>
              </a>
            </li>
            <li key="social-insta">
              <a
                className="fab fa-instagram"
                href={data.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram link</span>
              </a>
            </li>
            <li key="social-linkedin">
              <a
                className="fab fa-linkedin-in"
                href={data.linkdin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <span className="sr-only">linkedIn link</span>
              </a>
            </li>
          </ul>
          <div className="contact-info container">
            <div className="contact-phone">
              <i className="fa fa-phone"></i>

              <a href="tel:+447929626123">+44 7929 626123</a>
            </div>

            <div className="contact-email">
              <i className="far fa-envelope"></i>

              <a href="mailto:hello@interactivephysio.com">
                hello@interactivephysio.com
              </a>
            </div>
          </div>
        </section>

        <section className="copyright container">
          <span className="policies-link left">
            <a href="/privacy">Privacy Policy</a>
            <a href="/data">Data Protection Policy</a>
          </span>
          <span>&copy;{this.props.siteName} 2020</span>
          <span>
            Site Design by{" "}
            <a href="mailto:dianad@colorbitor.com">Diana Dumitrescu</a>
          </span>
        </section>
      </div>
    );
  }
}
