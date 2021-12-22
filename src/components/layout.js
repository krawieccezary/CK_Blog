import React, { useState, useEffect } from "react";

import Logo from '../components/Logo';
import Menu from "../components/Menu";
import MenuBurger from "../components/MenuBurger";

const Layout = ({ location, title, children, handleResetTag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  useEffect(() => {
    setIsMobile(window.innerWidth < 672);
    window.addEventListener('resize', () => setIsMobile(window.innerWidth < 672));

    return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth < 672));
  }, []);

  return (
    <div className="global-wrapper-outer">
    <header className="global-header">
      <div className="global-header-inner">
        <Logo isRootPath={isRootPath} title={title} handleResetTag={handleResetTag} />
        <MenuBurger isMobile={isMobile} setIsOpen={() => setIsOpen(!isOpen)} />
        <Menu 
          isOpen={isOpen} 
          setIsOpen={() => setIsOpen(false)} 
          isMobile={isMobile} 
          isRootPath={isRootPath} 
          title={title} 
        />
      </div>
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
