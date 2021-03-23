import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexStartupContainer, Weather } from '../Containers'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './Root'
import { SafeAreaView, StatusBar } from 'react-native'
import { useTheme, colors } from '../Theme'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'

const Stack = createStackNavigator()

let MainNavigator

// @refresh reset
const ApplicationNavigator = () => {
  const isDark = useTheme()
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false)
  const applicationIsLoading = useSelector((state) => state.startup.loading)

  useEffect(() => {
    if (MainNavigator == null && !applicationIsLoading) {
      MainNavigator = require('@/Navigators/Main').default
      setIsApplicationLoaded(true)
    }
  }, [applicationIsLoading])

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false)
      MainNavigator = null
    },
    [],
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors(isDark).bgFill }}>
      <NavigationContainer
        theme={isDark ? DarkTheme : DefaultTheme}
        ref={navigationRef}
      >
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <Stack.Navigator>
          <Stack.Screen
            name="Startup"
            component={IndexStartupContainer}
            options={{
              title: '',
            }}
          />
          {isApplicationLoaded && MainNavigator != null && (
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                title: 'Locations',
                animationEnabled: false,
              }}
            />
          )}
          <Stack.Screen
            name="Weather"
            component={Weather}
            options={{
              title: 'Current Weather',
              // animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
