import { combineReducers, configureStore } from '@reduxjs/toolkit';
import peopleSlice from './peopleSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    people: peopleSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});
