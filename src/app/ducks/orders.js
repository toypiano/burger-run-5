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
