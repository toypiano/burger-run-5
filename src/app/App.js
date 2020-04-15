import React from 'react';
import Layout from '../common/hoc/Layout';
import BurgerBuilder from '../features/burgerBuilder/BurgerBuilder';

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
