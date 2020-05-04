# Burger Builder - Run 5

# What's New

- Functional components only
- VSCode snippet for styled-components + react
  - [gist](https://gist.github.com/toypiano/6ac3f3f230cf0a87e179401652d578e1)
- `useImmer`
- auto-focus the first input control on page load with `autoFocus` prop
- In ContactData, get email value from auth data.
  - Store res.data.email into auth state
  - mapState email from CheckoutContainer
  - Pass email from Checkout -> ContactData
  - In ContactData useEffect, update orderForm's email state (value, touched, valid). If you update only value, form will not validate after filling out all the other inputs.
  - Pass value all the way down to the native input element.

```jsx
const inputControls = Object.entries(controls).map(([k, v], i) => (
  <InputGroup
    key={k}
    inputType={v.inputType}
    config={v.config}
    valid={v.valid}
    onChange={(e) => handleInputChange(e, k)}
    touched={v.touched}
    value={v.value}
    autoFocus={i === 0}
  />
));
// Check InputGroup component for more detail
```

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

## React-Router

### `<Route>`

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

### `history` vs `location`

#### history

- Mutable.
- Used to navigate back and forth in the history stack.
- history.push(path, [state]) - pushes new path into history stack
- history.replace(path, [state]) - replaces the current entry in history stack
- history.goBack()
- history.goForward()

#### location

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

### Guarding Routes

You can guard unauthorized routes by rendering set of routes inside `<Switch>` based on auth state. Set default route with `<Redirect to="/" >` at the end of the list.

```jsx
const routes = isAuthenticated ? (
  <Switch>
    <Route path="/" exact component={BurgerBuilderContainer} />
    <Route path="/checkout" component={CheckoutContainer} />
    <Route path="/orders" component={OrdersContainer} />
    <Route path="/signout" component={SignOutContainer} />
    {/* catches all other path */}
    <Redirect to="/" />
  </Switch>
) : (
  <Switch>
    <Route path="/" exact component={BurgerBuilderContainer} />
    <Route path="/auth" component={AuthContainer} />
    {/* same here */}
    <Redirect to="/" />
  </Switch>
);
```

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

## Firebase

### REST authentication

- [Sign up with email / password](https://firebase.google.com/docs/reference/rest/auth#section-create-email-password)
- [Sign in with email / password](https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password)

### Separate rules per field

`Develop > Database > Rules`

```json
{
  "rules": {
    "ingredients": {
      ".read": true,
      ".write": true
    },
    "orders": {
      // allow only authenticated request to read & write
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### REST API

> **Add Indexing to your Firebase Realtime Database Rules**: If you're using `orderBy` in your app, you need to define the keys you will be indexing on via the `.indexOn` rule in your Firebase Realtime Database Rules. Read the [documentation](https://firebase.google.com/docs/database/security/indexing-data) on the `.indexOn` rule for more information.

```json
{
  "rules": {
    "ingredients": {
      ".read": true,
      ".write": true
    },
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": "localId"
    }
  }
}
```

```js
// order by local id and filter orders where localId is equal to specified localId
const queryParams = `?auth=${token}&orderBy="localId"&equalTo="${localId}"`;
const response = await axios.get('/orders.json' + queryParams, {
  /* axios options */
});
```

- [Query Parameters](https://firebase.google.com/docs/reference/rest/database#section-query-parameters)
- [Filtering Data](https://firebase.google.com/docs/database/rest/retrieve-data#section-rest-filtering)
- Ordering before filtering: [orderBy](https://firebase.google.com/docs/database/rest/retrieve-data#orderby)

## Auto-focusing `<NavLink>` after `<Redirect>`

### When

After signing out, SignOut component returns `<Redirect to="/" />` and NavLink to sign-out is replaced with NavLink to "auth" page.

### Problem

After redirect, NavLink to "BurgerBuilder" has ".active" class but "Sign In" link is focused, which wasn't even previously rendered.

### Solution

Pass ref to the parent "li" element and check the child NavLink's .active class in `useEffect`. If it's active, manually focus it.  
Seems to work, but not sure if it's correct way to do it.

```jsx
function NavItem({ className, linkTo, exact, children }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current.children[0].classList.contains('active')) {
      ref.current.children[0].focus();
    }
  });
  return (
    <li className={className} ref={ref}>
      <NavLink className="navLink" to={linkTo} exact={exact}>
        {children}
      </NavLink>
    </li>
  );
}
```

### Further Readings:

- [What we learned from user testing of accessible client-side routing techniques with Fable Tech Labs](https://www.gatsbyjs.org/blog/2019-07-11-user-testing-accessible-client-routing/)
- [react-router/issues](https://github.com/ReactTraining/react-router/issues/5210#issuecomment-582053359)

### Look into:

- [Reach Router](https://reach.tech/router)

## Dynamic import HOC & displayName

[Convention: Wrap the Display Name for Easy Debugging](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)

The container components created by HOCs show up in the React devtools like any other component. To ease debugging, choose a display name that shows it's HOC.

The most common technique is to **wrap the display name of the wrapped component.** So if your higher-order component is named `withSubscription`, and the wrapped component’s display name is `CommentList`, use the display name `WithSubscription(CommentList)`:

```jsx
import React, { useState, useEffect } from 'react';

const withLazy = (importComponent) =>
  function WithLazy(props) {
    WithLazy.displayName = `WithLazy(${getDisplayName(importComponent)})`;
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      (async () => {
        try {
          const cmp = await importComponent();
          console.log(cmp);
          setComponent(cmp.default);
        } catch (err) {
          console.log(err);
        }
      })();
    }, []);

    return Component ? <Component {...props} /> : null;
  };

export default withLazy;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

### Usage

```jsx
const asyncOrders = withLazy(() =>
  import('../features/orders/OrdersContainer')
);
// ...
<Route path="/orders" component={asyncOrders} />;
```
