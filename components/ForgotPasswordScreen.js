import React, { useState } from 'react';
import {  Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';



export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSentResetPasswordLink = async () => {
    const {error } = await supabase.auth.resetPasswordForEmail(email,{
      redirectTo: 'http://localhost:3000/auth/callback?redirect_to=/protected/reset-password'
    });
    if (error) {
      alert(error.message)
      // TODO: Add new throw message here 
    }
    else {
      alert('Password reset instructions sent to your email.')
      navigation.navigate('EventCreatorAuth');
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
      />
      <Pressable onPress={() => handleSentResetPasswordLink()} style={styles.button} ><Text>Submit</Text></Pressable> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    marginTop: 20,
    color: '#007AFF',
    textAlign: 'center',
  },
});