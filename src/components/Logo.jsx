import React from 'react';
import { Link } from 'gatsby';


const Logo = ({ isRootPath, title, second, className, handleClick }) => (
  <>
    {isRootPath && !second ? (
      <h1 className="main-heading" >
        <Link to="/">
          {title}
        </Link>
      </h1>
    ) : (
      <Link className={`main-heading ${className}`} to="/" onClick={handleClick}>
        {title}
      </Link>
    )}
  </>
)

export default Logo;