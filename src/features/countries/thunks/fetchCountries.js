import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        " https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country"
      );

      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);