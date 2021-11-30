import React, { useEffect, useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Layout = ({ location, title, children, handleResetTag }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let logo 

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    return window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, [windowWidth]);


  if(isRootPath) {
    logo = (
      <h1 className="main-heading">
        <Link to="/" onClick={() => handleResetTag()}>
          {title}
        </Link>
      </h1>)
  } else {
    logo = (
      <Link className="main-heading" to="/">
        {title}
      </Link>
    )
  }

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
      {logo}
      <nav>
        <Link className="nav-link" activeClassName="active" to="/about-me">About me</Link>
        <Link className="nav-link" activeClassName="active" to="/contact">Contact</Link>
        <a className="nav-link nav-link--icon" href={`https://github.com/${social.github}`} rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a className="nav-link nav-link--icon" href={`https://www.linkedin.com/in/${social.linkedin}`} rel="noreferrer" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </nav>
      {windowWidth < 672 && <button>X</button>}
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
