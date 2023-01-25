import { createSlice, nanoid } from '@reduxjs/toolkit';
import {
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
    addContact: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
      },
      prepare(newContact) {
        return { payload: { ...newContact, id: nanoid() } };
      },
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // deleteContact(state, action) {
    //   state.items = state.items.filter(
    //     contact => contact.id !== action.payload
    //   );
    // },
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
      });
  },
});

export const { addContact, setFilter, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
