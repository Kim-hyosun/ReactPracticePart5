import { createSlice } from '@reduxjs/toolkit';

let cartItem = createSlice({
  name: 'cartItem',
  initialState: {
    cart0: { id: 'cart0', name: '부채', count: 2 },
    cart1: { id: 'cart1', name: '선풍기', count: 1 },
  },
  reducers: {
    수량더하기(state, action) {
      state[action.payload].count += 1;
    },
    countMinus(state, action) {
      state[action.payload].count -= 1;
    },
    addItemincart(state, action) {
      state[action.payload.id] = {
        id: action.payload.id,
        name: action.payload.name,
        count: 1,
      };
    },
  },
});

export let { 수량더하기, countMinus, addItemincart } = cartItem.actions;

export default cartItem;
