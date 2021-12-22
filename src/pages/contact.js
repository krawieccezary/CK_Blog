import * as React from "react";
import { graphql } from 'gatsby';

import ContactForm from "../components/ContactForm";
import Layout from "../components/layout";
import Seo from "../components/seo";

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contact" />
      <h1>Contact</h1>
      <p>If you have a question, comment or idea, let's write to me. I will try to help you.</p>
      <ContactForm />
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