import * as React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

import ErrorMessage from '../components/ErrorMessage';


const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Brak strony" />
      <ErrorMessage errorMessage="I'm so sorry. Page not found." >
        <StaticImage src='../images/page-404.png' width={500} alt="Error"/>
      </ErrorMessage>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
