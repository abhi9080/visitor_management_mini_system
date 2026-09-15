import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Visitor = {
      "name": string,
      "phone": string,
      "unitNumber": string,
      "visitDate": string,
};

type VisitorState = {
  visitors: Visitor[];
  loading: boolean;
  error: string | null;
};

const initialState: VisitorState = {
  visitors: [],
  loading: false,
  error: null,
};


export const fetchVisitors = createAsyncThunk(
  "visitors/fetchVisitors",
  async () => {
    const response = await axios.get<Visitor[]>(
      `/visitors`
    );

    return response.data;
  }
);

const visitorSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.visitors = action.payload;
      })

      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default visitorSlice.reducer;