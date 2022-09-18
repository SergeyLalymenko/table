import api from '../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPeople = createAsyncThunk(
    'people/fetchPeople',
    async function(_, { rejectWithValue }) {
        try {
            const res = await api.get('/');

            if(res.statusText !== 'OK') {
                throw new Error('Can not fetch people!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createPerson = createAsyncThunk(
    'people/createPerson',
    async function(newPerson, { rejectWithValue }) {
        try {
            const res = await api.post('/', newPerson);

            if(res.statusText !== 'Created') {
                throw new Error('Can not create person!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deletePerson = createAsyncThunk(
    'people/deletePerson',
    async function(id, { rejectWithValue }) {
        try {
            const res = await api.delete(`/${id}`);

            if(res.statusText !== 'OK') {
                throw new Error('Can not delete person!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updatePerson = createAsyncThunk(
    'people/updatePerson',
    async function(payload, { rejectWithValue }) {
        try {
            const res = await api.put(`/${payload.id}`, payload.newPerson);

            if(res.statusText !== 'OK') {
                throw new Error('Can not change person!');
            }

            return res.data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        data: null,
    },
    extraReducers: {
        [fetchPeople.fulfilled]: (state, { payload }) => {
            state.data = payload;
        },
        [createPerson.fulfilled]: (state, { payload }) => {
            state.data.push(payload);
        },
        [deletePerson.fulfilled]: (state, { payload }) => {
            state.data = state.data.filter((person) => person.id !== payload.id)
        },
        [updatePerson.fulfilled]: (state, { payload }) => {
            state.data = state.data.map((person) => person.id === payload.id ? payload : person)
        },
    },
});

export default peopleSlice.reducer;
