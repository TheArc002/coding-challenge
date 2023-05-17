import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import pokemonReducer, { pokemonSaga } from './pokemonSaga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), sagaMiddleware];

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware,
});

sagaMiddleware.run(pokemonSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
