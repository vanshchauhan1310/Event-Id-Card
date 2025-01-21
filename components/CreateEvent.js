import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Card, Button, Text, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function CreateEventScreen() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventTiming, setEventTiming] = useState('');
  const [eventvenue, seteventvenue] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventWeb, setEventWeb] = useState('');
  const [eventLogo, setEventLogo] = useState('');
  const [organisationLogo, setOrganisationLogo] = useState('');
  const [customFormFields, setCustomFormFields] = useState([
    { label: 'Name', isRequired: true },
    { label: 'Email', isRequired: true },
    { label: 'Designation', isRequired: true },
  ]);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const uploadImage = useCallback(async (uri) => {
  try {
    if (!uri) {
      throw new Error('No image URI provided');
    }

    console.log('Starting image upload process for:', uri);

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileExt = uri.split('.').pop().toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    console.log('Uploading file:', fileName);

    const { data, error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(fileName, decode(base64), {
        contentType: `image/${fileExt}`,
      });

    if (uploadError) {
      if (uploadError.statusCode === 403) {
        throw new Error('Unauthorized. Please check your authentication.');
      }
      throw uploadError;
    }

    const { data: urlData, error: urlError } = await supabase.storage
      .from('event-images')
      .getPublicUrl(fileName);

    if (urlError) {
      throw urlError;
    }

    console.log('Upload successful. Public URL:', urlData.publicUrl);
    return urlData.publicUrl;

  } catch (error) {
    console.error('Upload process error:', error);
    Alert.alert(
      'Upload Error',
      `Failed to upload image: ${error.message}. Please try again.`,
      [{ text: 'OK' }]
    );
    return null;
  }
}, []);


const handleSaveEvent = async () => {
  if (eventName.trim() === '') {
    Alert.alert('Error', 'Please enter an event name');
    return;
  }

  try {

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const eventLogoUrl = eventLogo ? await uploadImage(eventLogo) : null;
    const orgLogoUrl = organisationLogo ? await uploadImage(organisationLogo) : null;

    const eventData = {
      event_name: eventName.trim(),
      event_start_date: eventStartDate.getTime(), // Convert to Unix timestamp
      event_end_date: eventEndDate.getTime(), // Convert to Unix timestamp
      event_timing: eventTiming,
      event_venue: eventvenue,
      event_description: eventDescription,
      event_web: eventWeb,
      event_logo: eventLogoUrl,
      organisation_logo: orgLogoUrl,
      creator_id: user.id,
      custom_form_fields: JSON.stringify(customFormFields),
    };

    console.log('Attempting to insert event with data:', eventData);

    const { data, error } = await supabase
      .from('events')
      .insert(eventData);

    if (error) {
      throw error;
    }

    console.log('Event created successfully:', data);
    Alert.alert('Success', 'Event created successfully!');
    navigation.goBack();
  } catch (error) {
    console.error('Error saving event:', error);
    Alert.alert('Error', `Failed to save event. Error: ${error.message}`);
  }
};

  const pickImage = async (setImageFunction) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageFunction(result.assets[0].uri);
    }
  };

  const renderImageSelector = (label, image, onPress) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onPress} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.imageText}>{`Select ${label}`}</Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );

  const addCustomField = () => {
    if (newFieldLabel.trim() !== '') {
      setCustomFormFields([...customFormFields, { label: newFieldLabel.trim(), isRequired: false }]);
      setNewFieldLabel('');
    }
  };

  const toggleFieldRequired = (index) => {
    const updatedFields = [...customFormFields];
    updatedFields[index].isRequired = !updatedFields[index].isRequired;
    setCustomFormFields(updatedFields);
  };

  const removeCustomField = (index) => {
    const updatedFields = customFormFields.filter((_, i) => i !== index);
    setCustomFormFields(updatedFields);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Card containerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create New Event</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              value={eventName}
              onChangeText={setEventName}
              placeholder="Enter Event Name"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.dateInput}>{eventStartDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={eventStartDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate) setEventStartDate(selectedDate);
                }}
              />
            )}

            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.dateInput}>{eventEndDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={eventEndDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate) setEventEndDate(selectedDate);
                }}
              />
            )}

            <Text style={styles.label}>Timings</Text>
            <TextInput
              style={styles.input}
              value={eventTiming}
              onChangeText={setEventTiming}
              placeholder="Enter Event Timings"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Venue</Text>
            <TextInput
              style={styles.input}
              value={eventvenue}
              onChangeText={seteventvenue}
              placeholder="Enter Event Venue"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Event Description</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={eventDescription}
              onChangeText={setEventDescription}
              placeholder="Enter Event Description"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
            />

            <Text style={styles.label}>Event Website</Text>
            <TextInput
              style={styles.input}
              value={eventWeb}
              onChangeText={setEventWeb}
              placeholder="Enter Event Website"
              placeholderTextColor="#999"
            />

            {renderImageSelector('Event Logo', eventLogo, () => pickImage(setEventLogo))}
            {renderImageSelector('Organisation Logo', organisationLogo, () => pickImage(setOrganisationLogo))}

            <Text style={styles.sectionTitle}>Custom ID Card Form Fields</Text>
            {customFormFields.map((field, index) => (
              <View key={index} style={styles.customFieldContainer}>
                <Text style={styles.customFieldLabel}>{field.label}</Text>
                <View style={styles.customFieldActions}>
                  <CheckBox
                    title="Required"
                    checked={field.isRequired}
                    onPress={() => toggleFieldRequired(index)}
                    containerStyle={styles.checkbox}
                  />
                  <TouchableOpacity onPress={() => removeCustomField(index)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.addFieldContainer}>
              <TextInput
                style={[styles.input, styles.addFieldInput]}
                value={newFieldLabel}
                onChangeText={setNewFieldLabel}
                placeholder="New Field Label"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={addCustomField} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Field</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            title="Save Event"
            onPress={handleSaveEvent}
            buttonStyle={styles.button}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dateInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'center',
    paddingTop: 12,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 16,
    color: '#999',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  customFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customFieldLabel: {
    fontSize: 16,
    flex: 1,
  },
  customFieldActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  addFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addFieldInput: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: '#4CD964',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});