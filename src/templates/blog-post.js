import * as React from "react"
import { Link, graphql } from "gatsby"
import { StructuredText } from 'react-datocms';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  console.log(data);
  const post = data.datoCmsPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.introduction}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <small>{post.meta.publishedAt}</small>
        </header>
        <StructuredText 
          data={post.content} 
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case 'DatoCmsImage':
                return <GatsbyImage image={record.image.gatsbyImageData} alt={record.image.alt} />;
              default:
                return null;
            }
          }}
        />
        <hr />
        <footer>
          {post.tags.map(tag => <Link key={tag.name} to="/" state={{ tag }}>{`#${tag.name}`}</Link>)}
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`${__PATH_PREFIX__}/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`${__PATH_PREFIX__}/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    datoCmsPost(
      id: {eq: $id}
    ) {
      content {
        links
        value
        blocks {
          __typename
          ... on DatoCmsImage {
            id: originalId
            image {
              url
              alt
              gatsbyImageData
            }
          }
        }
      }
      meta {
        publishedAt(formatString: "D-M-Y")
      }
      slug
      title
      tags {
        originalId
        name
      }
    }
    previous: datoCmsPost(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: datoCmsPost(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`
