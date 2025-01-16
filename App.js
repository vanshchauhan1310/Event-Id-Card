import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddDetailsScreen from './components/AddDetailsScreen';
import UpdateDetailsScreen from './components/UpdateDetailsScreen';
import ScanQRCodeScreen from './components/ScanQrCodeScreen';
import EventListScreen from './components/Eventlist'; 
import CreateEventScreen from './components/CreateEvent';
import HomeScreen from './components/HomeScreen';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndCondition from './components/TermsAndConditionsScreen';
import AboutUs from './components/AboutUsScreen'

const Stack = createStackNavigator();

export default function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />


        <Stack.Screen name="EventList" options={{ title: 'Events' }}>
          {(props) => <EventListScreen {...props} events={events} />} 
        </Stack.Screen>
        <Stack.Screen name="CreateEvent" options={{ title: 'Create Event' }}>
          {(props) => <CreateEventScreen {...props} onAddEvent={addEvent} />}
        </Stack.Screen>
        <Stack.Screen name="AddDetails" component={AddDetailsScreen} />
        <Stack.Screen name="UpdateDetails" component={UpdateDetailsScreen} />
        <Stack.Screen name="ScanQRCode" component={ScanQRCodeScreen} />
       <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndCondition} options={{ title: 'Terms And Conditions' }}/>
       <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}