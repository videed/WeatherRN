import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native'
import { useTheme, colors } from '@/Theme'
import FetchWeather from '@/Store/Weather/FetchWeather'

const Weather = ({ navigation, route }) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const location = route.params.item
  const isDark = useTheme()
  const dispatch = useDispatch()
  const weather = useSelector(
    (state) => state.weather.locations[location.woeid],
  )
  const fetchWeatherLoading = useSelector(
    (state) => state.weather.fetchWeather.loading,
  )
  const fetchWeatherError = useSelector(
    (state) => state.weather.fetchWeather.error,
  )

  useLayoutEffect(() => {
    dispatch(FetchWeather.action(location.woeid))
  }, [location.woeid])

  return (
    <View>
      {fetchWeatherLoading && <ActivityIndicator style={styles.loader} />}
      {fetchWeatherError ? (
        <Text style={styles.error}>{fetchWeatherError.message}</Text>
      ) : (
        weather && (
          <View style={styles.weatherBlock}>
            <Image
              source={{
                uri: `https://www.metaweather.com/static/img/weather/png/${weather.consolidated_weather[0].weather_state_abbr}.png`,
              }}
              style={styles.weatherIconMain}
            />

            <Text
              style={[
                styles.tempMain,
                {
                  color: colors(isDark).text,
                },
              ]}
            >
              {weather.consolidated_weather[0].the_temp.toFixed(0)}
              <Text
                style={[
                  styles.degree,
                  {
                    color: colors(isDark).text,
                  },
                ]}
              >
                ℃
              </Text>
            </Text>

            <Text
              style={[
                styles.location,
                {
                  color: colors(isDark).text,
                },
              ]}
            >
              {location.name}
            </Text>
            <Text
              style={[
                styles.country,
                {
                  color: colors(isDark).text,
                },
              ]}
            >
              {location.country}
            </Text>
            <FlatList
              data={weather.consolidated_weather}
              renderItem={({ item }) => {
                const d = new Date(item.applicable_date)
                const dateFormated = weekDays[d.getUTCDay()]
                return item.id === weather.consolidated_weather[0].id ? (
                  <></>
                ) : (
                  <View
                    style={[
                      styles.row,
                      {
                        backgroundColor: colors(isDark).bgFill,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.date,
                        {
                          color: colors(isDark).text,
                        },
                      ]}
                    >
                      {dateFormated}
                    </Text>
                    <Image
                      source={{
                        uri: `https://www.metaweather.com/static/img/weather/png/${item.weather_state_abbr}.png`,
                      }}
                      style={styles.weatherIcon}
                    />
                    <Text
                      style={[
                        styles.temp,
                        {
                          color: colors(isDark).text,
                        },
                      ]}
                    >
                      {item.the_temp.toFixed(0)}
                      <Text
                        style={[
                          styles.forecastDegree,
                          {
                            color: colors(isDark).text,
                          },
                        ]}
                      >
                        {' '}
                        ℃
                      </Text>
                    </Text>
                  </View>
                )
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              keyExtractor={(item) => item.id.toString()}
              style={{
                width: '100%',
              }}
            />
          </View>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  error: {
    textAlign: 'center',
  },
  weatherBlock: {
    alignItems: 'center',
    paddingTop: 60,
  },
  weatherIconMain: {
    width: 80,
    height: 80,
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  date: {
    fontSize: 16,
    opacity: 0.5,
    minWidth: '10%',
  },
  tempMain: {
    fontSize: 66,
    paddingTop: 20,
    paddingBottom: 40,
  },
  degree: {
    fontSize: 16,
    opacity: 0.5,
  },
  location: {
    fontSize: 36,
  },
  temp: {
    fontSize: 26,
    position: 'absolute',
    right: 40,
  },
  country: {
    fontSize: 21,
    opacity: 0.5,
    paddingTop: 10,
    paddingBottom: 60,
  },
  forecastDegree: {
    fontSize: 16,
    opacity: 0.5,
  },
  separator: {
    borderBottomColor: 'rgba(0,0,0,.2)',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default Weather
