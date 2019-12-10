import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset-advanced';

export default createGlobalStyle`
  ${reset};

  body {
    font-family: futura-pt, sans-serif;
    font-style: normal;
    font-weight: 300;
  }
`;
