import React, { Component } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Banner from "../components/banner";

export default class FAQs extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout active="faqs">
        <SEO
          title={data.allContentfulPages.nodes[0].seo.title}
          keywords={data.allContentfulPages.nodes[0].seo.keywords}
          description={data.allContentfulPages.nodes[0].seo.description}
        />
        <span id="faq-top"></span>
        <Banner
          data={data.contentfulAboutMe}
          site={data.contentfulSiteInformation}
          main={false}
          page={data.allContentfulPages.nodes[0]}
        ></Banner>
        <section className="internal-links">
          <div className="container">
            <h4>
              Jump to one of our <span>FAQs</span>:
            </h4>
            <ul className={`internal-links-list`}>
              {data.allContentfulFaq.edges.map((item, index) => {
                return (
                  <li key={"faq-" + index} className="item">
                    <div className="inner">
                      <div className="faq">
                        <span className="question">
                          <div>
                            <a href={"#faq-" + index}>{item.node.question}</a>
                          </div>
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <div className="container faqs-page" id="FAQs">
          <div
            className="hide-in-desktop page-introduction"
            dangerouslySetInnerHTML={{
              __html:
                data.allContentfulPages.nodes[0].description.childMarkdownRemark
                  .html,
            }}
          />

          <ul className={`faq-list`}>
            {data.allContentfulFaq.edges.map((item, index) => {
              return (
                <li key={"faq-" + index} className="item">
                  <span className="anchor-link" id={"faq-" + index}></span>
                  <div className="inner">
                    <div className="faq">
                      <h3 className="question">
                        {item.node.question.replace("?", "")}{" "}
                        <span className="question-mark">?</span>
                      </h3>
                      <span className="question">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.node.ans.childMarkdownRemark.html,
                          }}
                        />
                        <a href="#faq-top" className="back-to-top">
                          Back to top <span></span>
                        </a>
                        {index !== data.allContentfulFaq.edges.length - 1 && (
                          <span className="divider"></span>
                        )}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query FAQPageQuery {
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
    allContentfulFaq {
      edges {
        node {
          question
          ans {
            childMarkdownRemark {
              html
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

    allContentfulPages(filter: { page: { eq: "Faqs" } }) {
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
            description
            title
          }
        }
      }
    }
  }
`;
