import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const TagPage = ({ data, location }) => {
  console.log(data, location.search);
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
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {

          return (
            <li key={post.id}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                      <span itemProp="headline">{post.title}</span>
                    </Link>
                  </h2>
                  <small>{post.meta.publishedAt}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.introduction,
                    }}
                    itemProp="description"
                  />
                </section>
                <footer>
                  {post.tags.map(tag => <a href={`${__PATH_PREFIX__}/tag/${tag.slug}`}>{`#${tag.name}  `}</a>)}
                </footer>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TagPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allDatoCmsPost(sort: {fields: meta___publishedAt, order: DESC}){
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
