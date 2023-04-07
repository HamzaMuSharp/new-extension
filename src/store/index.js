import { configureStore, combineReducers } from '@reduxjs/toolkit';

import keySlice from './keySlice'; // Replace with your own reducer

const rootReducer = combineReducers({                                        // 3
    key: keySlice,
});


const store = configureStore({
    reducer: rootReducer, // Pass in your root reducer
});
export default store