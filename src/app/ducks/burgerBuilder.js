import produce from 'immer';

// Actions
const ADD_INGREDIENT = 'burgerBuilder/addIngredient';
const REMOVE_INGREDIENT = 'burgerBuilder/removeIngredient';

// Reducer
const BASE_PRICE = 4.99;
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  beef: 1.3,
};
const initialState = {
  ingredients: { salad: 1, bacon: 1, cheese: 1, beef: 1 },
  price: BASE_PRICE,
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
