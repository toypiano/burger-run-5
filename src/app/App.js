import React from 'react';
import Layout from '../features/layout/Layout';
import { Switch, Route } from 'react-router-dom';
import BurgerBuilderContainer from '../features/burgerBuilder/BurgerBuilderContainer';
import CheckoutContainer from '../features/checkout/CheckoutContainer';
import OrdersContainer from '../features/orders/OrdersContainer';
import Auth from '../features/auth/Auth';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilderContainer} />
          <Route path="/checkout" component={CheckoutContainer} />
          <Route path="/orders" component={OrdersContainer} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
