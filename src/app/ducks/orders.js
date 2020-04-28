import produce from 'immer';
import axios from '../../common/axios-orders';
import Axios from 'axios';

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
    case FETCH_SUCCESS:
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

/* 
response.data = 
{
    "-M5dtbghMiWIj2hKBa5c": { // cspell: disable-line
        "customer": {
            "address": {
                "country": "Canada",
                "street": "Purple creek 777",
                "zipCode": "12345"
            },
            "email": "test@test.com",
            "name": "Elaine"
        },
        "deliveryMethod": "fastest",
        "ingredients": {
            "bacon": 1,
            "beef": 1,
            "cheese": 1,
            "salad": 1
        },
        "price": 4.99
    }
}
*/

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
export const orderBurger = (order, source, token) => async (dispatch) => {
  try {
    const response = await axios.post('/orders.json?auth=' + token, order, {
      cancelToken: source.token,
    });
    dispatch(orderSuccess(response.data.name, order));
  } catch (err) {
    if (Axios.isCancel(err)) {
      console.log('orderBurger canceled by ContactData unmount');
      return err;
    }
    dispatch(orderFail(err, order));
    return err;
  }
};

/**
 *
 * @param {Source} source request source from axios.CancelToken.token()
 */
export const fetchOrders = (source, token) => async (dispatch) => {
  try {
    console.log('Orders enqueue async job - axios.get');
    const response = await axios.get('/orders.json?auth=' + token, {
      cancelToken: source.token,
    });
    console.log('Promise resolved');
    dispatch(fetchSuccess(response.data));
  } catch (err) {
    console.log('Orders Promise rejected');
    if (Axios.isCancel(err)) {
      console.log('fetchOrders canceled by effect cleanup in Orders');
      return err;
    } else {
      // console.error(err);
      dispatch(fetchFail(err));
    }
  }
};
