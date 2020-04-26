import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      tracklimit: 25, // cspell: disable-line
    })
  : compose; // if compose is not there, returns null

const middlewares = [thunk];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default createStore(rootReducer, enhancer);
