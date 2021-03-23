import { store } from '../Store'
export { default as useTheme } from './hooks/useTheme'

export const colors = (darkMode) => {
  return {
    bgFill: darkMode ? '#121212' : 'white',
    bgOpaque: darkMode ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)',
    text: darkMode ? 'white' : 'black',
  }
}
