import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./header";
import Footer from "./footer";

import "../scss/style.scss";

if (typeof window !== "undefined") {
  // require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({ children, header, active }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        contentfulAboutMe {
          name
          facebook
          gmail
          email
          id
          instagram
          linkdin
          twitter
          location
          description {
            childMarkdownRemark {
              html
            }
          }
        }
        contentfulIds {
          formspree
        }
        contentfulSiteInformation {
          siteName
          siteDescription
          logo {
            file {
              url
            }
          }
          menus
        }

        allContentfulBlogs(
          limit: 5
          skip: 1
          sort: { fields: createdAt, order: DESC }
        ) {
          edges {
            node {
              title
            }
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Header
          data={data.contentfulSiteInformation}
          siteTitle={data.contentfulSiteInformation.siteName}
          header={header}
          active={active}
          hasBlogs={data.allContentfulBlogs.edges.length > 0}
        />
        <div>
          <main>{children}</main>
        </div>
        <Footer
          siteName={data.contentfulSiteInformation.siteName}
          data={data.contentfulAboutMe}
          site={data.contentfulIds}
        />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
