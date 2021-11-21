import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
          siteMetadata {
            social {
              linkedin,
              github,
            }
          }
        }
      }
  `);

  const social = data.site.siteMetadata.social;

  return (
    <div className="global-wrapper-outer">
    <header className="global-header">
      <h1 className="main-heading">
        <Link to="/">
          {title}
        </Link>
      </h1>
      <nav>
        <Link className="nav-link" to="/about-me">About me</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <a className="nav-link" href={`https://github.com/${social.github}`} rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a className="nav-link" href={`https://www.linkedin.com/in/${social.linkedin}`} rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </nav>
    </header>
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <main>{children}</main>
      <footer>
        Copyright © {new Date().getFullYear()}
      </footer>
    </div>
    </div>
  )
}

export default Layout
