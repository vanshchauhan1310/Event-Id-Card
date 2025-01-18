import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  Alert,
TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Video } from 'expo-av'; // Import Video component
import { supabase } from './Supabase';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEventCreatorLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigation.navigate('EventCreatorDashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Error', error.message);
    }
  };


  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderFeatureItem = (icon, text) => (
    <View style={styles.featureItem}>
      <Feather
        name={icon}
        size={24}
        color="#007AFF"
        style={styles.featureIcon}
      />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );

  const showComingSoonAlert = () => {
    Alert.alert(
      'Coming Soon',
      'This feature will be available in a future update!',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <View style={styles.header}>
              <Video
                source={require('../assets/Logo2.mp4')} // Use Video component
                style={styles.logo}
                resizeMode="contain"
                isLooping
                shouldPlay
              />
              <Text style={styles.title}>Prasang</Text>
            </View>

            <Text style={styles.description}>
              Your all-in-one solution for event management and ID card
              generation.
            </Text>

            <View style={styles.featuresContainer}>
              <Text style={styles.sectionTitle}>Key Features</Text>
              {renderFeatureItem('calendar', 'Create and manage events')}
              {renderFeatureItem('credit-card', 'Generate custom ID cards')}
              {renderFeatureItem(
                'smartphone',
                'Scan QR codes for quick check-ins'
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.quaternaryButton]}
                onPress={() => navigation.navigate('AboutUs')}>
                <Feather
                  name="info"
                  size={24}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EventList')}>
                <Feather
                  name="list"
                  size={24}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>View Events</Text>
              </TouchableOpacity>

              <TouchableOpacity
        style={[styles.button, styles.tertiaryButton]}
        onPress={() => navigation.navigate('EventCreatorAuth')}>
        <Feather
          name="log-in"
          size={24}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Log in as Event Creator</Text>
      </TouchableOpacity>

              {/* New View for Privacy Policy and Terms and Conditions */}
              <View style={styles.privacyContainer}>
                <TouchableOpacity
                  style={styles.privacyButton}
                  onPress={() => navigation.navigate('PrivacyPolicy')}>
                  <Text style={styles.privacyButtonText}>Privacy Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.privacyButton}
                  onPress={() => navigation.navigate('TermsAndConditions')}>
                  <Text style={styles.privacyButtonText}>
                    Terms And Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: '80%',
  },
  featuresContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    width: width - 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    marginRight: 15,
  },
  featureText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  tertiaryButton: {
    backgroundColor: '#28a745',
  },
  quaternaryButton: {
    backgroundColor: '#ffc107',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    gap: 2,
  },
  privacyButton: {
    flex: 1,
    alignItems: 'center',
  },
  privacyButtonText: {
    color: '#e0e0e0',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  
  loginContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
});
