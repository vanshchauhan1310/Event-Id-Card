import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutUsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>About Us</Text>
          
          <Text style={styles.paragraph}>
            Welcome to our Event Management App, a cutting-edge solution designed to simplify and
            enhance the experience of organizing and participating in events. Whether you're an event
            organizer planning a large-scale conference or an individual attending a community meetup,
            our app bridges the gap between efficiency and engagement, making events memorable and
            hassle-free.
          </Text>

          <Text style={styles.sectionTitle}>Where You Can Use the App</Text>
          <Text style={styles.paragraph}>
            Our app is versatile and caters to various types of events, including:
          </Text>
          <Text style={styles.bulletPoint}>• Corporate Events</Text>
          <Text style={styles.bulletPoint}>• Community Gatherings</Text>
          <Text style={styles.bulletPoint}>• Educational Programs</Text>
          <Text style={styles.bulletPoint}>• Trade Shows and Expos</Text>
          <Text style={styles.bulletPoint}>• Private Events</Text>
          <Text style={styles.bulletPoint}>• Sports and Fitness Events</Text>

          <Text style={styles.sectionTitle}>Pricing Plans</Text>
          <Text style={styles.subSectionTitle}>Free Version:</Text>
          <Text style={styles.bulletPoint}>• Event Creation</Text>
          <Text style={styles.bulletPoint}>• Participant Registration</Text>
          <Text style={styles.bulletPoint}>• E-Card Generation</Text>
          <Text style={styles.bulletPoint}>• Basic Event Analytics</Text>
          <Text style={styles.bulletPoint}>• QR Code Functionality</Text>

          <Text style={styles.subSectionTitle}>Paid Version (Premium Features):</Text>
          <Text style={styles.bulletPoint}>• Advanced Analytics</Text>
          <Text style={styles.bulletPoint}>• Custom Branding</Text>
          <Text style={styles.bulletPoint}>• Enhanced QR Code Features</Text>
          <Text style={styles.bulletPoint}>• Event Marketing Tools</Text>
          <Text style={styles.bulletPoint}>• Multi-Organizer Roles</Text>
          <Text style={styles.bulletPoint}>• Priority Support</Text>
          <Text style={styles.bulletPoint}>• Cloud Storage</Text>
          <Text style={styles.bulletPoint}>• API Integration</Text>

          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <Text style={styles.bulletPoint}>• Ease of Use</Text>
          <Text style={styles.bulletPoint}>• Time-Saving Tools</Text>
          <Text style={styles.bulletPoint}>• Networking Opportunities</Text>
          <Text style={styles.bulletPoint}>• Enhanced Security</Text>
          <Text style={styles.bulletPoint}>• Multi-Purpose Functionality</Text>

          <Text style={styles.paragraph}>
            Our Event Management App is more than just a tool—it's your partner in creating, managing,
            and enhancing events of any scale. Whether you're planning a small private gathering or a
            large corporate conference, our app is here to ensure that every aspect of your event runs
            smoothly.
          </Text>

          <Text style={styles.callToAction}>
            Download now and take your events to the next level!
          </Text>
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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 15,
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 5,
    marginLeft: 15,
    lineHeight: 24,
  },
  callToAction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

