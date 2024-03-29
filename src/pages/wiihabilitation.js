import React, { Component } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Banner from "../components/banner";
import Pricing from "../components/pricing";

export default class WiiHabilitation extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout active="wiihab">
        <SEO
          title={data.allContentfulPages.nodes[0].title}
          keywords={data.allContentfulPages.nodes[0].seo.keywords}
          description={data.allContentfulPages.nodes[0].seo.description}
        />
        <span id="wiihab-top"></span>
        <Banner
          data={data.contentfulAboutMe}
          site={data.contentfulSiteInformation}
          page={data.allContentfulPages.nodes[0]}
        ></Banner>

        <section className="internal-links">
          <div className="container">
            <h4>
              Jump to:
            </h4>
            <ul className="internal-links-list">
              {data.allContentfulWiiHab.edges.map((item, index) => {
                const ref = item.node.title.split(" ").join("_");
                return (
                  <li key={ref}>
                    <a href={"#" + ref}>{item.node.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <div className="container wiihab-page" id="wiihab">
          <div
            className="hide-in-desktop page-introduction"
            dangerouslySetInnerHTML={{
              __html:
                data.allContentfulPages.nodes[0].description.childMarkdownRemark
                  .html,
            }}
          />

          {data.allContentfulWiiHab.edges.map((item, index) => {
            const ref = item.node.title.split(" ").join("_");
            return (
              <section key={ref}>
                <span id={ref} className="link-anchor"></span>
                <h2>
                  {item.node.title.split(" ").map((item, index) => {
                    return <span key={item + "-" + index}>{item}</span>;
                  })}
                </h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: item.node.description.childMarkdownRemark.html,
                  }}
                />
                <a href="#wiihab-top" className="back-to-top">
                  Back to top<span></span>
                </a>
                {index !== data.allContentfulWiiHab.edges.length - 1 && (
                  <span className="divider"></span>
                )}
              </section>
            );
          })}
        </div>

        {data.contentfulSiteInformation.menus
          .filter((item) => item === "_Pricing")
          .map((t) => {
            return (
              <div className="wiihab-pricing" key="pricing-section">
                <Pricing data={data.allContentfulPricing}></Pricing>
              </div>
            );
          })}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query WiiHabPageQuery {
    contentfulIds {
      formspree
    }
    contentfulSiteInformation {
      menus
      logo {
        file {
          url
        }
      }
    }
    allContentfulWiiHab(sort: { order: ASC, fields: order }) {
      edges {
        node {
          strapLine
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          icon {
            file {
              url
            }
          }
        }
      }
    }
    contentfulAboutMe {
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
    }
    allContentfulPricing(sort: { order: ASC, fields: order }) {
      edges {
        node {
          features
          price
          timeUnit
          title
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPages(filter: { page: { eq: "Wiihabilitation" } }) {
      nodes {
        description {
          childMarkdownRemark {
            html
          }
          description
        }
        pageTitle
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
        page
        seo {
          ... on ContentfulSeo {
            keywords
            title
            description
          }
        }
      }
    }
  }
`;
