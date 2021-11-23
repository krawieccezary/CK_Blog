import * as React from "react";
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from "../components/layout";
import Seo from "../components/seo";

const AboutMe = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const aboutPage = data.datoCmsAbout;
  console.log(data);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About me" />
      <div className="bio">
        <div className="bio-content">
          <h2>{aboutPage.header}</h2>
          <main>{aboutPage.content}</main>
        </div>
        <GatsbyImage image={aboutPage.image.gatsbyImageData}/>
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