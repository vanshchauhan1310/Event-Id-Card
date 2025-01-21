import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function ScanQRCodeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState({ eventLogo: false, organisationLogo: false });

  const route = useRoute();
  const { eventName, eventLogo, organisationLogo } = route.params || {};

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setLoading(true);
    try {
      const parsedData = JSON.parse(data);
      console.log('Parsed QR Code data:', parsedData);
      setScannedData({
        ...parsedData,
        eventName: eventName || parsedData.eventName,
        eventLogo: eventLogo || parsedData.eventLogo,
        organisationLogo: organisationLogo || parsedData.organisationLogo,
      });
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      alert('Invalid QR code data');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setImageLoading({ eventLogo: false, organisationLogo: false });
  };

  const handleLinkPress = (type, value) => {
    let url;
    switch (type) {
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'phone':
        url = `tel:${value}`;
        break;
      case 'linkedin':
        url = value.startsWith('http') ? value : `https://${value}`;
        break;
      default:
        return;
    }
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Processing QR Code...</Text>
        </View>
      )}

      {scannedData && (
        <ScrollView style={styles.scannedDataContainer}>
          <View style={styles.card}>
            <View style={styles.headerContainer}>
              {scannedData.eventLogo && (
                <Image
                  source={{ uri: scannedData.eventLogo }}
                  style={styles.logo}
                  onLoadStart={() => setImageLoading(prev => ({ ...prev, eventLogo: true }))}
                  onLoadEnd={() => setImageLoading(prev => ({ ...prev, eventLogo: false }))}
                  onError={(e) => console.error('Error loading event logo:', e.nativeEvent.error)}
                />
              )}
              {scannedData.organisationLogo && (
                <Image
                  source={{ uri: scannedData.organisationLogo }}
                  style={styles.logo}
                  onLoadStart={() => setImageLoading(prev => ({ ...prev, organisationLogo: true }))}
                  onLoadEnd={() => setImageLoading(prev => ({ ...prev, organisationLogo: false }))}
                  onError={(e) => console.error('Error loading organisation logo:', e.nativeEvent.error)}
                />
              )}
              {(imageLoading.eventLogo || imageLoading.organisationLogo) && (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
            </View>
            
            {scannedData.eventName && (
              <Text style={styles.eventNameText}>{scannedData.eventName}</Text>
            )}

            <View style={styles.cardContainer}>
              {Object.entries(scannedData).map(([key, value]) => {
                if (key !== 'eventLogo' && key !== 'organisationLogo' && key !== 'eventName') {
                  let content;
                  if (key.toLowerCase().includes('email') || key.toLowerCase().includes('phone') || key.toLowerCase().includes('linkedin')) {
                    content = (
                      <TouchableOpacity onPress={() => handleLinkPress(key.toLowerCase(), value)}>
                        <Text style={[styles.infoText, styles.link]} numberOfLines={1} ellipsizeMode="tail">{value}</Text>
                      </TouchableOpacity>
                    );
                  } else {
                    content = <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">{value}</Text>;
                  }
                  return (
                    <View key={key} style={styles.infoRow}>
                      <Text style={styles.infoLabel}>{key}:</Text>
                      {content}
                    </View>
                  );
                }
                return null;
              })}
            </View>

            <TouchableOpacity onPress={resetScanner} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Scan Another QR Code</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  scannedDataContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    maxHeight: '80%',
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
  },
  eventNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    width: '40%',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    width: '60%',
  },
  link: {
    color: '#007AFF',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});