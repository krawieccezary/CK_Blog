import * as React from "react";
import { Link } from 'gatsby';


const Article = ({ slug, title, meta, introduction, tags }) => (
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
      <small>{meta.publishedAt}</small>
    </header>
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: introduction,
        }}
        itemProp="description"
      />
    </section>
    <footer> 
      {tags.map(tag => <a key={tag.name} href={`${__PATH_PREFIX__}/tag?${tag.slug}`}>{`#${tag.name}  `}</a>)}
    </footer>
  </article>
) 

export default Article;