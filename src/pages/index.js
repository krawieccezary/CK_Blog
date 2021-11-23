import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Article from "../components/article";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allDatoCmsPost.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
        {posts.map(post => <Article key={post.id} {...post} />)}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allDatoCmsPost(sort: {fields: meta___publishedAt, order: DESC}, filter: {meta: {status: {eq: "published"}}}){
      nodes {
        id
        title
        introduction
        slug
        tags {
          name
          slug
        }
        meta {
          publishedAt(formatString: "D-M-Y")
        }
        content {
          blocks
          links
          value
        }
      }
    }
  }
`
