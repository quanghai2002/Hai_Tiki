import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducerUser from './userSlice.js';
import PhoneReducer from './PhoneSlice.js';
import OrderPreview from './OrderPreview.js';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
// rootReducer
const rootReducer = combineReducers(
  {
    userAuth: reducerUser,
    orderPreview: OrderPreview,
    // phone: PhoneReducer
    // students: reducerStudents
    // ....
  }
);

// persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor
let persistor = persistStore(store);


export default store;
export { persistor };

{/* <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider> */}