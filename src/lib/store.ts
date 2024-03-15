import {configureStore} from '@reduxjs/toolkit'
import  GlobalSlice  from './features/global'

export const store = configureStore({
  reducer: {
    GlobalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
