// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer'; // assuming you have this

// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
const persistor = persistStore(store);

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export store and persistor
export { store, persistor };
