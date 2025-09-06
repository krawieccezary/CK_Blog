import React from 'react';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var storageKey = 'theme';
              var stored = localStorage.getItem(storageKey);
              var systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              var desired = stored || (systemPrefersDark ? 'dark' : 'light');
              document.documentElement.classList.toggle('theme-dark', desired === 'dark');
            } catch (e) {
              document.documentElement.classList.remove('theme-dark');
            }
          })();
        `,
      }}
    />,
  ]);
};