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

- `useImmer`

```ts
import { useState } from 'react';
import produce from 'immer';

export default function useImmer(initialState) {
  const [state, setState] = useState(initialState);
  const updateState = (draftUpdater) => {
    const updatedState = produce(state, draftUpdater);
    setState(updatedState);
  };
  return [state, updateState];
}

...
const isValid = validateInputValue(value, orderForm[inputField].validation);
updateOrderForm((draft) => {
  draft[inputField].value = value;
  draft[inputField].touched = true;
  draft[inputField].valid = isValid;
});
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

## React-Router `history` vs `location`

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

## Caveat: Multiple setStates in a single event handler

```ts
const handleInputChange = (value, inputField) => {
  const isValid = validateInputValue(value, orderForm[inputField].validation);
  updateOrderForm((draft) => {
    draft[inputField].value = value;
    draft[inputField].touched = true;
    draft[inputField].valid = isValid;
  });

  const isFormValid = Object.keys(orderForm).reduce(
    (isValid, field) => isValid && orderForm[field].valid,
    true
  );
  console.log(isFormValid);
  setIsFormValid(isFormValid);
};
```

1. Finished filling in the form with valid input.
2. `isValid` becomes true.
3. State will be updated from `updateOrderForm` **in the next re-render**
4. `isFormValid` is updated to be `false` because orderForm state is not updated yet. React re-renders component from state update, now all fields are valid but `isFormValid` is `false`.
5. User has to change input values to trigger `handleInputChange` again. If the user changes some field but the value is still valid, `isValid` stays as true, but now `isFormValid` is updated to be true. React renders again, now everything looks good.
6. Let's go back and suppose that the user removed the last digit from the zip code, making it invalid.
7. `isValid` is `false` and UI emits invalid reaction.
8. `updateOrderForm` will update the state reflecting this `false` valid state **in the next re-render**.
9. However, `isFormValid` is now `true` because all the input field validated to true in the current render, reflecting the change from the last render.
10. React renders again, now the zip code has the invalid state, but the form is validated to be true.

### The Problem:

- You are updating multiple states that are dependant on one another in one place. It can be hard to synchronize them together because state A gets updated in next render, but B's fate is already sealed with the A's current state.

### Solution

```ts
useEffect(() => {
  const isFormValid = Object.keys(orderForm).reduce(
    (isValid, field) => isValid && orderForm[field].valid,
    true
  );
  console.log(isFormValid);
  setIsFormValid(isFormValid);
}, [orderForm]); // will run whenever orderForm is updated.

const handleInputChange = (value, inputField) => {
  const isValid = validateInputValue(value, orderForm[inputField].validation);
  updateOrderForm((draft) => {
    draft[inputField].value = value;
    draft[inputField].touched = true;
    draft[inputField].valid = isValid;
  });
};
```

useEffect runs after the component "renders(returns React Element)" and DOM has been updated.

1. React runs the component for the first time and "mount" the component (renders to the DOM).
2. Component is automatically rendered once more.
3. When `change` event is fired, the handler from the most recent render runs. Because the handler updates the state, React once again, runs the components to reflect the changes and render them to the DOM.
4. After the render, effect runs but we are still in the current render scope. useEffect has the access to the states that were just rendered to the DOM.
5. Because the effect updates the state, React re-renders the component to reflect the changes in states. useEffect will not run until the specified dependencies are changed (which will happen with another `change` event)

Finally, both the updated state from the event handler and the updated state from the useEffect are synchronized

<img src="./useEffect_eventHandler.png" width="500"/>
