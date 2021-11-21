import * as React from "react";
import { graphql } from 'gatsby';

import Layout from "../components/layout";
import Seo from "../components/seo";

const AboutMe = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About me" />
      <h2>About me</h2>
    </Layout>
  )
}

export default AboutMe;


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`