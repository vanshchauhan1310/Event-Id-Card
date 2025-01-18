import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import EventListScreen from './components/Eventlist';
import CreateEventScreen from './components/CreateEvent';
import AddDetailsScreen from './components/AddDetailsScreen';
import UpdateDetailsScreen from './components/UpdateDetailsScreen';
import ScanQRCodeScreen from './components/ScanQrCodeScreen';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndCondition from './components/TermsAndConditionsScreen';
import AboutUs from './components/AboutUsScreen';
import EventCreatorDashboard from './components/EventCreatorDashboard';
import EventDetails from './components/EventDetails';
import EventCreatorAuth from './components/EventCreatorAuthScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventCreatorDashboard" component={EventCreatorDashboard} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="EventList" component={EventListScreen} options={{ title: 'Events' }} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ title: 'Create Event' }} />
        <Stack.Screen name="AddDetails" component={AddDetailsScreen} />
        <Stack.Screen name="UpdateDetails" component={UpdateDetailsScreen} />
        <Stack.Screen name="ScanQRCode" component={ScanQRCodeScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndCondition} options={{ title: 'Terms And Conditions' }}/>
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us' }}/>
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ title: 'Event Details' }} />
        <Stack.Screen name="EventCreatorAuth" component={EventCreatorAuth} options={{ title: 'Event Creator' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

