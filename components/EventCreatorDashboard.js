import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function EventCreatorDashboard() {
  const [eventStats, setEventStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchDashboardData(user.id);
      } else {
        Alert.alert('Error', 'User not logged in');
        navigation.navigate('EventCreatorAuth');
      }
    };

    fetchUserAndData();
  }, []);

  const fetchDashboardData = async (creatorId) => {
    try {
      // Fetch total events for this creator
      const { count: totalEvents, error: totalEventsError } = await supabase
        .from('events')
        .select('*', { count: 'exact' })
        .eq('creator_id', creatorId);

      if (totalEventsError) throw totalEventsError;

      // Fetch upcoming events for this creator
      const currentDate = new Date().getTime();
      const { count: upcomingEvents, error: upcomingEventsError } = await supabase
        .from('events')
        .select('*', { count: 'exact' })
        .eq('creator_id', creatorId)
        .gt('event_start_date', currentDate);

      if (upcomingEventsError) throw upcomingEventsError;

      // Fetch total attendees for this creator's events
      const { count: totalAttendees, error: totalAttendeesError } = await supabase
        .from('id_cards')
        .select('*', { count: 'exact' })
        .eq('creator_id', creatorId);

      if (totalAttendeesError) throw totalAttendeesError;

      // Fetch recent events for this creator
      const { data: recentEventsData, error: recentEventsError } = await supabase
        .from('events')
        .select('*')
        .eq('creator_id', creatorId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentEventsError) throw recentEventsError;

      setEventStats({ totalEvents, upcomingEvents, totalAttendees });
      setRecentEvents(recentEventsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data. Please try again.');
    }
  };

  const renderStatCard = (title, value, icon) => (
    <Card containerStyle={styles.statCard}>
      <Ionicons name={icon} size={24} color="#007AFF" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </Card>
  );

  const refreshDashboard = () => {
    if (userId) {
      fetchDashboardData(userId);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Event Creator Dashboard</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={refreshDashboard}>
        <Ionicons name="refresh" size={24} color="#007AFF" />
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      <View style={styles.statsContainer}>
        {renderStatCard('Total Events', eventStats.totalEvents, 'calendar')}
        {renderStatCard('Upcoming Events', eventStats.upcomingEvents, 'hourglass')}
        {renderStatCard('Total Attendees', eventStats.totalAttendees, 'people')}
      </View>
      <View style={styles.recentEventsContainer}>
        <Text style={styles.sectionTitle}>Recent Events</Text>
        {recentEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventItem}
            onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
          >
            <Text style={styles.eventName}>{event.event_name}</Text>
            <Text style={styles.eventDate}>
              {new Date(event.event_start_date).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={styles.createButtonText}>Create New Event</Text>
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
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  refreshButtonText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    width: '30%',
    alignItems: 'center',
    borderRadius: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  recentEventsContainer: {
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

