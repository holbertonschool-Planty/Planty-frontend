import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import MyPlantyCard from './myPlantyCard';

const PlantsScreen = ({ navigation, route }) => {
    const userData = route.params?.user || null;
    const [refreshKey, setRefreshKey] = useState(0);

  const navigateToPlantAddition = () => {
    navigation.navigate('Add your plant', {user: userData, setKey: setRefreshKey, key: refreshKey });
  };

	const navigateToDeviceConnection = () => {
		navigation.navigate('ConnectDevice', {user: userData, setKey: setRefreshKey, key: refreshKey });
	};

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headings}>My plants</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <MyPlantyCard user={userData} refreshKey={refreshKey}/>
      </ScrollView>
      <View style={commonStyles.addButton} >
        <Button title='Add a Plant' onPress={navigateToDeviceConnection} style={{ borderRadius: 20 }} />
      </View>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar user={userData} name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar user={userData} name="Plants" icon="sprout" text="Plants" active={true} navigation={navigation} />
          <NavigationBar user={userData} name="Calendar" icon="calendar" text="Calendar" navigation={navigation} />
          <NavigationBar user={userData} name="Settings" icon="cog" text="Settings" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

export default PlantsScreen;
