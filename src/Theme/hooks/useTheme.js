import { useSelector } from 'react-redux'
import { Appearance } from 'react-native'

export default function () {
  // Get the scheme device
  const colorScheme = Appearance.getColorScheme()

  const isDark = useSelector((state) => state.theme.darkMode)
  const darkMode = isDark === null ? colorScheme === 'dark' : isDark

  return darkMode
}
