import * as React from "react";
import { graphql } from 'gatsby';

import ContactForm from "../components/ContactForm";
import Layout from "../components/layout";
import Seo from "../components/seo";

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Kontakt" />
      <h1>Kontakt</h1>
      <p>Jeśli masz pytanie, komentarz lub pomysł, napisz do mnie. Postaram się pomóc.</p>
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