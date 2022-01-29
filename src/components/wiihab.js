import React, { Component } from 'react';
import { Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import SvgIcon from "./svgIcon";

export default class wiihab extends Component {
  render() {
    const { data, page } = this.props;
    return (
      <div className="wiihab section" id="WiiHab">
        <div className="container">
          <div
            className="page-description"
            dangerouslySetInnerHTML={{
              __html: page.childContentfulPagesDescriptionTextNode.description,
            }}
          ></div>
          <div className="services-row">
            {data.edges
              .filter((f) => f.node.order > 0)
              .sort((a, b) => (a.node.order > b.node.order ? 1 : -1))
              .map((item, index) => {
                return (
                  <div key={item + '-' + index} className="row-item">
                    <AnchorLink
                      to={
                        '/wiihabilitation#' +
                        item.node.title.split(' ').join('_')
                      }
                      className="overlay-link"
                    >
                      <span className="sr-only">
                        {item.node.title.split(' ').join('_')}
                      </span>
                    </AnchorLink>

                    <div className="wiihab-main">
                      {item.node.icon && (
                        <div className="watermark">
                          <span className="svg">
                            <SvgIcon iconName={item.node.icon.title} />
                          </span>
                        </div>
                      )}
                      <div className="wiihab-header">
                        {item.node.icon && (
                          <span className="icon">
                            <SvgIcon iconName={item.node.icon.title} />
                          </span>
                        )}
                        <h4>
                          {item.node.title.split(' ').map((item, index) => {
                            return <span key={item + '-' + index}>{item}</span>;
                          })}
                        </h4>
                      </div>

                      <div className="strapline">{item.node.strapLine}</div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="see-more">
            <Link to="/wiihabilitation">
              <span>Find out about WiiHabilitation</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
