import React from 'react';
import Layout from '../features/layout/Layout';
import { Switch, Route } from 'react-router-dom';
import BurgerBuilder from '../features/burgerBuilder/BurgerBuilder';
import Checkout from '../features/checkout/Checkout';
import Orders from '../features/orders/Orders';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
