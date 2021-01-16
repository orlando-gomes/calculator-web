import React from 'react';
import MJ from 'react-mathjax-ts';

const ascii = 'a^b';
const content = `$$${ascii}$$`;

const Formula: React.FC = ({ children }) => (
  <MJ.Context
    input="tex"
    onLoad={() => console.log('Loaded MathJax script!')}
    onError={(MathJax: any, error: any) => {
      // console.warn(error);
      // console.log('Encountered a MathJax error, re-attempting a typeset!');
    }}
  >
    <MJ.Text text={`$$${children}$$`} />
  </MJ.Context>
);

export default Formula;
