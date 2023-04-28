import { SSubj } from '@app/domain/interfaces';
import { persistUser } from '@app/services/localStorage.service';
import { PrepareAction, createAction, createSlice } from '@reduxjs/toolkit';

export interface SubjState {
  subj: SSubj | null;
}

const initialState: SubjState = {
  subj: null,
};

export const setSubj = createAction<PrepareAction<SSubj>>('subj/setSubj', (newSubj) => {
  return {
    payload: newSubj,
  };
});

export const subjSlice = createSlice({
  name: 'subj',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSubj, (state, action) => {
      state.subj = action.payload;
    });
  },
});

export default subjSlice.reducer;
