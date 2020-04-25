# Burger Builder - Run 5

# What's New

- Functional components only
- VSCode snippet for styled-components + react
  - [gist](https://gist.github.com/toypiano/6ac3f3f230cf0a87e179401652d578e1)
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

- Ducks: Redux Reducer Bundles
  - [github](https://github.com/erikras/ducks-modular-redux)

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
  // get state and run through a function
  const isValid = validateInputValue(value, orderForm[inputField].validation);
  // set state with return value
  updateOrderForm((draft) => {
    draft[inputField].value = value;
    draft[inputField].touched = true;
    draft[inputField].valid = isValid;
  });
  // get state and process
  const isFormValid = Object.keys(orderForm).reduce(
    (isValid, field) => isValid && orderForm[field].valid,
    true
  );
  // set state with the result
  setIsFormValid(isFormValid);
};
```

1. The User just finished filling in the form with valid input.
2. `isValid` evaluates to true.
3. State will be updated from `updateOrderForm` **in the next re-render**
4. `isFormValid` evaluates to`false` because orderForm state is not updated yet. React re-renders component ,triggered by state update. Now all input fields are valid but `isFormValid` is `false`.
5. User changes one of the input values to trigger `handleInputChange` again. If the user changes some field but the value is still valid, `isValid` stays as true, but now `isFormValid` is updated to be true. React renders again, now everything looks good.
6. Let's go back and suppose that the user removed the last digit from the zip code. changeHandler sets `isValid` to false, triggering re-render.
7. In the new render, `isValid` is `false` and UI emits invalid reaction.
8. `updateOrderForm` will update the state reflecting this `false` valid state **when changeHandler is called**.
9. However, `isFormValid` is now `true` because all the input field has the state of true in the current render, reflecting the change from the last render.
10. Now one of the input field has the invalid state, but the form is validated to be true. 🤷🏻‍♂️🤷🏻‍♀️🐕💩

### The Problem:

- You are updating multiple states that are dependant on one another in one place. It is difficult to synchronize them together because state A gets updated in next render, but B's fate is already sealed with the A's current state.
- The real problem is that A's state is "planned" to change based on the new `change` event but B's state is planned to change based on current A
- What you want is to change the state of A and then change the state of B based on A's updated state.
- It might have been easier to spot the error if you get pieces of state and process them in one place and set all the state with the results in the other place.

```ts
const handleInputChange = (value, inputField) => {
  // get state & process
  const isValid = validateInputValue(value, orderForm[inputField].validation);
  const isFormValid = Object.keys(orderForm).reduce(
    (isValid, field) => isValid && orderForm[field].valid,
    true // this depends on the updated isValid, therefore should be done in next render.
  );
  // set state
  updateOrderForm((draft) => {
    draft[inputField].value = value;
    draft[inputField].touched = true;
    draft[inputField].valid = isValid;
  });
  setIsFormValid(isFormValid);
};
```

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

## Use `useEffect` for updating related states in one transaction

useEffect runs after the component "renders(returns React Element)" and DOM has been updated.

### Render 1

- React runs the component for the first time and "mount" the component (renders to the DOM).
- Effect will run after the mount.
  - sets `isValid` state based on other states from render 1.
  - setting new state triggers next render(Render 2).

### Render 2

- State change from Render1 is painted to the DOM.
  - meaning that the component returns the markup with the new state, and React takes that markup and do its own thing and eventually renders it to the DOM.
- Now nothing happens until "something" happens.
  - That something can be user-driven event or async action

### Change event fired

- When `change` event is fired, the handler from the most recent render runs (Render 2).
  - Now the changeHandler function has access to the state & props from Render 2.
  - So it updates some state based on other state from Render 2.
- Because the handler updates the state, React once again, runs the components to reflect the changes and render them to the DOM.

### Render 3

- Component runs and flushes out the markup with new state, out to the DOM
- Now the effect runs. `useEffect` has the access to the states that were just rendered to the DOM.
- The effect updates the state, triggers Render 4.

### Render 4

- React re-renders the component to reflect the changes in states.
- useEffect will not run until the specified dependencies - `orderForm` state - are changed (which will happen with another `change` event)
- Finally, both the updated state from the event handler and the updated state from the useEffect are synchronized

<img src="./useEffect_eventHandler.png" width="350"/>

## Summary

`setStateA` inside eventHandlers and `setStateB` inside useEffect work as one transaction, resulting in 2 new renders.

- Event -> `setStateA`(eventHandler) -> "render" -> `setStateB`(effect) based on A -> "render"

## Render, Mount & Update

`Render` is the **process** from the beginning of the function block to the function return (inclusive).

`Mounting` & `updating` are the **point in time** when React takes the return from render and put it in the DOM.

```jsx
function Clock(props) {
  // do some things...
  // (like useState & define handlers...)
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

// converted to class

class Clock extends React.Component {
  // setting state in constructor and...
  // define some component (class) methods (usually handler functions)
  render() {
    // do some things...
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
