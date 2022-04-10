import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {
    type: null,
    item: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShowModal(state, { payload }) {
      state.modals.type = payload.type;
      state.modals.item = payload.item || null;
    },
    setHiddenModal(state) {
      state.modals.type = null;
      state.modals.item = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;