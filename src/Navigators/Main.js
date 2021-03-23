import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Locations, Settings } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Text style={{ fontSize: 24, paddingTop: 6 }}>
              {route.name === 'Locations' ? '🌤' : '⚙️'}{' '}
            </Text>
          )
        },
      })}
    >
      <Tab.Screen name="Locations" component={Locations} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default MainNavigator
