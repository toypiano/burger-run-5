import React, { useEffect } from 'react';
import LayoutContainer from '../features/layout/LayoutContainer';
import { Switch, Route, Redirect } from 'react-router-dom';
import BurgerBuilderContainer from '../features/burgerBuilder/BurgerBuilderContainer';
import CheckoutContainer from '../features/checkout/CheckoutContainer';
import OrdersContainer from '../features/orders/OrdersContainer';
import AuthContainer from '../features/auth/AuthContainer';
import SignOutContainer from '../features/auth/SignOutContainer';

function App({ checkAuthStatus, isAuthenticated }) {
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const routes = isAuthenticated ? (
    <Switch>
      <Route path="/" exact component={BurgerBuilderContainer} />
      <Route path="/checkout" component={CheckoutContainer} />
      <Route path="/orders" component={OrdersContainer} />
      <Route path="/signout" component={SignOutContainer} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact component={BurgerBuilderContainer} />
      <Route path="/auth" component={AuthContainer} />
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
