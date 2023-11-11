import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import FlowerImage from '../img/flower.png';

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

const temperatureData = [32, 25, 20, 24, 27, 30, 26, 26, 26, 32, 23, 25];
const lightData = [48, 52, 55, 54, 56, 58, 60, 58, 57, 55, 54, 53];
const humidityData = [48, 50, 52, 54, 55, 58, 60, 62, 63, 61, 60, 58];

const xAxisLabels = ['04', '08', '12', '16', '20', '00', '04', '08', '12', '16', '20', '00'];

const getLabelForTemperature = (value) => {
  if (value === 20) {
    return 'Bad Temp';
  }

  if (value === 32) {
    return 'High Temp   ';
  }

  if (value === 26) {
    return 'Good Temp';
  }

  return value.toString();
};

const getLabelForLight = (value) => {
  if (value === 530) {
    return 'High Light';
  }
  if (value === 500) {
    return 'Good Light  ';
  }
  if (value === 470) {
    return 'Bad Light';
  }

  return value.toString();
};

const getLabelForHumidity = (value) => {
  if (value === 80) {
    return 'Low Humidity';
  }
  if (value === 50) {
    return 'Low Humidity';
  }
  if (value === 20) {
    return 'Low Humidity';
  }


  return value.toString();
};


const getLabelForValue = (value, valueMap, chartType) => {
  switch (chartType) {
    case 'temperature':
      return getLabelForTemperature(value);
    case 'light':
      return getLabelForLight(value);
    case 'humidity':
      return getLabelForHumidity(value);
    default:
      return value.toString();
  }
};

const GraphCard = () => {
  const maxTemperature = IdealValues.temperature + 8;
  const minTemperature = IdealValues.temperature - 6;
  const maxLight = IdealValues.light + 30;
  const minLight = IdealValues.light - 30;
  const maxHumidity = IdealValues.humidity + 30;
  const minHumidity = IdealValues.humidity - 30;
  const [expandedCards, setExpandedCards] = useState([]);
  const [userData, setUserData] = useState([
    { plant_name: 'Planta 1', plant_info: { name: 'Orchidaceae phalaenopsis' }, color_card: '#AAFBB7', image_url: require('../img/flower.png') },
    { plant_name: 'Planta 2', plant_info: { name: 'poronga' }, color_card: '#AAFB', image_url: require('../img/flower.png') },
  ]);

  const gradientColors = [
    { offset: '0%', color: 'rgba(242,112,47,1)' },
    { offset: '50%', color: 'rgba(56,206,97,0.9444152661064426)' },
    { offset: '100%', color: 'rgba(242,112,47,1)' },
  ];

  const toggleCardExpansion = (index) => {
    setExpandedCards((prevExpanded) => {
      if (prevExpanded.includes(index)) {
        return prevExpanded.filter((item) => item !== index);
      } else {
        return [...prevExpanded, index];
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {userData.map((user, index) => (
        <View key={index} style={styles.squarecards}>
          <View style={{ backgroundColor: user.color_card, borderRadius: 20, width: '100%' }}>

            <View style={styles.imageAndDataContainer}>
              <View style={styles.imageProp}>
                <Image style={styles.imagecard} source={user.image_url} />
              </View>
              <View style={styles.dataConteiner}>
                <View style={styles.titlecard}>
                  <Text style={styles.titleText}>{user.plant_name}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.plantName, { maxWidth: 300, height: 60 }]}>
                    {user.plant_info.name}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => toggleCardExpansion(index)}
            >
              <Text style={styles.viewMoreText}>
                {expandedCards.includes(index) ? 'View Less ↑' : 'View More ↓'}
              </Text>
            </TouchableOpacity>


            {expandedCards.includes(index) && (
              <View>
                <Text style={styles.title}>Temperature Data</Text>
                <View style={styles.chartContainer}>
                  <YAxis
                    data={temperatureData}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{ fill: 'grey', fontSize: 10 }}
                    numberOfTicks={5}
                    formatLabel={(value) => getLabelForTemperature(value, valueDescriptions, 'temperature')}
                  />
                  <AreaChart
                    style={styles.chart}
                    data={temperatureData}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                  >
                    <Grid />
                  </AreaChart>
                </View>
                <XAxis
                  style={{ height: 20, width: '95%', top: -10 }}
                  data={temperatureData}
                  formatLabel={(value, index) => xAxisLabels[index]}
                  contentInset={{ left: 65, right: 6 }}
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
                    formatLabel={(value) => getLabelForLight(value, valueDescriptions, 'light')}
                  />
                  <AreaChart
                    style={styles.chart}
                    data={lightData}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                  >
                    <Grid />
                  </AreaChart>
                </View>
                <XAxis
                  style={{ height: 20, width: '95%', top: -10 }}
                  data={lightData}
                  formatLabel={(value, index) => xAxisLabels[index]}
                  contentInset={{ left: 65, right: 6 }}
                  svg={{ fontSize: 10, fill: 'grey' }}
                />
                <Text style={styles.title}>Humidity Data</Text>
                <View style={styles.chartContainer}>
                  <YAxis
                    data={humidityData}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{ fill: 'grey', fontSize: 10 }}
                    numberOfTicks={5}
                    min={minHumidity}
                    max={maxHumidity}
                    formatLabel={(value) => getLabelForHumidity(value, valueDescriptions, 'humidity')}
                  />
                  <AreaChart
                    style={styles.chart}
                    data={humidityData}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                  >
                    <Grid />
                  </AreaChart>
                </View>
                <XAxis
                  style={{ height: 20, width: '95%', top: -10 }}
                  data={humidityData}
                  formatLabel={(value, index) => xAxisLabels[index]}
                  contentInset={{ left: 65, right: 6 }}
                  svg={{ fontSize: 10, fill: 'grey' }}
                />
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: 150,
    marginBottom: 10,
  },
  chart: {
    flex: 1,
    width: '100%',
    height: 130,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '400',
    textAlign: 'center',
  },
  titlecard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  textPlant: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  plantName: {
    fontSize: 18,
    color: '#252423',
  },
  imagecard: {
    justifyContent: 'center',
    width: 80,
    height: 80,
    marginTop: 10,
  },
  imageProp: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  squarecards: {
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 3,
    marginBottom: 20,
    width: '96%',
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginRight: 30,

  },
  viewMoreText: {
    color: '#007BFF',
    fontSize: 18,
  },
  imageAndDataContainer: {
    flexDirection: 'row',
    height: 90,
    marginLeft: 10,
  },
  dataConteiner: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 25,
    fontWeight: '600',
  },
});

export default GraphCard;