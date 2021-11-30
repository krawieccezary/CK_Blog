import React from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/shadesOfPurple";


const Pre = styled.pre`
  text-align: left;
  margin: 1em -8rem;
  padding: 1.5em;
  border-radius: 5px;
  width: var(--maxWidth-header);

  @media (max-width: 58rem) {
    width: calc(100vw - 2rem);
    margin: 1em calc(-1 * ((100vw + .5rem - var(--maxWidth-wrapper)) / 2));
  }
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const WithLineNumbers = ({ code, language }) => (
  <Highlight {...defaultProps} theme={theme} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <Line key={i} {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            <LineContent>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </LineContent>
          </Line>
        ))}
      </Pre>
    )}
  </Highlight>
);

export default WithLineNumbers;
