import * as React from "react";
import { graphql } from 'gatsby';

import Layout from "../components/layout";
import Seo from "../components/seo";

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contact" />
      <h2>Contact</h2>
    </Layout>
  )
}

export default Contact;


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`