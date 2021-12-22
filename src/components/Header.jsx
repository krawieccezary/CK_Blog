import React, { useState, useEffect } from 'react';



const Header = ({ children }) => {
  const [isScroll, setIsScroll] = useState(false);

  const handleWindowScroll = () => {
    if(window.pageYOffset) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  useEffect(() => {
    if(window.pageYOffset) setIsScroll(true);
    window.addEventListener('scroll', handleWindowScroll);

    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <header className={isScroll ? 'global-header isScroll' : 'global-header'}>
      <div className="global-header-inner">
        { children }
      </div>
    </header>
  )
}

export default Header;