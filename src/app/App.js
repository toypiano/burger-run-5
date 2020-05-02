import React, { useEffect } from 'react';
import LayoutContainer from '../features/layout/LayoutContainer';
import { Switch, Route } from 'react-router-dom';
import BurgerBuilderContainer from '../features/burgerBuilder/BurgerBuilderContainer';
import CheckoutContainer from '../features/checkout/CheckoutContainer';
import OrdersContainer from '../features/orders/OrdersContainer';
import AuthContainer from '../features/auth/AuthContainer';
import SignOutContainer from '../features/auth/SignOutContainer';

function App({ checkAuthStatus }) {
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  return (
    <div className="App">
      <LayoutContainer>
        <Switch>
          <Route path="/" exact component={BurgerBuilderContainer} />
          <Route path="/checkout" component={CheckoutContainer} />
          <Route path="/orders" component={OrdersContainer} />
          <Route path="/auth" component={AuthContainer} />
          <Route path="/signout" component={SignOutContainer} />
        </Switch>
      </LayoutContainer>
    </div>
  );
}

export default App;
