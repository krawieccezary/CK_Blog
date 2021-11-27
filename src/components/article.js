import * as React from "react";
import { Link } from 'gatsby';


const Article = ({ slug, title, introduction, tags, setTag, publishedAt }) => (
  <article
    className="post-list-item"
    itemScope
    itemType="http://schema.org/Article"
  >
    <header>
      <h2>
        <Link to={slug} itemProp="url">
          <span itemProp="headline">{title}</span>
        </Link>
      </h2>
      <small>{publishedAt}</small>
    </header>
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: introduction,
        }}
        itemProp="description"
      />
    </section>
    <footer className="post-list-item__tags-footer"> 
      {tags.map(tag => <button key={tag.name} onClick={() => setTag(tag)}>{`#${tag.name}`}</button>)}
    </footer>
  </article>
) 

export default Article;