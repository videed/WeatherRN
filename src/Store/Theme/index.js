import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import ChangeTheme from '@/Store/Theme/ChangeTheme'

export default buildSlice('theme', [ChangeTheme], {
  darkMode: null,
}).reducer
