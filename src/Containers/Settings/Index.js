import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme, colors } from '../../Theme'
import ChangeTheme from '../../Store/Theme/ChangeTheme'

const Settings = () => {
  const dispatch = useDispatch()
  const isDark = useTheme()
  const storeIsDark = useSelector((state) => state.theme.darkMode)

  const changeTheme = ({ darkMode }) => {
    dispatch(ChangeTheme.action({ darkMode }))
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.settingLabel, { color: colors(isDark).text }]}>
        DarkMode :
      </Text>

      <View style={styles.setting}>
        <Pressable
          style={[
            styles.button,
            {
              borderColor: storeIsDark === null ? '#2E92FF' : 'transparent',
              backgroundColor: colors(isDark).bgOpaque,
            },
          ]}
          onPress={() => changeTheme({ darkMode: null })}
        >
          <Text style={[styles.label, { color: colors(isDark).text }]}>
            Auto
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            {
              borderColor: storeIsDark ? '#2E92FF' : 'transparent',
              backgroundColor: colors(isDark).bgOpaque,
            },
          ]}
          onPress={() => changeTheme({ darkMode: true })}
        >
          <Text style={[styles.label, { color: colors(isDark).text }]}>
            Dark
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            {
              borderColor: storeIsDark === false ? '#2E92FF' : 'transparent',
              backgroundColor: colors(isDark).bgOpaque,
            },
          ]}
          onPress={() => changeTheme({ darkMode: false })}
        >
          <Text style={[styles.label, { color: colors(isDark).text }]}>
            Light
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 16,
    paddingBottom: 20,
  },
  button: {
    width: '30%',
    padding: 20,
    borderRadius: 6,
    borderWidth: 3,
    borderStyle: 'solid',
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
  },
})

export default Settings
