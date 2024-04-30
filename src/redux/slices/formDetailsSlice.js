import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step1: {
    name: '',
    email: '',
    number: ''
  },
  step2: {
    billing_duration: '',
    plan_id: '',
  },
  step3: {
    add_ons_id: '',
  },
}

export const formDetailsSlice = createSlice({
  name: "formDetails",
  initialState,
  reducers: {
    updateStep1: (state, action) => {
      state.step1 = action.payload;
    },
    updateStep2: (state, action) => {
      state.step2 = action.payload;
    },
    updateStep3: (state, action) => {
      state.step3 = action.payload;
    }
  }
})

export const { updateStep1, updateStep2, updateStep3 } = formDetailsSlice.actions
export default formDetailsSlice.reducer