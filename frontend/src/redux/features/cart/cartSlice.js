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
        (product) => product._id === action.payload._id
      );
      if (!isExists) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
    updateQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (product) {
        if (action.payload.type === "increment") {
          product.quantity += 1;
        } else if (action.payload.type === "decrement") {
          if (product.quantity > 1) {
            product.quantity -= 1;
          }
        }
      }

      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
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

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
