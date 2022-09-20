import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "loading",
  value: "",
  totalPrice: 0,
};

export const fetchProducts = createAsyncThunk(
  "main/fetchProducts",
  async () => {
    const response = await axios.get(
      `https://629ef7298b939d3dc28b2d3b.mockapi.io/magazine?page=1&limit=10`
    );
    return response.data;
  }
);

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    addNewProducts(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log("slice");
      state.items = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setProducts, setTotalPrice, addNewProducts } = mainSlice.actions;

export default mainSlice.reducer;

// [fetchProducts.pending]: (state) => {
//   state.status = "loading";
//   state.items = [];
// },
// [fetchProducts.fulfilled]: (state, action) => {
//   state.items = action.payload;
//   state.status = "completed";
// },
// [fetchProducts.rejected]: (state) => {
//   state.status = "error";
//   state.items = [];
// },
