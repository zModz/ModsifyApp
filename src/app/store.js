import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import { shazamCoreAPI } from '../../ShazamCore'

export default configureStore({
  reducer: {
    [shazamCoreAPI.reducerPath]: shazamCoreAPI.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreAPI.middleware),
})