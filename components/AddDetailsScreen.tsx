import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from './Supabase';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';

export default function GenerateIDCard() {
  const route = useRoute();
  const navigation = useNavigation();
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventLogo: '',
    orgLogo: '',
    customFormFields: []
  });
  const [formData, setFormData] = useState({});
  const [pronouns] = useState(['Mr.', 'Mrs.', 'Dr.', 'Other']);
  const [loading, setLoading] = useState(false);
  const [selectedPronoun, setSelectedPronoun] = useState('');
  const [customPronoun, setCustomPronoun] = useState('');

  useEffect(() => {
    console.log('Route params:', route.params);
    if (route.params) {
      setEventDetails(route.params);
    } else {
      Alert.alert(
        'Error',
        'Event details are missing. Please go back and select an event.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [route.params, navigation]);

  const generateIDCardPDF = async () => {
    if (!eventDetails.eventName) {
      Alert.alert('Error', 'Event name is missing. Please go back and ensure the event has a name.');
      return;
    }

     const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');
      
    const requiredFields = eventDetails.customFormFields.filter(field => field.isRequired);
    const missingFields = requiredFields.filter(field => !formData[field.label]);

    if (missingFields.length > 0) {
      Alert.alert('Error', `Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const jsonData = JSON.stringify(formData);
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(jsonData)}`;

      const finalPronoun = selectedPronoun === 'Other' ? customPronoun : selectedPronoun;

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ID Card</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

                body {
                    font-family: 'Roboto', sans-serif;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                .id-card {
                    background-color: #ffffff;
                    width: 350px;
                    height: 500px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    position: relative;
                }

                .header {
                    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                    min-height: 140px;
                    padding: 20px;
                    color: white;
                    text-align: center;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .event-logo {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 3px solid white;
                    background-color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    margin-bottom: 10px;
                }

                .event-logo img {
                    max-width: 100%;
                    max-height: 100%;
                }

                .event-name {
                    font-size: 16px;
                    font-weight: 600;
                    max-width: 280px;
                    word-wrap: break-word;
                    line-height: 1.2;
                }

                .content {
                    padding: 20px;
                    text-align: center;
                }

                .designation {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 10px;
                }

                .name {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: #1a1a1a;
                }

                .qr-code {
                    width: 170px;
                    height: 170px;
                    margin: 20px auto;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .qr-code img {
                    max-width: 100%;
                    max-height: 100%;
                }

                .org-logo {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    width: 60px;
                    height: 60px;
                    background-color: white;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                .org-logo img {
                    max-width: 80%;
                    max-height: 80%;
                }
            </style>
        </head>
        <body>
            <div class="id-card">
                <div class="header">
                    <div class="event-logo">
                        <img src="${eventDetails.eventLogo || 'https://placeholder.com/80x80'}" alt="Event Logo">
                    </div>
                    <div class="event-name">${eventDetails.eventName}</div>
                </div>
                <div class="content">
                    <div class="name">${finalPronoun} ${formData.Name || 'Attendee Name'}</div>
                    <div class="qr-code">
                        <img src="${apiUrl}" alt="QR Code">
                    </div>
                </div>
                <div class="org-logo">
                    <img src="${eventDetails.orgLogo || 'https://placeholder.com/60x60'}" alt="Organization Logo">
                </div>
            </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      const { data, error } = await supabase
        .from('id_cards')
        .insert({
          event_name: eventDetails.eventName,
          creator_id: user.id,
          form_data: { ...formData, pronoun: finalPronoun },
          qr_code_url: apiUrl,
        });

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(`Failed to save ID card data: ${error.message}`);
      }

      Alert.alert('Success', 'ID Card PDF generated and saved successfully!');

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', `Failed to generate or share the PDF. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Generate ID Card</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Event Name:</Text>
          <Text style={styles.eventNameText}>{eventDetails.eventName || 'No event name provided'}</Text>

          <View>
            <Text style={styles.label}>Salutation :</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedPronoun}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setSelectedPronoun(itemValue);
                  if (itemValue !== 'Other') {
                    setFormData({...formData, pronoun: itemValue});
                    setCustomPronoun('');
                  }
                }}
              >
                <Picker.Item label="Select Salutation" value="" />
                {pronouns.map((pronoun, index) => (
                  <Picker.Item key={index} label={pronoun} value={pronoun} />
                ))}
              </Picker>
            </View>
            {selectedPronoun === 'Other' && (
              <TextInput
                style={styles.input}
                value={customPronoun}
                onChangeText={(text) => {
                  setCustomPronoun(text);
                  setFormData({...formData, pronoun: text});
                }}
                placeholder="Enter custom pronoun"
                placeholderTextColor="#999"
              />
            )}
          </View>

          {eventDetails.customFormFields.map((field, index) => (
            <View key={index}>
              <Text style={styles.label}>{field.label}{field.isRequired ? ' *' : ''}:</Text>
              <TextInput
                style={styles.input}
                value={formData[field.label] || ''}
                onChangeText={(text) => setFormData({...formData, [field.label]: text})}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                placeholderTextColor="#999"
              />
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateIDCardPDF}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Generating...' : 'Generate ID Card'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  eventNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 45,
    width: '100%',
  },
});

