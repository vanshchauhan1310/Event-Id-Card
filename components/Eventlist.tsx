import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Linking, Alert, RefreshControl } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { supabase } from './Supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash/debounce';

const ITEMS_PER_PAGE = 10;

export default function EventListScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchEvents = useCallback(async (pageNumber = 0, shouldRefresh = false) => {
    try {
      setIsLoading(true);
      console.log('Fetching events from Supabase...');
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pageNumber * ITEMS_PER_PAGE, (pageNumber + 1) * ITEMS_PER_PAGE - 1);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Events fetched successfully:', data);
      
      if (shouldRefresh) {
        setEvents(data);
      } else {
        setEvents(prevEvents => [...prevEvents, ...data]);
      }
      
      setHasMore(data.length === ITEMS_PER_PAGE);
      setPage(pageNumber);

      await AsyncStorage.setItem('cachedEvents', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching events:', error);
      Alert.alert('Error', `Failed to fetch events. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetchEvents = useCallback(
    debounce(fetchEvents, 300, { leading: true, trailing: false }),
    []
  );

  const loadCachedEvents = useCallback(async () => {
    try {
      const cachedEventsJson = await AsyncStorage.getItem('cachedEvents');
      if (cachedEventsJson) {
        const cachedEvents = JSON.parse(cachedEventsJson);
        setEvents(cachedEvents);
      }
    } catch (error) {
      console.error('Error loading cached events:', error);
    }
  }, []);

  useEffect(() => {
    console.log('EventListScreen mounted');
    loadCachedEvents();
    debouncedFetchEvents(0, true);
  }, [debouncedFetchEvents, loadCachedEvents]);

  useFocusEffect(
    useCallback(() => {
      console.log('EventListScreen focused');
      debouncedFetchEvents(0, true);
    }, [debouncedFetchEvents])
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      debouncedFetchEvents(page + 1);
    }
  };

  const handleRefresh = () => {
    setPage(0);
    setHasMore(true);
    debouncedFetchEvents(0, true);
  };

  const renderEventItem = ({ item }) => (
    <Card containerStyle={styles.eventCard}>
      <View style={styles.eventHeader}>
        {item.event_logo ? (
          <Image 
            source={{ uri: item.event_logo }} 
            style={styles.eventLogo} 
            onError={(e) => console.log('Error loading event logo:', item.event_logo, e.nativeEvent.error)}
          />
        ) : (
          <View style={[styles.eventLogo, styles.placeholderLogo]} />
        )}
        <View style={styles.eventHeaderText}>
          <Text style={styles.eventName}>{item.event_name || 'No event name'}</Text>
          <Text style={styles.eventDate}>
            {item.event_start_date && item.event_end_date 
              ? `Date: ${new Date(item.event_start_date * 1000).toLocaleDateString()} - ${new Date(item.event_end_date * 1000).toLocaleDateString()}`
              : 'Date not available'}
          </Text>
        </View>
      </View>

      {item.event_timing && (
        <Text style={styles.eventTiming}>Timings: {item.event_timing}</Text>
      )}
      {item.event_venue && (
        <Text style={styles.eventTiming}>Venue: {item.event_venue}</Text>
      )}
      {item.event_description && (
        <Text style={styles.eventDescription} numberOfLines={3}>Description: {item.event_description}</Text>
      )}

      {item.event_web && (
        <TouchableOpacity onPress={() => {
          const url = item.event_web.startsWith('http') ? item.event_web : `http://${item.event_web}`;
          Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
        }}>
          <Text style={styles.eventWebsite}>Website: {item.event_web}</Text>
        </TouchableOpacity>
      )}

      {item.organisation_logo && (
        <Image 
          source={{ uri: item.organisation_logo }} 
          style={styles.organisationLogo}
          onError={(e) => console.log('Error loading org logo:', item.organisation_logo, e.nativeEvent.error)}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('AddDetails', { 
            eventName: item.event_name,
            eventLogo: item.event_logo,
            orgLogo: item.organisation_logo,
            customFormFields: item.custom_form_fields ? JSON.parse(item.custom_form_fields) : []
          })}
        >
          <Text style={styles.buttonText}>Generate ID Card</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('ScanQRCode', {
            eventName: item.event_name,
            eventLogo: item.event_logo,
            organisationLogo: item.organisation_logo,
          })}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            {isLoading ? 'Loading events...' : 'No events added yet.'}
          </Text>
        }
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={styles.buttonText}>Create New Event</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  eventCard: {
    borderRadius: 8,
    marginBottom: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  eventLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  placeholderLogo: {
    backgroundColor: '#ccc',
  },
  eventHeaderText: {
    flex: 1,
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  eventTiming: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  eventWebsite: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  organisationLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  createButton: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: '#4CD964',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});