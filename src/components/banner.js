import React, { Component } from "react";
import classNames from "classnames";
import moment from "moment";

export default class Banner extends Component {
  render() {
    const { data, site, page } = this.props;
    const isMain = !page.page;
    const showSummary = page.page !== "Data" && page.page !== "Privacy";

    return (
      <div className={classNames("banner", { secondary: !isMain })} id="home">
        <img
          className="full"
          alt={
            page.bannerImage.description
              ? page.bannerImage.description
              : "Feature Image"
          }
          src={page.bannerImage.file.url}
        />

        <div className="container">
          <div
            className={classNames("banner-details", {
              secondary: !isMain,
              container: !isMain,
            })}
          >
            {isMain ? (
              <span className="main-title">
                {site.logo.file.url ? (
                  <img
                    src={site.logo.file.url}
                    alt="logo"
                    className="companylogo"
                  />
                ) : (
                  <span></span>
                )}
                <span className="companyName">
                  <span className="light">{data.name.split(" ")[0]}</span>{" "}
                  <span className="heavy">{data.name.split(" ")[1]}</span>
                </span>
                <div>{data.designation}.</div>
                <ul className="sub-data">
                  {data.bannerList.map((item, index) => {
                    return <li key={index + "-" + item}>{item}</li>;
                  })}
                </ul>
              </span>
            ) : (
              <div className="content">
                <h1>
                  {page.pageTitle &&
                    page.pageTitle.split(" ").map((word, i, arr) => {
                      if (arr.length - 1 === i && arr.length > 1) {
                        return <span key={word}>{word}</span>;
                      } else {
                        return word + " ";
                      }
                    })}
                </h1>
                <span className="horizontal-line"></span>
                <div className="blog-author hide-in-mobile light">
                  Author: {page.author}
                </div>
                {page.dateCreated && (
                  <div className="hide-in-mobile light">
                    Published: {moment(page.dateCreated).format("LL")}
                  </div>
                )}
                {showSummary && page.description && !page.dateCreated && (
                  <div
                    className="hide-in-mobile"
                    dangerouslySetInnerHTML={{
                      __html: page.description.childMarkdownRemark.html,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
