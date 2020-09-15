import React, { Component } from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Banner from "../components/banner";

export default class Blogs extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <SEO
          title={data.allContentfulSeo.edges[0].node.title}
          keywords={data.allContentfulSeo.edges[0].node.keywords}
          description={data.allContentfulSeo.edges[0].node.description}
        />
        <Banner
          data={data.contentfulAboutMe}
          site={data.contentfulSiteInformation}
          page={data.allContentfulPages.nodes[0]}
        ></Banner>
        <div className="blogs-page" id="Blogs">
          <div className="container">
            <section>
              <ul
                className={`blogs-list ${
                  data.allContentfulBlogs.edges.length < 5 ? "few-blogs" : ""
                }`}
              >
                {data.allContentfulBlogs.edges.length === 0 && (
                  <div>
                    There are currently no blogs to view. Please check back
                    later.
                  </div>
                )}
                {data.allContentfulBlogs.edges.map((item, index) => {
                  return (
                    <li key={index} className="item">
                      <div className="inner">
                        <Link className="link" to={"../" + item.node.slug} />
                        {item.node.featureImage ? (
                          <img
                            src={item.node.featureImage.file.url}
                            alt={`${item.node.title} blog`}
                            className="companylogo"
                          />
                        ) : (
                          <div className="no-image"></div>
                        )}
                        <div className="details">
                          <h3 className="title">{item.node.title}</h3>
                          <span className="date light">
                            {moment(item.node.createdAt).format("LL")}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>{" "}
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogsQuery {
    allContentfulSeo(filter: { page: { eq: "Blogs" } }) {
      edges {
        node {
          description
          page
          title
          keywords
        }
      }
    }
    allContentfulPages(filter: { page: { eq: "Blogs" } }) {
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

    allContentfulBlogs(skip: 1, sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          title
          slug
          featureImage {
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
          createdAt
        }
      }
    }
  }
`;
