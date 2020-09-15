import React, { Component } from "react";
import { graphql } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import Banner from "../components/banner";
import Breadcrumbs from "../components/breadcrumbs";

export default class blogPost extends Component {
  render() {
    const data = this.props.data.contentfulBlogs;

    const siteurl = this.props.data.contentfulSiteInformation.siteUrl + "/";
    const twiteerhandle = this.props.data.contentfulSiteInformation
      .twiteerHandle;
    const socialConfigss = {
      site: {
        siteMetadata: { siteurl, twiteerhandle },
      },
      title: data.title,
      slug: data.slug,
    };

    return (
      <Layout>
        <SEO
          title={data.title}
          keywords={[
            `${data.title}`,
            this.props.data.allContentfulSeo.edges[0].node.keywords,
          ]}
        />
        <div className="blog-post">
          {data.featureImage ? (
            <Banner
              page={{
                ...data,
                bannerImage: data.featureImage,
                page: "blog-post",
                pageTitle: data.title,
                dateCreated: data.createdAt,
              }}
            ></Banner>
          ) : (
            <div className="no-image"></div>
          )}
          <div className="container">
            <div className="details">
              <Breadcrumbs
                page={data.title}
                parent={{ link: "/blogs", title: "Blogs" }}
                homepage={true}
              ></Breadcrumbs>
              <div className="hide-in-desktop page-introduction">
                <span className="light">
                  Published {moment(data.createdAt).format("LL")}
                </span>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: data.description.childMarkdownRemark.html,
                }}
              />
            </div>
            <Share
              socialConfig={{
                ...socialConfigss.site.siteMetadata.twiteerhandletitle,
                config: {
                  url: `${siteurl}${socialConfigss.slug}`,
                  title: `${socialConfigss.title}`,
                },
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query SinglePostQuery($slug: String!) {
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
    contentfulBlogs(slug: { eq: $slug }) {
      id
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
      description {
        childMarkdownRemark {
          html
        }
      }
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;
