import * as React from "react";
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from "../components/layout";
import Seo from "../components/seo";

const AboutMe = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const aboutPage = data.datoCmsAbout;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <div className="bio">
        <div className="bio-content">
          <GatsbyImage image={aboutPage.image.gatsbyImageData} alt="me"/>
          <main dangerouslySetInnerHTML={{__html: aboutPage.contentNode.childMarkdownRemark.html}}></main>
        </div>
      </div>
    </Layout>
  )
}

export default AboutMe;


export const aboutQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    datoCmsAbout {
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      content
      header
      image {
        gatsbyImageData(
          height: 250
          placeholder: BLURRED
          imgixParams: {mask: "corners", cornerRadius: "500, 500, 500, 500"}
          forceBlurhash: false
        )
      }
    }
  }
`