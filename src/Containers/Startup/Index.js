import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text, Image, StyleSheet } from 'react-native'
import { useTheme, colors } from '@/Theme'
import { useDispatch } from 'react-redux'
import InitStartup from '@/Store/Startup/Init'

const IndexStartupContainer = () => {
  const isDark = useTheme()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View
      style={[styles.container, { backgroundColor: colors(isDark).bgFill }]}
    >
      <View style={styles.logo}>
        <Image
          source={require('../../Assets/Images/logo.png')}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <ActivityIndicator size={'small'} />
      <Text style={[styles.welcome, { color: colors(isDark).text }]}>
        Welcome
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    paddingBottom: 60,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  welcome: {
    fontSize: 30,
    paddingTop: 30,
    textAlign: 'center',
  },
})

export default IndexStartupContainer
