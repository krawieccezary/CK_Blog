import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { formatDate } from "../utils/utils";

import Layout from "../components/layout"
import Seo from "../components/seo"
import Article from "../components/article";
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

function getTagQuery(tagID){
  return `
  {
    allPosts(
      orderBy: _publishedAt_DESC,
      filter: {_status: {eq: published}, tags: {anyIn: "${tagID}"}}
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
        .then(result => {
          setIsLoading(false);
          setState({
            posts: result.data.allPosts,
            tag: tag
          });
        }).catch(() => {
          setFetchError(true);
        })
    }
  }

  if(error) {
    return (
      <Layout location={location} title={siteTitle} handleResetTag={handleResetTagClick}>
        <Seo title="Home" />
        <Message content='Uups! Mamy problem! Wróć później.' >
          <StaticImage src='../assets/images/internal-error.svg' width={500} alt="Error"/>
        </Message>
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
        <Message content='Brak wpisów na blogu. Wkrótce coś się pojawi – bądź na bieżąco!' >
          <StaticImage src='../assets/images/empty-blog.svg' width={500} alt="Error"/>
        </Message>
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
        <div className="post-list">
          {posts.map(post => {
            const publishedAt = post.meta ? post.meta.publishedAt : formatDate(post._publishedAt);
            return <Article key={post.id} publishedAt={publishedAt} {...post} setTag={handleTagClick} />
          })}
        </div>
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
          publishedAt(formatString: "DD-MM-YYYY")
        }
      }
    }
  }
`
