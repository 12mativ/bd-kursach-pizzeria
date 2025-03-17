import { createSlice } from "@reduxjs/toolkit";

export interface IEmployee {
  id: number;
  name: string;
  label: string;
  required: boolean;
  array: boolean;
}

interface IEmployeesState {
  employees: IEmployee[];
}

const initialState: IEmployeesState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    // addEntityClasses: (state, action: PayloadAction<IOntologyEntityClass[]>) => {
    //   action.payload.forEach((eC) => {
    //     if (!findEqualItemsByUri(state.entityClasses, eC.uri)) {
    //       state.entityClasses.push(eC);
    //     }
    //   })
    // },

    // addEntityClass: (state, action: PayloadAction<IOntologyEntityClass>) => {
    //   if (!findEqualItemsByUri(state.entityClasses, action.payload.uri)) {
    //     state.entityClasses.push(action.payload);
    //   }
    // },

    // removeAllEntityClasses: (state) => {
    //   state.entityClasses = [];
    // },

    // editEntityClass: (state, action: PayloadAction<IOntologyEntityClass>) => {
    //   state.entityClasses = state.entityClasses.map((eC) => {
    //     if (eC.uri === action.payload.uri) {
    //       return action.payload
    //     } 
    //     return eC
    //   })
    // },
  },
});

export default employeesSlice.reducer;

export const {  } = employeesSlice.actions;