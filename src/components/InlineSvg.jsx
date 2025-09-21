import React, { useEffect, useState } from "react";

const InlineSvg = ({ url, alt }) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(text => setSvgContent(text))
  }, [url])

  return (
    <div 
      className="inline-svg"
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

export default InlineSvg;