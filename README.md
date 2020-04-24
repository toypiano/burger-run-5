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

- `use-immer`

```ts
import React from 'react';
import { useImmer } from 'use-immer';

function App() {
  const [person, updatePerson] = useImmer({
    name: 'Michel',
    age: 33,
  });

  function updateName(name) {
    updatePerson((draft) => {
      draft.name = name;
    });
  }

  function becomeOlder() {
    updatePerson((draft) => {
      draft.age++;
    });
  }

  return (
    <div className="App">
      <h1>
        Hello {person.name} ({person.age})
      </h1>
      <input
        onChange={(e) => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
    </div>
  );
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

## React-Router `history` vs `location

### history

- Mutable.
- Used to navigate back and forth in the history stack.
- history.push(path, [state]) - pushes new path into history stack
- history.replace(path, [state]) - replaces the current entry in history stack
- history.goBack()
- history.goForward()

### location

- Represents the current location
- Always new (immutable)
- Used to retrieve pathname, search param, or hash value.
- ```js
  {
    key: 'ac3df4',
    pathname: '/home',
    search: '?apple=2&tomato=99',
    hash: '#today',
    state: {
      [userDefined]: true
    }
  }
  ```
- use `URLSearchParams(location.search)` to parse the search param.
  - parsed values are always string! (cheese=4 is "cheese" and "4")
