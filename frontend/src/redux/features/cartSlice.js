import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExists = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!isExists) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
  },
});

export const calculateSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

export const calculateTotalPrice = (state) =>
  state.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

export const calculateTax = (state) =>
  calculateTotalPrice(state) * state.taxRate;

export const calculateGrandTotal = (state) => {
  return calculateTotalPrice(state) + calculateTax(state);
};

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
