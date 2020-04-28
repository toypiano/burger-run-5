import produce from 'immer';
import axios from '../../common/axios-orders';

// Actions
const ADD_INGREDIENT = 'burgerBuilder/addIngredient';
const REMOVE_INGREDIENT = 'burgerBuilder/removeIngredient';
const FETCH_INGREDIENTS_SUCCESS = 'burgerBuilder/fetchIngredientsSuccess';
const FETCH_INGREDIENTS_FAIL = 'burgerBuilder/fetchIngredientsFail';

// Reducer
const BASE_PRICE = 4.99;
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  beef: 1.3,
};
const initialState = {
  ingredients: {
    salad: 1,
    bacon: 1,
    cheese: 1,
    beef: 1,
  },
  price: BASE_PRICE,
  fetchError: false,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return produce(state, (d) => {
        d.ingredients[action.id]++;
        d.price += INGREDIENT_PRICE[action.id];
      });
    case REMOVE_INGREDIENT:
      return produce(state, (d) => {
        d.ingredients[action.id]--;
        d.price -= INGREDIENT_PRICE[action.id];
      });
    case FETCH_INGREDIENTS_SUCCESS:
      return produce(state, (d) => {
        d.ingredients.salad = action.ingredients.salad;
        d.ingredients.bacon = action.ingredients.bacon;
        d.ingredients.cheese = action.ingredients.cheese;
        d.ingredients.beef = action.ingredients.beef;
        d.fetchError = false;
      });
    case FETCH_INGREDIENTS_FAIL:
      return produce(state, (d) => {
        d.fetchError = true;
      });
    default:
      return state;
  }
}

// Action Creators
export const addIngredient = (id) => ({
  type: ADD_INGREDIENT,
  id,
});
export const removeIngredient = (id) => ({
  type: REMOVE_INGREDIENT,
  id,
});

// Thunks

export const initIngredients = () => async (dispatch) => {
  try {
    console.log('enqueue async task - axios.get');
    const response = await axios.get('/ingredients.json');
    console.log('fetch success');
    dispatch({ type: FETCH_INGREDIENTS_SUCCESS, ingredients: response.data });
  } catch (err) {
    dispatch({ type: FETCH_INGREDIENTS_FAIL });
    console.log(err);
  }
};
