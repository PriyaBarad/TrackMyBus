import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Custom Icon component using emoji/unicode (replaces MaterialIcons)
const Icon = ({ name, size, color, style }: any) => {
  const getIconChar = () => {
    switch(name) {
      case 'person': return '👤';
      case 'phone': return '📱';
      case 'lock': return '🔒';
      case 'lock-outline': return '🔐';
      case 'visibility-off': return '👁️‍🗨️';
      case 'visibility': return '👁️';
      default: return '•';
    }
  };

  return (
    <Text style={[style, { fontSize: size, color: color }]}>
      {getIconChar()}
    </Text>
  );
};

// Custom Header component
const Header = () => {
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>Register</Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
  },
});

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);

  // Inline strings based on language (no external file needed)
  const getString = (key: string) => {
    const strings = {
      en: {
        tagline: 'Track your ride live, anytime!',
        fullName: 'Full Name',
        phoneNumber: 'Phone Number',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        createButton: 'Create Account',
        alreadyRegistered: 'Already have an account?',
        signIn: 'Sign In',
      },
      mr: {
        tagline: 'तुमची बस कधीही ट्रॅक करा!',
        fullName: 'पूर्ण नाव',
        phoneNumber: 'फोन नंबर',
        password: 'पासवर्ड',
        confirmPassword: 'पासवर्ड पुष्टी करा',
        createButton: 'खाते तयार करा',
        alreadyRegistered: 'आधीच खाते आहे?',
        signIn: 'साइन इन करा',
      },
    };
    return strings[lang][key as keyof typeof strings.en];
  };

  useEffect(() => {
    const getLanguage = async () => {
      const storedLang = await AsyncStorage.getItem('language');
      setLang(storedLang === 'mr' ? 'mr' : 'en');
    };
    getLanguage();
  }, []);

  const handleRegister = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[789]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    if (!fullName || !phoneNumber || !password || !confirmPassword) {
      Alert.alert(
        lang === 'mr' ? 'कृपया सर्व माहिती भरा' : 'Please fill in all fields',
        '',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (!nameRegex.test(fullName)) {
      Alert.alert(
        lang === 'mr' ? 'पूर्ण नाव फक्त अक्षरे असावे' : 'Full name should only contain letters',
        '',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert(
        lang === 'mr'
          ? 'फोन नंबर ७, ८ किंवा ९ ने सुरु होणारा आणि १० अंकी असावा'
          : 'Phone number must start with 7, 8, or 9 and be 10 digits long',
        '',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        lang === 'mr'
          ? 'पासवर्डमध्ये एक मोठा अक्षर, एक विशेष चिन्ह आणि एक लहान अक्षर असावे'
          : 'Password must include at least one uppercase letter, one special character, and one lowercase letter',
        '',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        lang === 'mr' ? 'पासवर्ड जुळत नाहीत' : 'Passwords do not match',
        '',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    setIsLoading(true);
    try {
      const API_URL = 'http://10.16.129.52:5000/api/users/register';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, phone: phoneNumber, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (response.ok) {
        setFullName('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');

        Alert.alert(
          lang === 'mr' ? 'नोंदणी यशस्वी झाली' : 'Registration Successful',
          lang === 'mr' ? 'आपले खाते लॉगिन करा' : 'Please login to your account',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login' as never),
            },
          ]
        );
      } else if (data?.message?.includes('exists')) {
        Alert.alert(
          lang === 'mr' ? 'हा वापरकर्ता आधीच नोंदणीकृत आहे' : 'This user already exists',
          '',
          [{ text: 'OK', style: 'default' }]
        );
      } else {
        Alert.alert(
          lang === 'mr' ? 'नोंदणी अयशस्वी' : 'Registration Failed',
          data?.message || (lang === 'mr' ? 'कृपया पुन्हा प्रयत्न करा' : 'Please try again'),
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      Alert.alert(
        lang === 'mr' ? 'सर्व्हर त्रुटी' : 'Server Error',
        lang === 'mr' ? 'कृपया नेटवर्क तपासा' : 'Please check your network',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Header />
          
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../assets/images/smt-logo.png')}
                  style={styles.logo}
                />
                <Text style={styles.title}>Track My Bus</Text>
              </View>

              <Text style={styles.subtitle}>
                {getString('tagline')}
              </Text>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Icon
                    name="person"
                    size={20}
                    color="#6C63FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={getString('fullName')}
                    placeholderTextColor="#adb5bd"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon
                    name="phone"
                    size={20}
                    color="#6C63FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={getString('phoneNumber')}
                    placeholderTextColor="#adb5bd"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon
                    name="lock"
                    size={20}
                    color="#6C63FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={getString('password')}
                    placeholderTextColor="#adb5bd"
                    secureTextEntry={secureEntry}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setSecureEntry(!secureEntry)}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name={secureEntry ? "visibility-off" : "visibility"}
                      size={20}
                      color="#adb5bd"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Icon
                    name="lock-outline"
                    size={20}
                    color="#6C63FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={getString('confirmPassword')}
                    placeholderTextColor="#adb5bd"
                    secureTextEntry={secureConfirmEntry}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setSecureConfirmEntry(!secureConfirmEntry)}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name={secureConfirmEntry ? "visibility-off" : "visibility"}
                      size={20}
                      color="#adb5bd"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleRegister}
                  disabled={isLoading}
                  activeOpacity={0.7}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      {getString('createButton')}
                    </Text>
                  )}
                </TouchableOpacity>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    {getString('alreadyRegistered')}
                  </Text>
                  <TouchableOpacity onPress={goToLogin}>
                    <Text style={styles.footerLink}>
                      {getString('signIn')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    width: width > 500 ? 450 : '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  content: {
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#495057',
    marginTop: 15,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#495057',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 5,
  },
  footerLink: {
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: 15,
  },
});