import React from 'react';
import { Link } from 'gatsby';


const Logo = ({ isRootPath, title, handleResetTag, second, className, handleClick }) => (
  <>
    {isRootPath && !second ? (
      <h1 className="main-heading" >
        <Link to="/" onClick={() => handleResetTag()}>
          {title}
        </Link>
      </h1>
    ) : (
      <Link className={`main-heading ${className ? className : ''}`} to="/" onClick={handleClick}>
        {title}
      </Link>
    )}
  </>
)

export default Logo;