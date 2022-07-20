import { Global, css } from '@emotion/react';

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html,
        body,
        ul {
          margin: 0;
          padding: 0;
        }
        body {
          min-height: 100vh;
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: black;
        }
      `}
    />
  );
};

export default GlobalStyles;
