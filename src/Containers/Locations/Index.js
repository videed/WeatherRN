import React from 'react'
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import { useTheme, colors } from '../../Theme'
import LOCATIONS from '../../Assets/citiesWoeod'

const Locations = ({ navigation }) => {
  const isDark = useTheme()

  return (
    <FlatList
      data={LOCATIONS}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate('Weather', { item })}
          style={[styles.row, { backgroundColor: colors(isDark).bgFill }]}
        >
          <Text style={[styles.city, { color: colors(isDark).text }]}>
            {item.name}
          </Text>
          <Text style={[styles.country, { color: colors(isDark).text }]}>
            {item.country}
          </Text>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item) => item.woeid.toString()}
    />
  )
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  city: {
    fontSize: 20,
    paddingBottom: 4,
  },
  country: {
    fontSize: 12,
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  separator: {
    borderBottomColor: 'rgba(0,0,0,.2)',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default Locations
