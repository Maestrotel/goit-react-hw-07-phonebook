import { createSlice } from '@reduxjs/toolkit';
import {
  addContactsThunk,
  deleteContactsThunk,
  getContactsThunk,
} from 'redux/thunks/contactsThunk';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    error: null,
    isLoading: false,
    items: [],
    filter: '',
  },

  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getContactsThunk.rejected, (state, action) => {
        state.contacts = [];
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContactsThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContactsThunk.rejected, (state, action) => {
        state.contacts = [];
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContactsThunk.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContactsThunk.rejected, (state, action) => {
        state.contacts = [];
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setFilter } = contactSlice.actions;

export default contactSlice.reducer;
