import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchWeather from './FetchWeather'

// This state is common to all the "weather" module, and can be modified by any "weather" reducers
const sliceInitialState = {
  locations: {},
}

export default buildSlice('weather', [FetchWeather], sliceInitialState).reducer
