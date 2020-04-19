import { css } from 'styled-components';

export const media = {
  sm: (...args) => css`
    @media (min-width: 500px) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (min-width: 1100px) {
      ${css(...args)}
    }
  `,
};
