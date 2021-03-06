import React from 'react';
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import Logo from '../components/Logo';

const StyledLogo = styled(Logo)`
  margin-bottom: 2rem !important;
`;

const Menu = ({ isOpen, isMobile, isRootPath, title, setIsOpen }) => {
  const { site: { siteMetadata: {social }}} = useStaticQuery(graphql`
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

  return (
    <nav className={isOpen ? 'active' : null}>
      { isMobile && 
        <StyledLogo 
          second 
          isRootPath={isRootPath} 
          title={title} 
          handleClick={setIsOpen}
        />
      }
      <Link 
        className="nav-link" 
        activeClassName="active" 
        to="/about-me">About me</Link>
      <Link 
        className="nav-link" 
        activeClassName="active" 
        to="/contact">Contact</Link>
      <a className="nav-link nav-link--icon" href={`https://github.com/${social.github}`} rel="noreferrer" target="_blank">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a className="nav-link nav-link--icon" href={`https://www.linkedin.com/in/${social.linkedin}`} rel="noreferrer" target="_blank">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
    </nav>
  )
}


export default Menu;