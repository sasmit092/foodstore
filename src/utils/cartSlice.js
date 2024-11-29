import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            //mutating the state here
            //Redux toolkit uses immer behind the scene
           state.items.push(action.payload)
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            //RTK says either Mutate the existing state or return a new state(return { items: [] };)
            state.items.length = 0;
            //return { items: [] }; //this new object will be replaced inside originalState = { items: [] };
        },
    }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;