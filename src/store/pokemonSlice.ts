import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import pokemonReducer, { pokemonSaga } from './pokemonSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(pokemonSaga);

export default store;
