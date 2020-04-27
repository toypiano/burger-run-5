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

## ES6 exporting/importing in index file

[stack overflow](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file)

- Export reducers (default export) from sibling files.

```js
// ducks/index.js
// exported with names
export { default as burgerBuilder } from './burgerBuilder';
export { default as orders } from './orders';
.
.
.

// rootReducer.js
// imported with names
import * as reducers from './ducks/index';
// reducers = { burgerBuilder, orders,...}
```

- Import action creators ( + exported actionTypes) from ducks file.

```js
import * as burgerBuilderActions from './ducks/burgerBuilder';
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

- [React: "mount" vs "render" ?](https://reacttraining.com/blog/mount-vs-render/)

## You don't need all actionTypes in the reducer

You need to include an actionType in the reducer **only if that action produces new state**.
You can define actions which don't get used in your reducer.  
We can dispatch those actions to log certain events that happened in our application to the Redux DevTool. This is very handy when developing & debugging your app.

`/src/app/ducks/orders.js`

```js
import produce from 'immer';
import axios from '../../common/axios-orders';

// Actions
const ORDER_SUCCESS = 'checkout/contactData/orderSuccess';
const ORDER_FAIL = 'checkout/contactData/orderFail';
const FETCH_SUCCESS = 'orders/fetchSuccess';
const FETCH_FAIL = 'orders/fetchFail';

// Reducer
const initialState = {
  orders: [],
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS: // only this action updates the state
      return produce(state, (draft) => {
        const ordersArray = Object.entries(
          action.orders
        ).map(([id, order]) => ({ id, ...order }));
        draft.orders = ordersArray;
      });
    default:
      return state;
  }
}

// Action Creators
export const orderSuccess = (id, order) => ({
  type: ORDER_SUCCESS,
  id,
  order,
});

export const orderFail = (error, failedOrder) => ({
  type: ORDER_FAIL,
  error,
  failedOrder,
});

export const fetchSuccess = (orders) => ({
  type: FETCH_SUCCESS,
  orders,
});

export const fetchFail = (error) => ({
  type: FETCH_FAIL,
  error,
});

// Thunks
export const orderBurger = (order) => async (dispatch) => {
  try {
    const response = await axios.post('/orders.json', order);
    dispatch(orderSuccess(response.data.name, order));
  } catch (err) {
    dispatch(orderFail(err, order));
  }
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await axios.get('/orders.json');
    dispatch(fetchSuccess(response.data));
  } catch (err) {
    dispatch(fetchFail(err));
  }
};
```

## Cleaning Up async requests in useEffect

When you try to update a state from an unmounted component, React will throw this error:

<img src="./cleanUp.png" width="350">

You can cancel pending axios request from unmounted component by using the axios _cancel token_ API.

```js
import Axios from 'axios'; // import axios constructor
import axios from '../../common/axios-orders'; // import axios instance
.
.
.
useEffect(() => {
    // CancelToken is the static method!
    const source = Axios.CancelToken.source();
    axios // pass an option as 2nd arg
      .get('/orders.json', { cancelToken: source.token })
      // this will run even if request is canceled!!!
      .then((res) => {
        if (res.data) {
          const orders = Object.entries(res.data).map(([id, order]) => ({
            id,
            ...order,
          }));
          setOrders(orders);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (Axios.isCancel(err)) {
          console.log('fetchOrders canceled');
        } else {
          setIsLoading(false);
          console.error(err);
        }
      });
    return () => {
      // cancel request that has the source.token
      source.cancel();
    };
  }, []);
```

With redux thunk action dispatcher + async await
`features/orders/Orders`

```js
useEffect(() => {
  const source = Axios.CancelToken.source(); // get req source
  (async () => {
    const thrown = await fetchOrders(source); // call thunked dispatcher with source
    // stop if request canceled
    if (!Axios.isCancel(thrown)) {
      setIsLoading(false); // spinner off when done
    }
  })();

  return () => {
    source.cancel(); // cleanup: cancel req with specified token on unmount
  };
}, [fetchOrders]);
```

`store/ducks/orders`

```js
/**
 *
 * @param {Source} source request source from axios.CancelToken.token()
 */
export const fetchOrders = (source) => async (dispatch) => {
  try {
    const response = await axios.get('/orders.json', {
      cancelToken: source.token,
    });
    dispatch(fetchSuccess(response.data));
  } catch (err) {
    if (Axios.isCancel(err)) {
      console.log('fetchOrders canceled by effect cleanup in Orders');
      return err;
    } else {
      console.error(err);
      dispatch(fetchFail(err));
    }
  }
};
```

Readings:

- [Read Hook - Clean Up useEffect](https://dev.to/iquirino/react-hook-clean-up-useeffect-24e7)

- [Clean up async requests in useEffect hooks](https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h)

## Noise in the database documents can break your app!

Does your app breaks throwing a typeError and the error originates from the place where you **did implemented a type-guard** like this?

```jsx
<div className={className}>
  {isLoading && <Spinner show={isLoading} />}
  {orders && // if orders is falsy, drop it!
    orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients} // ingredients gets 'null' in Order
        price={order.price}
      />
    ))}
</div>
```

- It means that the `orders` array is defined and you pass the type-guard into mapping through the `orders` array where you pass `Order` component the props it needs from the member of the `orders` array.
- However, if one of the order from your database doesn't contain `ingredients` field, `orders` will still pass the type-guard, and `order.ingredients` will evaluates to `undefined`.
- In the real app, you need to implement type-checking on the data you fetch from the database.
  - Use typescript or graphQL

## Catch validation errors from the server with Axios:

- [axios - handling errors](https://github.com/axios/axios#handling-errors)
- [github issue](https://github.com/axios/axios/issues/960)

Axios will by default, wrap the error response in its own error object and pass to the catch block.

```js
try {
  const response = await axios.post(uri, payload);
  console.log(response);
  dispatch(authSuccess(response.data));
} catch (err) {
  // use err if no response (server error)
  const error = err.response ? err.response.data.error : err;
  console.error(error);
  dispatch(authFail(error));
}
```

## Firebase REST authentication

- [Sign up with email / password](https://firebase.google.com/docs/reference/rest/auth#section-create-email-password)
- [Sign in with email / password](https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password)
