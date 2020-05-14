import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};

    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  a {
      color: ${({ theme }) => theme.text};
  }
  a:hover {
      color: ${({ theme }) => theme.texthover};
      text-decoration: none;
  }
  nav {
    background: ${({ theme}) => theme.navcolor};
  }
  .nav-link {
    color: ${({ theme }) => theme.texthover};
  }
  .icon_link {
    fill: ${({ theme }) => theme.iconfill} !important;
  }
  svg {
    fill: ${({ theme }) => theme.iconfill} !important;
  }`