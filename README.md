# Burger Builder - Run 5

# What's New

- Functional components only
- VSCode snippet for styled-components + react

```json
"Styled Component": {
        "prefix": [
            "styled",
            "styled-component"
        ],
        "body": [
            "import React from \"react\"",
            "import PropTypes from \"prop-types\"",
            "import styled, { css } from \"styled-components\"",
            "",
            "${1:${TM_FILENAME_BASE}}.propTypes = {",
            "\tclassName: PropTypes.string.isRequired,",
            "}",
            "",
            "function ${1:${TM_FILENAME_BASE}}({ className$2 }) {",
            "\treturn (",
            "\t\t<div className={className}>",
            "\t\t\t$0",
            "\t\t</div>",
            "\t)",
            "}",
            "",
            "export default styled(${1:${TM_FILENAME_BASE}})`",
            "\t${props => css``}",
            "`"
        ],
        "description": "Creates a quick styled component"
    }
```

## Mixin with `styled-components/css`

```js
import { css } from 'styled-components';

export const media = {
  sm: (...args) => css`
    @media (min-width: 500px) {
      ${css(...args)}
    }
  `,
};

const Card = styled.div`
  ${media.sm`
    /* media query rules... */
    `}
`;
```

## React-Router: `<Route>`

- `Route` can only pass route props (match, location, history) to functions.
  Route uses `React.createElement` to create a new react element from the given component (which is a function returning a JSX Element (object))
  This means:
  ```jsx
  <Route path="/" exact component={BurgerBuilder}>
  ```
  instead of:
  ```jsx
  <Route path="/" exact component={<BurgerBuilder/>}>
  ```
  because
  ```jsx
  <Component>
  // is the same as:
  React.createElement(Component, null)
  ```
  If you do:
  ```jsx
  <Route path="/" exact component={() => <BurgerBuilder />} />
  ```
  This will create new instance of BurgerBuilder component resulting in un-mounting and re-mounting every time you're routed to that "page".
