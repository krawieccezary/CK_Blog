import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { formatDate } from "../utils/utils";

import Layout from "../components/layout"
import Seo from "../components/seo"
import Article from "../components/article";
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

function getTagQuery(tagID){
  return `
  {
    allPosts(
      orderBy: _publishedAt_DESC,
      filter: {_status: {eq: published}, tags: {anyIn: ${tagID}}}
    ) {
      id
      title
      introduction
      slug
      _publishedAt
      tags {
        id
        name
      }
    }
  }
  `
}

function fetchData(tagID) {
  return fetch(
    process.env.GATSBY_API_URL, 
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.GATSBY_API_KEY}`
      },
      body: JSON.stringify({
        query: getTagQuery(tagID)
      })
    }
  )
}


const BlogIndex = ({ data, location }) => {
  const initialTag = location.state?.tag ? location.state.tag : null;
  const initialPosts = initialTag ? [] : data.allDatoCmsPost.nodes;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const [{posts, tag}, setState] = useState({posts: initialPosts, tag: initialTag});
  const [error, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if(location.state?.tag) fetchPostsByTag(tag);
  }, []);

  function handleResetTagClick(){
    setState({
      posts: data.allDatoCmsPost.nodes,
      tag: null
    });
  }

  const handleTagClick = tag => fetchPostsByTag(tag);
  

  function fetchPostsByTag(tag){
    if(tag){
      setIsLoading(true);
      const tagID = tag.originalId ? tag.originalId : tag.id;
      fetchData(tagID)
        .then(res => res.json())
        .then(
          result => {
            setIsLoading(false);
            setState({
              posts: result.data.allPosts,
              tag: tag
            });
        }).catch(err => {
          setFetchError(true);
        })
    }
  }

  if(error) {
    return (
      <Layout location={location} title={siteTitle} handleResetTag={handleResetTagClick}>
        <Seo title="Home" />
        <ErrorMessage errorMessage='Houston, we have a problem! Come back later.' >
          <StaticImage src='../images/fetch-error.png' width={500} alt="Error"/>
        </ErrorMessage>
      </Layout>
    ) 
  } else if(isLoading) {  
      return (
      <Layout location={location} title={siteTitle} handleResetTag={handleResetTagClick}>
        <Seo title="Home" />
        <LoadingSpinner />
      </Layout>
      )
  };

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} handleResetTag={handleResetTagClick}>
        <Seo title="Home" />
        <ErrorMessage errorMessage='No blog posts found. Coming soon, stay tuned!' >
          <StaticImage src='../images/empty-blog.png' width={500} alt="Error"/>
        </ErrorMessage>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} handleResetTag={handleResetTagClick}>
      <Seo title="Home" />
        {tag && 
          <div className="tag-heading-wrapper">
            <h2 className="tag-heading">{`#${tag.name}`}</h2>
            <button onClick={() => handleResetTagClick()} className="tag-heading-wrapper__button"></button>
          </div>
        }
        {posts.map(post => {
          const publishedAt = post.meta ? post.meta.publishedAt : formatDate(post._publishedAt);
          return <Article key={post.id} publishedAt={publishedAt} {...post} setTag={handleTagClick} />
        })}
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
          originalId
          name
        }
        meta {
          publishedAt(formatString: "D-M-Y")
        }
      }
    }
  }
`
