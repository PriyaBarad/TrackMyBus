// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   StatusBar,
//   ActivityIndicator,
//   Dimensions,
//   Image,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width } = Dimensions.get('window');

// type RootStackParamList = {
//   Language: undefined;
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
//   BusResult: { source: string; destination: string };
//   Profile: undefined;
// };

// const Icon = ({ name, size, color, style }: any) => {
//   const getIconChar = () => {
//     switch(name) {
//       case 'account-circle': return '👤';
//       case 'calendar-today': return '📅';
//       case 'search': return '🔍';
//       case 'location-on': return '📍';
//       case 'location-off': return '🚫';
//       case 'directions-bus': return '🚌';
//       default: return '•';
//     }
//   };
//   return (
//     <Text style={[style, { fontSize: size, color: color }]}>
//       {getIconChar()}
//     </Text>
//   );
// };

// function getTodayDate() {
//   const today = new Date();
//   return today.toLocaleDateString('en-IN', {
//     weekday: 'long',
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//   });
// }

// export default function HomeScreen() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [lang, setLang] = useState<'en' | 'mr'>('en');
//   const [routesData, setRoutesData] = useState<{ source: string; destination: string }[]>([]);
//   const [availableSources, setAvailableSources] = useState<string[]>([]);
//   const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingSources, setLoadingSources] = useState(true);

//   const getString = (key: string) => {
//     const strings = {
//       en: {
//         appTitle: 'Track My Bus',
//         corporation: 'Solapur Municipal Corporation',   // ✅ Changed
//         findBus: 'Find Your Bus',
//         source: 'Source',
//         destination: 'Destination',
//         selectSource: 'Select Source',
//         selectDestination: 'Select Destination',
//         findBuses: 'Find Buses',
//         fillBoth: 'Please select both source and destination',
//         loadingRoutes: 'Loading routes...',
//       },
//       mr: {
//         appTitle: 'बस ट्रॅक करा',
//         corporation: 'सोलापूर महानगरपालिका',           // ✅ Changed
//         findBus: 'तुमची बस शोधा',
//         source: 'स्रोत',
//         destination: 'गंतव्य',
//         selectSource: 'स्रोत निवडा',
//         selectDestination: 'गंतव्य निवडा',
//         findBuses: 'बस शोधा',
//         fillBoth: 'कृपया स्रोत आणि गंतव्य निवडा',
//         loadingRoutes: 'मार्ग लोड होत आहेत...',
//       },
//     };
//     return strings[lang][key as keyof typeof strings.en];
//   };

//   useEffect(() => {
//     const fetchRoutesAndLanguage = async () => {
//       try {
//         const storedLang = await AsyncStorage.getItem('language');
//         setLang(storedLang === 'mr' ? 'mr' : 'en');

//         const res = await fetch('http://172.16.146.52:5000/api/routes/all');
//         const data: { source: string; destination: string }[] = await res.json();

//         setRoutesData(data);
//         const sources = Array.from(new Set(data.map((r) => r.source))).sort();
//         setAvailableSources(sources);
//         setLoadingSources(false);
//       } catch (err) {
//         console.error('❌ Error fetching routes:', err);
//         setAvailableSources([]);
//         setRoutesData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRoutesAndLanguage();
//   }, []);

//   useEffect(() => {
//     if (source) {
//       const destinations = routesData
//         .filter((route) => route.source === source)
//         .map((route) => route.destination);
//       const uniqueDestinations = Array.from(new Set(destinations)).sort();
//       setFilteredDestinations(uniqueDestinations);
//       setDestination('');
//     } else {
//       setFilteredDestinations([]);
//       setDestination('');
//     }
//   }, [source, routesData]);

//   const handleFindBuses = () => {
//     if (!source || !destination || source === destination) {
//       Alert.alert(getString('fillBoth'), '', [{ text: 'OK', style: 'default' }]);
//       return;
//     }
//     navigation.navigate('BusResult', { source, destination });
//   };

//   const goToProfile = () => navigation.navigate('Profile');

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <StatusBar backgroundColor="#1a73e8" barStyle="light-content" />
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#1a73e8" />
//           <Text style={styles.loadingText}>{getString('loadingRoutes')}</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#1a73e8" barStyle="light-content" />
//       <View style={styles.container}>
//         <View style={styles.card}>

//           {/* Profile button top-right */}
//           <TouchableOpacity
//             style={styles.profileButton}
//             onPress={goToProfile}
//             activeOpacity={0.7}
//           >
//             <Icon name="account-circle" size={28} color="#1a73e8" />
//           </TouchableOpacity>

//           {/* Header: Title → Logo centered below → subtitle → date */}
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>{getString('appTitle')}</Text>

//             {/* ✅ Logo centered below title */}
//             <Image
//               source={require('../assets/images/smt-logo.png')}
//               style={styles.centerLogo}
//               resizeMode="cover"
//             />

//             <Text style={styles.subtitle}>{getString('corporation')}</Text>

//             <View style={styles.dateContainer}>
//               <Icon name="calendar-today" size={16} color="#1a73e8" />
//               <Text style={styles.date}>{getTodayDate()}</Text>
//             </View>
//           </View>

//           {/* Form */}
//           <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>
//               <Icon name="search" size={22} color="#1a73e8" /> {getString('findBus')}
//             </Text>

//             {/* Source */}
//             <View style={styles.inputContainer}>
//               <View style={styles.labelContainer}>
//                 <Icon name="location-on" size={18} color="#5f6368" />
//                 <Text style={styles.label}>{getString('source')}</Text>
//               </View>
//               {loadingSources ? (
//                 <View style={styles.loadingPicker}>
//                   <ActivityIndicator color="#1a73e8" />
//                 </View>
//               ) : (
//                 <View style={styles.pickerContainer}>
//                   <Picker
//                     selectedValue={source}
//                     onValueChange={(value) => setSource(value)}
//                     style={styles.picker}
//                     dropdownIconColor="#5f6368"
//                   >
//                     <Picker.Item label={getString('selectSource')} value="" style={styles.placeholderItem} />
//                     {availableSources.map((src) => (
//                       <Picker.Item key={src} label={src} value={src} />
//                     ))}
//                   </Picker>
//                 </View>
//               )}
//             </View>

//             {/* Destination */}
//             <View style={styles.inputContainer}>
//               <View style={styles.labelContainer}>
//                 <Icon name="location-off" size={18} color="#5f6368" />
//                 <Text style={styles.label}>{getString('destination')}</Text>
//               </View>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={destination}
//                   onValueChange={(value) => setDestination(value)}
//                   style={styles.picker}
//                   enabled={filteredDestinations.length > 0}
//                   dropdownIconColor="#5f6368"
//                 >
//                   <Picker.Item
//                     label={filteredDestinations.length === 0 ? getString('selectSource') : getString('selectDestination')}
//                     value=""
//                     style={styles.placeholderItem}
//                   />
//                   {filteredDestinations.map((dst) => (
//                     <Picker.Item key={dst} label={dst} value={dst} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             <TouchableOpacity
//               style={[styles.findButton, (!source || !destination) && styles.disabledButton]}
//               onPress={handleFindBuses}
//               disabled={!source || !destination}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.findButtonText}>
//                 <Icon name="directions-bus" size={20} color="#fff" /> {getString('findBuses')}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <Text style={styles.footer}>© 2025 {getString('corporation')}</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#1a73e8' },
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     alignItems: 'center',
//     paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 24,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//     width: width > 500 ? 450 : '90%',
//     position: 'relative',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1a73e8',
//     textAlign: 'center',
//     marginBottom: 12,   // space between title and logo
//   },
//   // ✅ New centered logo style
//   centerLogo: {
//     width: 150,
//     height: 150,
//     // borderRadius: 36,
//     // marginBottom: 12,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#5f6368',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e8f0fe',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 12,
//   },
//   date: {
//     fontSize: 13,
//     color: '#1a73e8',
//     fontWeight: '500',
//     marginLeft: 6,
//   },
//   formContainer: { width: '100%' },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#202124',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputContainer: { marginBottom: 20 },
//   labelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
//   label: { fontSize: 15, color: '#3c4043', fontWeight: '500', marginLeft: 6 },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#dadce0',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   picker: { width: '100%', height: 50, color: '#202124', backgroundColor: '#fff' },
//   placeholderItem: { color: '#9aa0a6' },
//   findButton: {
//     backgroundColor: '#1a73e8',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//     shadowColor: '#1a73e8',
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 4,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   disabledButton: { backgroundColor: '#9ab4e0' },
//   findButtonText: { color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 8 },
//   profileButton: { position: 'absolute', top: 16, right: 16, zIndex: 10 },
//   footer: { fontSize: 12, color: '#5f6368', marginTop: 'auto', marginBottom: 16 },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
//   loadingText: { marginTop: 16, fontSize: 16, color: '#1a73e8' },
//   loadingPicker: {
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f1f3f4',
//     borderRadius: 8,
//   },
// });




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Language: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  BusResult: { source: string; destination: string };
  Profile: undefined;
};

const Icon = ({ name, size, color, style }: any) => {
  const getIconChar = () => {
    switch(name) {
      case 'account-circle': return '👤';
      case 'calendar-today': return '📅';
      case 'search': return '🔍';
      case 'location-on': return '📍';
      case 'location-off': return '🚫';
      case 'directions-bus': return '🚌';
      default: return '•';
    }
  };
  return (
    <Text style={[style, { fontSize: size, color: color }]}>
      {getIconChar()}
    </Text>
  );
};

function getTodayDate() {
  const today = new Date();
  return today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [routesData, setRoutesData] = useState<{ source: string; destination: string }[]>([]);
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSources, setLoadingSources] = useState(true);

  const getString = (key: string) => {
    const strings = {
      en: {
        appTitle: 'Track My Bus',
        corporation: 'Solapur Municipal Corporation',
        findBus: 'Find Your Bus',
        source: 'Source',
        destination: 'Destination',
        selectSource: 'Select Source',
        selectDestination: 'Select Destination',
        findBuses: 'Find Buses',
        fillBoth: 'Please select both source and destination',
        loadingRoutes: 'Loading routes...',
      },
      mr: {
        appTitle: 'बस ट्रॅक करा',
        corporation: 'सोलापूर महानगरपालिका',
        findBus: 'तुमची बस शोधा',
        source: 'स्रोत',
        destination: 'गंतव्य',
        selectSource: 'स्रोत निवडा',
        selectDestination: 'गंतव्य निवडा',
        findBuses: 'बस शोधा',
        fillBoth: 'कृपया स्रोत आणि गंतव्य निवडा',
        loadingRoutes: 'मार्ग लोड होत आहेत...',
      },
    };
    return strings[lang][key as keyof typeof strings.en];
  };

  useEffect(() => {
    const fetchRoutesAndLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('language');
        setLang(storedLang === 'mr' ? 'mr' : 'en');

        const res = await fetch('http://10.16.129.52:5000/api/routes/all');
        const data: { source: string; destination: string }[] = await res.json();

        setRoutesData(data);
        const sources = Array.from(new Set(data.map((r) => r.source))).sort();
        setAvailableSources(sources);
        setLoadingSources(false);
      } catch (err) {
        console.error('❌ Error fetching routes:', err);
        setAvailableSources([]);
        setRoutesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutesAndLanguage();
  }, []);

  useEffect(() => {
    if (source) {
      const destinations = routesData
        .filter((route) => route.source === source)
        .map((route) => route.destination);
      const uniqueDestinations = Array.from(new Set(destinations)).sort();
      setFilteredDestinations(uniqueDestinations);
      setDestination('');
    } else {
      setFilteredDestinations([]);
      setDestination('');
    }
  }, [source, routesData]);

  const handleFindBuses = () => {
    if (!source || !destination || source === destination) {
      Alert.alert(getString('fillBoth'), '', [{ text: 'OK', style: 'default' }]);
      return;
    }
    navigation.navigate('BusResult', { source, destination });
  };

  const goToProfile = () => navigation.navigate('Profile');

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#1a73e8" barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a73e8" />
          <Text style={styles.loadingText}>{getString('loadingRoutes')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a73e8" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.card}>

          {/* Profile button top-right */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={goToProfile}
            activeOpacity={0.7}
          >
            <Icon name="account-circle" size={28} color="#1a73e8" />
          </TouchableOpacity>

          {/* Header: Logo → Title → Corporation → Date */}
          <View style={styles.headerContainer}>

            {/* ✅ Logo at top, centered */}
            <Image
              source={require('../assets/images/smt-logo.png')}
              style={styles.centerLogo}
              resizeMode="contain"
            />

            {/* ✅ Title below logo */}
            <Text style={styles.title}>{getString('appTitle')}</Text>

            <Text style={styles.subtitle}>{getString('corporation')}</Text>

            <View style={styles.dateContainer}>
              <Icon name="calendar-today" size={16} color="#1a73e8" />
              <Text style={styles.date}>{getTodayDate()}</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>
              {getString('findBus')}
            </Text>

            {/* Source */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Icon name="location-on" size={18} color="#5f6368" />
                <Text style={styles.label}>{getString('source')}</Text>
              </View>
              {loadingSources ? (
                <View style={styles.loadingPicker}>
                  <ActivityIndicator color="#1a73e8" />
                </View>
              ) : (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={source}
                    onValueChange={(value) => setSource(value)}
                    style={styles.picker}
                    dropdownIconColor="#5f6368"
                  >
                    <Picker.Item label={getString('selectSource')} value="" style={styles.placeholderItem} />
                    {availableSources.map((src) => (
                      <Picker.Item key={src} label={src} value={src} />
                    ))}
                  </Picker>
                </View>
              )}
            </View>

            {/* Destination */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Icon name="location-off" size={18} color="#5f6368" />
                <Text style={styles.label}>{getString('destination')}</Text>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={destination}
                  onValueChange={(value) => setDestination(value)}
                  style={styles.picker}
                  enabled={filteredDestinations.length > 0}
                  dropdownIconColor="#5f6368"
                >
                  <Picker.Item
                    label={filteredDestinations.length === 0 ? getString('selectSource') : getString('selectDestination')}
                    value=""
                    style={styles.placeholderItem}
                  />
                  {filteredDestinations.map((dst) => (
                    <Picker.Item key={dst} label={dst} value={dst} />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.findButton, (!source || !destination) && styles.disabledButton]}
              onPress={handleFindBuses}
              disabled={!source || !destination}
              activeOpacity={0.7}
            >
              <Text style={styles.findButtonText}>
                <Icon name="directions-bus" size={20} color="#fff" /> {getString('findBuses')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>© 2025 {getString('corporation')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a73e8' },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    width: width > 500 ? 450 : '90%',
    position: 'relative',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,        // breathing room from top of card
  },
  centerLogo: {
    width: 150,
    height: 150,
    marginBottom: 8,     // gap between logo and title
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 12,
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  date: {
    fontSize: 13,
    color: '#1a73e8',
    fontWeight: '500',
    marginLeft: 6,
  },
  formContainer: { width: '100%' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: { marginBottom: 20 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 15, color: '#3c4043', fontWeight: '500', marginLeft: 6 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: { width: '100%', height: 50, color: '#202124', backgroundColor: '#fff' },
  placeholderItem: { color: '#9aa0a6' },
  findButton: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#1a73e8',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: { backgroundColor: '#9ab4e0' },
  findButtonText: { color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  profileButton: { position: 'absolute', top: 16, right: 16, zIndex: 10 },
  footer: { fontSize: 12, color: '#5f6368', marginTop: 'auto', marginBottom: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  loadingText: { marginTop: 16, fontSize: 16, color: '#1a73e8' },
  loadingPicker: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: 8,
  },
});