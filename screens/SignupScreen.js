import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from "../redux/slice/customerSlice";
import { useNavigation } from '@react-navigation/native';
import UUID from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Ionicons';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const message = useSelector((state) => state.customer.message);
  const [formData, setFormData] = useState({
    customerAccountNumber: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    address: '',
    password: '',
    accountType: 'customer', // Default account type
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accountNumber = UUID.v4();
    setFormData((prevState) => ({
      ...prevState,
      customerAccountNumber: accountNumber,
    }));
  }, []);

  useEffect(() => {
    if (message) {
      console.log('Redux Message:', message);
    }
  }, [message]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { firstName, lastName, contactNumber, address, password, customerAccountNumber, email } = formData;

    if (!firstName || !lastName || !contactNumber || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);

    const finalData = {
      firstName,
      lastName,
      contactNumber,
      address,
      password,
      accountType: 'customer',
      customerAccountNumber,
      email: email || '',
    };

    try {
      console.log('Final Data:', finalData);
      await dispatch(createCustomer(finalData)).unwrap();
      console.log('Registration successful!');
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.replace('Home') }, // Automatically navigate to Home screen
      ]);
    } catch (error) {
   
      Alert.alert("Registration failed.. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image source={require('../assets/frankoIcon.png')} style={styles.logo} />
          <Text style={styles.title}>Register</Text>

          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="First Name"
              style={styles.input}
              onChangeText={(value) => handleChange('firstName', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="person-circle-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={(value) => handleChange('lastName', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="call-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={(value) => handleChange('contactNumber', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="location-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Address"
              style={styles.input}
              onChangeText={(value) => handleChange('address', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              onChangeText={(value) => handleChange('password', value)}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#FF6347" style={styles.loader} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.footerText}>
              Already registered? <Text style={styles.linkText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F1F1F1',
  },
  logo: {
    width: 160,
    height: 90,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006838',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  linkText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
});

export default SignupScreen;
