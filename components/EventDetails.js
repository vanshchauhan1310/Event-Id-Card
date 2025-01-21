import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params;

  useEffect(() => {
    fetchEventDetails();
    fetchAttendees();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
      Alert.alert('Error', 'Failed to load event details. Please try again.');
    }
  };

  const fetchAttendees = async () => {
    try {
      const { data, error } = await supabase
        .from('attendees')
        .select('*')
        .eq('event_id', eventId);

      if (error) throw error;
      setAttendees(data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
      Alert.alert('Error', 'Failed to load attendees. Please try again.');
    }
  };

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{event.event_name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>{new Date(event.event_start_date).toLocaleDateString()}</Text>
        <Text style={styles.label}>End Date:</Text>
        <Text style={styles.value}>{new Date(event.event_end_date).toLocaleDateString()}</Text>
        <Text style={styles.label}>Timing:</Text>
        <Text style={styles.value}>{event.event_timing}</Text>
        <Text style={styles.label}>Venue:</Text>
        <Text style={styles.value}>{event.event_venue}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{event.event_description}</Text>
      </View>
      <View style={styles.attendeesContainer}>
        <Text style={styles.sectionTitle}>Attendees ({attendees.length})</Text>
        {attendees.map((attendee) => (
          <View key={attendee.id} style={styles.attendeeItem}>
            <Text style={styles.attendeeName}>{attendee.name}</Text>
            <Text style={styles.attendeeEmail}>{attendee.email}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UpdateDetails', { eventId: event.id })}
      >
        <Text style={styles.buttonText}>Edit Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  attendeesContainer: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  attendeeItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  attendeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  attendeeEmail: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

