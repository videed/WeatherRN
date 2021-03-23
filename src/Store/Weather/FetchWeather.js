import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchWeatherService from '@/Services/Weather/Fetch'

export default {
  initialState: buildAsyncState('fetchWeather'),
  action: buildAsyncActions('weather/fetchWeather', fetchWeatherService),

  reducers: {
    ...buildAsyncReducers({
      itemKey: null,
      errorKey: 'fetchWeather.error', // Optionally, if you scoped variables, you can use a key with dot notation
      loadingKey: 'fetchWeather.loading',
    }),
    fulfilled: (state, { payload, type }) => {
      state.locations[payload.woeid] = payload
      state.fetchWeather.loading = false
    },
  },
}
