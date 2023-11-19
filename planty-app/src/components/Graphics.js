import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import axios from 'axios';

const generateXAxisLabels = () => {
  const now = new Date();
  const labels = [];

  for (let i = 0; i < 12; i++) {
    const labelTime = new Date(now - i * 4 * 60 * 60 * 1000); // Resta i * 4 horas en milisegundos
    let hours = labelTime.getHours();
    hours = Math.floor(hours / 4) * 4;
    let label = `${(hours < 10 ? '0' : '')}${hours === 0 ? '0' : hours}hr`;
    labels.unshift(label);
  }

  return labels;
};

const getLabelForTemperature = (value, perfect) => {
  if (value === perfect - 10) {
    return `Low Temp ${perfect - 10}°C`;
  }

  if (value === perfect + 10) {
    return ` High Temp ${perfect + 10}°C`;
  }

  if (value === perfect) {
    return `Good Temp ${perfect}°C`;
  }

  return `${value.toString()}°C`;
};

const getLabelForLight = (value, perfect) => {
  if (value === perfect - 30) {
    return `Low Light ${perfect - 30}%`;
  }

  if (value === perfect + 30) {
    return ` High Light ${perfect + 30}%`;
  }

  if (value === perfect) {
    return `Good Light ${perfect}%`;
  }

  return `${value.toString()}%`;
};

const getLabelForHumidity = (value, perfect) => {
  if (value === perfect - 30) {
    return `Low Humidity ${perfect - 30}%`;
  }

  if (value === perfect + 30) {
    return ` High Humidity ${perfect + 30}%`;
  }

  if (value === perfect) {
    return `Good Humidity ${perfect}%`;
  }

  return `${value.toString()}%`;
};


const GraphCard = ({ user, navigation }) => {
  const values = {
    minTemp: 0,
    maxTemp: 40,
    minLight: 0,
    maxLight: 100,
    minWatering: 0,
    maxWatering: 100
  };
  const [expandedCards, setExpandedCards] = useState([]);
  const [transformedData, setTransformedData] = useState([]);

  const toggleCardExpansion = (index) => {
    setExpandedCards((prevExpanded) => {
      if (prevExpanded.includes(index)) {
        return prevExpanded.filter((item) => item !== index);
      } else {
        return [...prevExpanded, index];
      }
    });
  };

  const xAxisLabels = generateXAxisLabels();

  function roundToNearestMultipleOf5(number) {
    const remainder = number % 5;
    let nearestMultipleOf5;
    if (remainder === 0) {
      nearestMultipleOf5 = number;
    } else if (remainder < 3) {
      nearestMultipleOf5 = number - remainder;
    } else {
      nearestMultipleOf5 = number + (5 - remainder);
    }
    return nearestMultipleOf5;
  }

  function roundToNearestMultipleOf10(number) {
    const remainder = number % 10;
    let nearestMultipleOf10;
    
    if (remainder === 0) {
      nearestMultipleOf10 = number;
    } else {
      nearestMultipleOf10 = number + (10 - remainder);
    }
  
    return nearestMultipleOf10;
  }
  
  useEffect(() => {
    const element = () => {
    axios.get(`https://api.plantyit.tech/api/users_planty/${user.id}`)
      .then(response => {
        setTransformedData(response.data.map(planty => {
          return {
            id: planty.id,
            name: planty.plant_name,
            color_card: planty.color_card,
            image_url: planty.image_url,
            actual_temperature: planty.planty.actual_temperature,
            actual_watering: planty.planty.actual_watering,
            actual_light: planty.planty.actual_light,
            plants_info: {
              name: planty.planty.plants_info.scientific_name,
              id: planty.planty.plants_info.id,
              temperature: planty.planty.plants_info.temperature,
              light: planty.planty.plants_info.light,
              watering: planty.planty.plants_info.watering
            }
          };
        }));
      })
      .catch(error => {
        console.error('Error in the request', error);
      });
      }
    const listX = generateXAxisLabels();
    
    const focusListener = navigation.addListener('focus', () => {
      element();
    });
    return () => {
      focusListener.Remove();
    };
  }, [navigation, user]);

  return (
    <ScrollView style={styles.container}>
      {transformedData.map((user, index) => (
        <View key={index} style={styles.squarecards}>
          <View style={{ backgroundColor: user.color_card, borderRadius: 20, width: '100%' }}>

            <View style={styles.imageAndDataContainer}>
              <View style={styles.imageProp}>
                <Image style={styles.imagecard} source={{ uri: user.image_url }} />
              </View>
              <View style={styles.dataConteiner}>
                <View style={styles.titlecard}>
                  <Text style={styles.titleText}>{user.name}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.plantName, { maxWidth: 300, height: 60 }]}>
                    {user.plants_info.name}
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
                    data={user.actual_temperature}
                    contentInset={{ top: 5, bottom: 5 }}
                    svg={{ fill: '#232425', fontSize: 10 }}
                    min={values.minTemp}
                    max={values.maxTemp}
                    numberOfTicks={8}
                    formatLabel={(value) => `${getLabelForTemperature(value, roundToNearestMultipleOf5(user.plants_info.temperature))}`}
                  />
                  <AreaChart
                    style={styles.chart}
                    data={user.actual_temperature}
                    contentInset={{ top: 5 }}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(46, 38, 66, 0.5)', stroke: 'rgba(46, 38, 66, 0.8)', strokeWidth: 3 }}
                    numberOfTicks={12}
                    yMin={0}
                    yMax={40}
                    animate={true}
                  >
                    <Grid />
                  </AreaChart>
                </View>
                <XAxis
                  style={{ height: 20, width: '93%', top: -5, left: 15 }}
                  data={user.actual_temperature}
                  formatLabel={(value, index) => xAxisLabels[index]}
                  contentInset={{ left: 65, right: 6 }}
                  svg={{ fontSize: 10, fill: '#232425' }}
                />
                <Text style={styles.title}>Light Data</Text>
                <View style={styles.chartContainer}>
                  <YAxis
                    data={user.actual_light}
                    contentInset={{ top: 5, bottom: 5 }}
                    svg={{ fill: '#232425', fontSize: 10 }}
                    min={values.minLight}
                    max={values.maxLight}
                    numberOfTicks={10}
                    formatLabel={(value) => `${getLabelForLight(value, roundToNearestMultipleOf10(user.plants_info.light))}`}
                  />
                  <AreaChart
                    style={styles.chart}
                    data={user.actual_light}
                    contentInset={{ top: 5 }}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(46, 38, 66, 0.5)', stroke: 'rgba(46, 38, 66, 0.8)', strokeWidth: 3 }}
                    numberOfTicks={12}
                    yMin={0}
                    yMax={100}
                            animate={true}
                  >
                    <Grid />
                  </AreaChart>
                </View>
                <XAxis
                  style={{ height: 20, width: '93%', top: -5, left: 15 }}
                  data={user.actual_light}
                  formatLabel={(value, index) => xAxisLabels[index]}
                  contentInset={{ left: 65, right: 6 }}
                  svg={{ fontSize: 10, fill: '#232425' }}
                />
                <Text style={styles.title}>Humidity Data</Text>
                <View style={styles.chartContainer}>
                  <YAxis
                    data={user.actual_watering}
                    contentInset={{ top: 5, bottom: 5 }}
                    svg={{ fill: '#232425', fontSize: 10 }}
                    min={values.minWatering}
                    max={values.maxWatering}
                    numberOfTicks={10}
                    formatLabel={(value) => `${getLabelForHumidity(value, roundToNearestMultipleOf10(user.plants_info.watering))}`}
                  />
                  <AreaChart
                    style={styles.chart}
                    data={user.actual_watering}
                    contentInset={{ top: 5 }}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(46, 38, 66, 0.5)', stroke: 'rgba(46, 38, 66, 0.8)', strokeWidth: 3  }}
                    numberOfTicks={12}
                    yMin={values.minWatering}
                    yMax={values.maxWatering}
                            animate={true}
                  >
                    <Grid />
                  </AreaChart>
                </View>
                <XAxis
                  style={{ height: 20, width: '93%', top: -5, left: 15 }}
                  data={user.actual_watering}
                  formatLabel={(value, index) => xAxisLabels[index]}
                  contentInset={{ left: 65, right: 6 }}
                  svg={{ fontSize: 10, fill: '#232425' }}
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
    marginTop: 12,
    borderRadius: 12,
  },
  imageProp: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  squarecards: {
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 4,
    marginBottom: 20,
    width: '96%',
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginRight: 30,

  },
  viewMoreText: {
    color: '#04478f',
    fontSize: 18,
  },
  imageAndDataContainer: {
    flexDirection: 'row',
    height: 92,
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