import React from 'react';
import Layout from '../features/layout/Layout';
import { Route } from 'react-router-dom';
import BurgerBuilder from '../features/burgerBuilder/BurgerBuilder';
import Checkout from '../features/checkout/Checkout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
      </Layout>
    </div>
  );
}

export default App;
