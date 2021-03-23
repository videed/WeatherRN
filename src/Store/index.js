import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'

import startup from './Startup'
import weather from './Weather'
import theme from './Theme'

const reducers = combineReducers({
  startup,
  weather,
  theme,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'weather'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

    return middlewares
  },
})

const persistor = persistStore(store)

export { store, persistor }
