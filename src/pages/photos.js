import React, { Component } from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Banner from "../components/banner";

export default class PhotosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePopup: false,
      selectedItem: 0,
    };
  }

  render() {
    const { data } = this.props;
    const { activePopup, selectedItem } = this.state;

    return (
      <Layout>
        <SEO
          title={data.allContentfulPages.nodes[0].seo.title}
          keywords={data.allContentfulPages.nodes[0].seo.keywords}
          description={data.allContentfulPages.nodes[0].seo.description}
        />
        <Banner
          data={data.contentfulAboutMe}
          site={data.contentfulSiteInformation}
          page={data.allContentfulPages.nodes[0]}
        ></Banner>
        <div className="blogs-page" id="Blogs">
          <div className="container">
            <section>
              <ul className="photos-page-list">
                {data.contentfulPhotos.photos.map((item, index) => {
                  return (
                    <li key={index} className="item">
                      <div
                        className="inner"
                        onClick={() => {
                          this.setState({
                            activePopup: true,
                            selectedItem: index,
                          });
                        }}
                      >
                        <Img
                          fluid={item.fluid}
                          objectFit="cover"
                          objectPosition="50% 50%"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
            {activePopup ? (
              <div className="rg-popup">
                <span
                  className="popup-layer"
                  onClick={() => {
                    this.setState({
                      activePopup: false,
                    });
                  }}
                ></span>

                <div className="popup-inner">
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      this.setState({
                        activePopup: false,
                      });
                    }}
                  ></i>
                  <img
                    src={data.contentfulPhotos.photos[selectedItem].file.url}
                    alt="popup-img"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Layout>
    );
  }
}
export const pageQuery = graphql`
  query PhotosPageQuery {
    contentfulPhotos {
      photos {
        file {
          url
        }
        fixed(
          cropFocus: TOP
          quality: 10
          resizingBehavior: CROP
          toFormat: JPG
          width: 400
          height: 250
        ) {
          aspectRatio
          base64
          height
          src
          srcSet
          srcSetWebp
          srcWebp
          width
        }
        fluid(maxWidth: 600) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }

    allContentfulSeo(filter: { page: { eq: "Photos" } }) {
      edges {
        node {
          description
          page
          title
          keywords
        }
      }
    }
    allContentfulPages(filter: { page: { eq: "Photos" } }) {
      nodes {
        description {
          childMarkdownRemark {
            html
          }
          description
        }
        pageTitle
        page
        bannerImage {
          file {
            url
          }
          fluid(maxWidth: 1500) {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
        seo {
          ... on ContentfulSeo {
            keywords
            description
          }
        }
      }
    }
    contentfulSiteInformation {
      menus
      logo {
        file {
          url
        }
      }
    }
  }
`;
