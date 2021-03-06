import { Link } from "gatsby";
import React, { Component } from "react";
import classnames from "classnames";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  render() {
    const { data, header, active, hasBlogs } = this.props;
    const { menu } = this.state;

    return (
      <header className={`site-header ${menu ? "active" : ""}`}>
        <div className="container">
          <div className="header-main">
            <div className="logo">
              <Link to="/">
                {data.logo.file.url ? (
                  <img src={data.logo.file.url} alt="logo" />
                ) : (
                  <span>{data.siteName}</span>
                )}
              </Link>
            </div>
            <div
              role="button"
              tabIndex="0"
              className="responsive-menu"
              onClick={() => {
                this.setState({
                  menu: !menu,
                });
              }}
            >
              <span></span>
            </div>
            {header === "home" || active !== null ? (
              <div className="menu">
                <ul
                  onClick={() => {
                    this.setState({
                      menu: false,
                    });
                  }}
                >
                  <li key="home">
                    <Link
                      to="/#home"
                      className={classnames({ active: active === "home" })}
                    >
                      Home
                    </Link>
                  </li>
                  {data.menus
                    .filter((item) => item === "Service")
                    .map((t) => {
                      return (
                        <li key="service">
                          <Link
                            to={`/services`}
                            className={classnames({
                              active: active === "services",
                            })}
                          >
                            Services
                          </Link>
                        </li>
                      );
                    })}

                  {data.menus
                    .filter((item) => item === "About")
                    .map((t) => {
                      return (
                        <li key="about">
                          <Link
                            to={`/about`}
                            className={classnames({
                              active: active === "about",
                            })}
                          >
                            Who We Are
                          </Link>
                        </li>
                      );
                    })}

                  {data.menus
                    .filter((item) => item === "Faqs")
                    .map((t) => {
                      return (
                        <li key="faq">
                          <Link
                            to={`/faqs`}
                            className={classnames({
                              active: active === "faqs",
                            })}
                          >
                            FAQs
                          </Link>
                        </li>
                      );
                    })}
                  {hasBlogs &&
                    data.menus
                      .filter((item) => item === "Blogs")
                      .map((t) => {
                        return (
                          <li key="blogs">
                            <Link to={`/blogs`}>Blogs</Link>
                          </li>
                        );
                      })}

                  {data.menus
                    .filter((item) => item === "Contact")
                    .map((t) => {
                      return (
                        <li key="contact">
                          <Link to={`/#Contact`}>Contact</Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : (
              <div className="menu">
                <ul
                  onClick={() => {
                    this.setState({
                      menu: false,
                    });
                  }}
                >
                  <li key="home">
                    <Link to="/#home">Home</Link>
                  </li>
                  {data.menus
                    .filter((item) => item === "Blogs")
                    .map((t) => {
                      return (
                        <li key="blogs">
                          <Link to="/blogs">Blogs</Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}
