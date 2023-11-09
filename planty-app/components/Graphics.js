import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import axios from 'axios';

const IdealValues = {
  temperature: 25,
  light: 50,
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

const generateXAxisLabels = () => {
  const now = new Date();
  const labels = [];
  for (let i = 0; i < 12; i++) {
    const labelTime = new Date(now - i * 4 * 60 * 60 * 1000); // Resta i * 4 horas en milisegundos
    const hours = labelTime.getHours();
    const isYesterday = labelTime.getDate() < now.getDate();
    
    if (isYesterday) {
      labels.unshift(`${hours}:00 hr`);
    } else {
      const label = `${hours}:00`;
      labels.unshift(label);
    }
  }
  return labels;
};
  

const getLabelForValue = (value, valueMap) => {
  if (value === 22) {
    return 'Low Temp';
  }

  if (value === 50) {
    return 'Good Humidity';
  }

  if (value === 32) {
    return 'High Temp';
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

const GraphCard = ({user}) => {
  const maxTemperature = IdealValues.temperature + 8;
  const minTemperature = IdealValues.temperature - 6;
  const maxLight = IdealValues.light + 30;
  const minLight = IdealValues.light - 30;
  const maxHumidity = IdealValues.humidity + 30;
  const minHumidity = IdealValues.humidity - 30;
	const [userData, setUserData] = useState([]);
	const [temperatureData, setTemperatureData] = useState([])
	const [lightData, setLightData] = useState([])
	const [humidityData, setHumidityData] = useState([])
	const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {

  }, [])

	useEffect(() => {
		// Realiza solicitudes GET para obtener datos de planta para cada usuario
		axios.get(`https://api.plantyit.tech/api/users_planty/${user.id}`)
			.then(response => {
				// Una vez que la solicitud se completa con éxito, transforma los datos en la estructura deseada.
				setTransformedData(response.data.map(planty => {
					return {
						id: planty.id,
						name: planty.plant_name,
						actual_temperature: planty.planty.actual_temperature,
						actual_watering: planty.planty.actual_watering,
						actual_light: planty.planty.actual_light,
						plants_info: {
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
			const listX = generateXAxisLabels();
			console.log(listX);
	}, []);

	const xAxisLabels = generateXAxisLabels();

	return (
		<View style={styles.container}>
			{transformedData.map((plantyData, index) => (
				<View key={index}>
					<Text style={styles.title}>{plantyData.name} Temperature Data</Text>
					<View style={styles.chartContainer}>
						<YAxis
							data={plantyData.actual_temperature}
							svg={{ fill: 'grey', fontSize: 10 }}
							numberOfTicks={5}
							formatLabel={(value) => getLabelForValue(value, valueDescriptions, 'temperature')}
						/>
						<AreaChart
							style={styles.chart}
							data={plantyData.actual_temperature}
							curve={shape.curveNatural}
							svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
						>
							<Grid />
						</AreaChart>
					</View>
					<XAxis
						style={styles.xAxis}
						data={plantyData.actual_temperature}
						formatLabel={(value, index) => xAxisLabels[index]}
						contentInset={{ left: 50, right: 5 }}
						svg={{ fontSize: 10, fill: 'grey' }}
					/>	
					<Text style={styles.title}>{plantyData.name} Light Data</Text>
					<View style={styles.chartContainer}>
						<YAxis
							data={plantyData.actual_light}
							contentInset={{ top: 20, bottom: 20 }}
							svg={{ fill: 'grey', fontSize: 10 }}
							numberOfTicks={5}
							formatLabel={(value) => getLabelForValue(value, valueDescriptions)}
						/>
						<AreaChart
							style={styles.chart}
							data={plantyData.actual_light}
							contentInset={{ top: 20, bottom: 20, left: 30 }}
							curve={shape.curveNatural}
							svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
						>
							<Grid />
						</AreaChart>
					</View>
					<XAxis
        style={{ height: 20, width: '90%', top: 6 }}
        data={plantyData.actual_light}
        formatLabel={(value, index) => xAxisLabels[index]}
        contentInset={{ left: 50, right: 5 }}
        svg={{ fontSize: 10, fill: 'grey' }}
      />
	
					<Text style={styles.title}>{plantyData.name} Humidity Data</Text>
					<View style={styles.chartContainer}>
						<YAxis
							data={plantyData.actual_watering}
							contentInset={{ top: 20, bottom: 20 }}
							svg={{ fill: 'grey', fontSize: 10 }}
							numberOfTicks={5}
							formatLabel={(value) => getLabelForValue(value, valueDescriptions)}
						/>
						<AreaChart
							style={styles.chart}
							data={plantyData.actual_watering}
							contentInset={{ top: 20, bottom: 20, left: 30 }}
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
				</View>
			))}
		</View>
	);
}

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
    height: 150
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
	xAxis: {
    height: 20,
    width: '100%',
		top: 6
  },
});


export default GraphCard;
