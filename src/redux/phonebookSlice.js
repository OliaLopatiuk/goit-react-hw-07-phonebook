import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './operations';

const phonebookInitialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};
const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const handleFetchSuccess = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  state.contacts.items = action.payload;
};

const handleAddSuccess = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  state.contacts.items.push(action.payload);
};

const handleDeleteSuccess = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
  const index = state.contacts.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.contacts.items.splice(index, 1);
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: phonebookInitialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFetchSuccess)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleAddSuccess)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleDeleteSuccess)
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const { setFilter } = phonebookSlice.actions;

export const phonebookReducer = phonebookSlice.reducer;

export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectFilter = state => state.filter;
