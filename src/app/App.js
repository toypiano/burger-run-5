import React, { useEffect } from 'react';
import LayoutContainer from '../features/layout/LayoutContainer';
import { Switch, Route, Redirect } from 'react-router-dom';
import BurgerBuilderContainer from '../features/burgerBuilder/BurgerBuilderContainer';
import SignOutContainer from '../features/auth/SignOutContainer';
import withLazy from '../common/hoc/withLazy';

const asyncCheckout = withLazy(() =>
  import('../features/checkout/CheckoutContainer')
);

const asyncOrders = withLazy(() =>
  import('../features/orders/OrdersContainer')
);

const asyncAuth = withLazy(() => import('../features/auth/AuthContainer'));

function App({ checkAuthStatus, isAuthenticated }) {
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const routes = isAuthenticated ? (
    <Switch>
      <Route path="/" exact component={BurgerBuilderContainer} />
      <Route path="/checkout" component={asyncCheckout} />
      <Route path="/orders" component={asyncOrders} />
      <Route path="/signout" component={SignOutContainer} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact component={BurgerBuilderContainer} />
      <Route path="/auth" component={asyncAuth} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <LayoutContainer>{routes}</LayoutContainer>
    </div>
  );
}

export default App;
