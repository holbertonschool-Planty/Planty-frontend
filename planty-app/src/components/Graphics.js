import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const IdealValues = {
  temperature: 25,
  light: 500,
  humidity: 50,
};

const valueDescriptions = {
  'A lot of light': IdealValues.light + 30,
  'Good light': IdealValues.light,
  'Low light': IdealValues.light - 30,
  'A lot of temperature': IdealValues.temperature + 8,
  'Good Temp': IdealValues.temperature + 8,
  'Bad Temp': IdealValues.temperature - 6,
  'Good Humidity': IdealValues.humidity + 30,
  'Bad Humidity': IdealValues.humidity - 30,
};

const temperatureData = [32, 25, 20, 24, 27, 32, 26, 26, 26, 32];
const lightData = [48, 52, 55, 54, 56, 58, 60, 58, 57, 55, 54, 53, 52];
const humidityData = [45, 48, 50, 52, 54, 55, 58, 60, 62, 63, 61, 60, 58];

const xAxisLabels = ['4', '8', '12', '16', '20', '00', '4', '8', '12', '16'];

const getLabelForValue = (value, valueMap) => {
  if (value === 22) {
    return 'Low Temp';
  }

  if (value === 50) {
    return 'Good Humidity';
  }

  if (value === 32) {
    return 'High Temp   ';
  }

  if (value === 26) {
    return 'Good Temp';
  }

  for (const label in valueMap) {
    if (value === valueMap[label]) {
      return label;
    }
  }

  return value.toString();
};

const GraphCard = () => {
  const maxTemperature = IdealValues.temperature + 8;
  const minTemperature = IdealValues.temperature - 6;
  const maxLight = IdealValues.light + 30;
  const minLight = IdealValues.light - 30;
  const maxHumidity = IdealValues.humidity + 30;
  const minHumidity = IdealValues.humidity - 30;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature Data</Text>
      <View style={styles.chartContainer}>
        <YAxis
          data={temperatureData}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={5}
          formatLabel={(value) => getLabelForValue(value, valueDescriptions, 'temperature')}
        />
        <AreaChart
          style={styles.chart}
          data={temperatureData}
          contentInset={{ top: 20, bottom: 10, left: 0 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        >
          <Grid />
        </AreaChart>
      </View>
      <XAxis
        style={{ height: 20, width: '90%', top: 6 }}
        data={temperatureData}
        formatLabel={(value, index) => xAxisLabels[index]}
        contentInset={{ left: 50, right: 5 }}
        svg={{ fontSize: 10, fill: 'grey' }}
      />

      <Text style={styles.title}>Light Data</Text>
      <View style={styles.chartContainer}>
        <YAxis
          data={lightData}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={5}
          min={minLight}
          max={maxLight}
          formatLabel={(value) => getLabelForValue(value, valueDescriptions)}
        />
        <AreaChart
          style={styles.chart}
          data={lightData}
          contentInset={{ top: 20, bottom: 20, left: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        >
          <Grid />
        </AreaChart>
      </View>

      <Text style={styles.title}>Humidity Data</Text>
      <View style={styles.chartContainer}>
        <YAxis
          data={humidityData}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={5}
          min={minHumidity}
          max={maxHumidity}
          formatLabel={(value) => getLabelForValue(value, valueDescriptions)}
        />
        <AreaChart
          style={styles.chart}
          data={humidityData}
          contentInset={{ top: 20, bottom: 20, left: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        >
          <Grid />
        </AreaChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: 150,
  },
  chart: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GraphCard;
