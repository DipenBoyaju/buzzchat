import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import { authApi } from '../apis/authApi';
import authReducer from '../slices/authSlice'
import featureReducer from '../slices/featureSlice'
import socketReducer from '../slices/socketSlice'
import { userApi } from '../apis/userApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  auth: authReducer,
  feature: featureReducer,
  socket: socketReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['authApi', 'userApi', 'socket'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false,
    }
  ).concat(
    authApi.middleware,
    userApi.middleware
  )
})


export const persistor = persistStore(store)