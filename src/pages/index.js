import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Banner from "../components/banner";
import Service from "../components/service";

import Testimonial from "../components/testimonial";
import Contact from "../components/contact";
import Faqs from "../components/faqs";
import About from "../components/about";
import Pricing from "../components/pricing";

const IndexPage = ({ data }) => (
  <Layout header="home">
    <SEO
      title={data.allContentfulSeo.edges[0].node.title}
      keywords={data.allContentfulSeo.edges[0].node.keywords}
      description={data.allContentfulSeo.edges[0].node.description}
    />
    <Banner
      data={data.contentfulAboutMe}
      site={data.contentfulSiteInformation}
      page={data.contentfulAboutMe}
    ></Banner>

    {data.contentfulSiteInformation.menus
      .filter((item) => item === "Service")
      .map((t) => {
        return (
          <Service
            key="service-section"
            data={data.allContentfulService}
            page={
              data.allContentfulPages.edges
                .map(function(x) {
                  return x.node;
                })
                .filter(function(v) {
                  return v.page === "Services";
                })[0]
            }
          ></Service>
        );
      })}

    {data.contentfulSiteInformation.menus
      .filter((item) => item === "About")
      .map((t) => {
        return (
          <About
            key="about-section"
            data={
              data.allContentfulPages.edges
                .map(function(x) {
                  return x.node;
                })
                .filter(function(v) {
                  return v.page === "About";
                })[0]
            }
          ></About>
        );
      })}

    {data.contentfulSiteInformation.menus
      .filter((item) => item === "Testimonials")
      .map((t) => {
        return (
          <Testimonial
            key="testimonial-section"
            data={data.allContentfulTestimonials}
          ></Testimonial>
        );
      })}

    {data.contentfulSiteInformation.menus
      .filter((item) => item === "Faqs")
      .map((t) => {
        return (
          <Faqs
            key="faq-section"
            page={
              data.allContentfulPages.edges
                .map(function(x) {
                  return x.node;
                })
                .filter(function(v) {
                  return v.page === "Faqs";
                })[0]
            }
          ></Faqs>
        );
      })}

    {data.contentfulSiteInformation.menus
      .filter((item) => item === "Pricing")
      .map((t) => {
        return (
          <div key="pricing-section">
            <Pricing data={data.allContentfulPricing}></Pricing>
            <div className="see-more clearfix">
              <a href="/services#Treatment_Options">
                <span>More Details</span>
              </a>
            </div>
          </div>
        );
      })}

    {data.contentfulSiteInformation.menus
      .filter((item) => item === "Contact")
      .map((t) => {
        return (
          <Contact
            key="contact-section"
            data={data.contentfulIds.formspree}
            page={
              data.allContentfulPages.edges
                .map(function(x) {
                  return x.node;
                })
                .filter(function(v) {
                  return v.page === "Contact";
                })[0]
            }
          ></Contact>
        );
      })}
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    contentfulIds {
      formspree
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
    allContentfulPages {
      edges {
        node {
          page
          pageTitle
          childContentfulPagesDescriptionTextNode {
            description
          }
        }
      }
    }
    contentfulAboutMe {
      name
      photo {
        file {
          url
        }
        fluid {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      designation
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

      bannerImage {
        file {
          url
        }
        description
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
      bannerList
    }
    allContentfulService(sort: { order: ASC, fields: order }, limit: 3) {
      edges {
        node {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          strapLine
          order
          forHealthCareProfessionals
          icon {
            file {
              url
            }
          }
        }
      }
    }

    allContentfulTestimonials {
      edges {
        node {
          name
          subTitle
          description {
            childMarkdownRemark {
              html
            }
          }
          avatarImage {
            fluid(maxWidth: 200) {
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
      }
    }

    allContentfulSeo(filter: { page: { eq: "Index" } }) {
      edges {
        node {
          description
          page
          title
          keywords
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
  }
`;
