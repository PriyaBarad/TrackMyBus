// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import { useNavigation, CommonActions } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Custom Icon component using emoji/unicode
// const Icon = ({ name, size, style }: any) => {
//   const getIconChar = () => {
//     switch(name) {
//       case 'home': return '🏠';
//       case 'profile': return '👤';
//       case 'language': return '🌐';
//       case 'password': return '🔑';
//       case 'logout': return '🔒';
//       default: return '•';
//     }
//   };

//   return (
//     <Text style={[style, { fontSize: size }]}>
//       {getIconChar()}
//     </Text>
//   );
// };

// export default function ProfileScreen() {
//   const navigation = useNavigation();
//   const [lang, setLang] = useState<'en' | 'mr'>('en');
//   const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

//   // Inline strings based on language
//   const getString = (key: string) => {
//     const strings = {
//       en: {
//         home: 'Home',
//         profile: 'Profile',
//         changeLanguage: 'Change Language to Marathi',
//         changePassword: 'Change Password',
//         logout: 'Logout',
//         nameNotAvailable: 'Name not available',
//         phoneNotAvailable: 'Phone not available',
//       },
//       mr: {
//         home: 'मुख्यपृष्ठ',
//         profile: 'प्रोफाइल',
//         changeLanguage: 'इंग्रजीमध्ये बदला',
//         changePassword: 'पासवर्ड बदला',
//         logout: 'लॉगआउट',
//         nameNotAvailable: 'नाव उपलब्ध नाही',
//         phoneNotAvailable: 'फोन उपलब्ध नाही',
//       },
//     };
//     return strings[lang][key as keyof typeof strings.en];
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       const langStored = await AsyncStorage.getItem('language');
//       setLang(langStored === 'mr' ? 'mr' : 'en');

//       const userData = await AsyncStorage.getItem('user');
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     };
//     loadData();
//   }, []);

//   const toggleLanguage = async () => {
//     const newLang = lang === 'en' ? 'mr' : 'en';
//     await AsyncStorage.setItem('language', newLang);
//     setLang(newLang);
//   };

//   const handleLogout = async () => {
//     Alert.alert(
//       lang === 'mr' ? 'लॉगआउट' : 'Logout',
//       lang === 'mr' ? 'तुम्हाला खात्री आहे?' : 'Are you sure?',
//       [
//         { text: lang === 'mr' ? 'रद्द करा' : 'Cancel', style: 'cancel' },
//         {
//           text: lang === 'mr' ? 'लॉगआउट' : 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await AsyncStorage.removeItem('user');
//               await AsyncStorage.removeItem('userLoggedIn');
//               // Reset navigation stack and go to Language screen
//               navigation.dispatch(
//                 CommonActions.reset({
//                   index: 0,
//                   routes: [{ name: 'Language' }],
//                 })
//               );
//             } catch (error) {
//               console.error('Logout error:', error);
//               Alert.alert('Error', 'Failed to logout. Please try again.');
//             }
//           },
//         },
//       ]
//     );
//   };

//    const handleChangePassword = () => {
//     // Use navigate with proper params
//     (navigation as any).navigate('ForgotPassword', {
//       mode: 'change',
//       phone: user?.phone || '',
//     });
//   };

//   const goToHome = () => {
//     navigation.navigate('Home' as never);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.card}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={goToHome}
//             style={styles.backButton}
//             activeOpacity={0.7}
//           >
//             <Icon name="home" size={16} style={styles.backIcon} />
//             <Text style={styles.backText}>{getString('home')}</Text>
//           </TouchableOpacity>
//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>{getString('profile')}</Text>
//           </View>
//         </View>

//         {/* Profile Section */}
//         <View style={styles.profileSection}>
//           <View style={styles.avatarCircle}>
//             <Icon name="profile" size={60} style={styles.profileIcon} />
//           </View>
//           <View style={styles.userInfo}>
//             <Text style={styles.nameText}>{user?.name || getString('nameNotAvailable')}</Text>
//             <Text style={styles.phoneText}>{user?.phone || getString('phoneNotAvailable')}</Text>
//           </View>
//         </View>

//         {/* Actions */}
//         <View style={styles.actionsContainer}>
//           {/* Language Toggle */}
//           <TouchableOpacity
//             style={styles.langBtn}
//             onPress={toggleLanguage}
//             activeOpacity={0.85}
//           >
//             <Icon name="language" size={20} style={styles.btnIcon} />
//             <Text style={styles.langBtnText}>
//               {getString('changeLanguage')}
//             </Text>
//           </TouchableOpacity>

//           {/* Change Password */}
//           <TouchableOpacity
//             style={styles.changePassBtn}
//             onPress={handleChangePassword}
//             activeOpacity={0.85}
//           >
//             <Icon name="password" size={20} style={styles.btnIcon} />
//             <Text style={styles.changePassText}>{getString('changePassword')}</Text>
//           </TouchableOpacity>

//           {/* Logout */}
//           <TouchableOpacity
//             style={styles.logoutBtn}
//             onPress={handleLogout}
//             activeOpacity={0.85}
//           >
//             <Icon name="logout" size={20} style={styles.btnIcon} />
//             <Text style={styles.logoutText}>{getString('logout')}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eef2f7',
//     paddingTop: 50,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     width: '90%',
//     maxWidth: 400,
//     padding: 25,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.08,
//     shadowRadius: 16,
//     elevation: 6,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 25,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e2e8f0',
//     paddingBottom: 15,
//     width: '100%',
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: '#f1f5f9',
//   },
//   backIcon: {
//     marginRight: 4,
//   },
//   backText: {
//     fontSize: 16,
//     color: '#2563eb',
//     fontWeight: '600',
//   },
//   titleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     marginRight: 40,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#0f172a',
//     textAlign: 'center',
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 30,
//     width: '100%',
//   },
//   avatarCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#e0f2fe',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     shadowColor: '#38bdf8',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   profileIcon: {
//     fontSize: 60,
//   },
//   userInfo: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   nameText: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#0f172a',
//     marginBottom: 6,
//     textAlign: 'center',
//   },
//   phoneText: {
//     fontSize: 16,
//     color: '#64748b',
//     textAlign: 'center',
//   },
//   actionsContainer: {
//     width: '100%',
//     marginTop: 10,
//   },
//   langBtn: {
//     flexDirection: 'row',
//     backgroundColor: '#f8fafc',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     marginBottom: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#94a3b8',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   langBtnText: {
//     color: '#334155',
//     fontWeight: '600',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   changePassBtn: {
//     flexDirection: 'row',
//     backgroundColor: '#f0fdf4',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#bbf7d0',
//     marginBottom: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#22c55e',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//   },
//   changePassText: {
//     color: '#166534',
//     fontWeight: '700',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   logoutBtn: {
//     flexDirection: 'row',
//     backgroundColor: '#2563eb',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
//   logoutText: {
//     color: '#ffffff',
//     fontWeight: '700',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   btnIcon: {
//     marginRight: 8,
//   },
// });




import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Icon = ({ name, size, style }: any) => {
  const getIconChar = () => {
    switch(name) {
      case 'home': return '🏠';
      case 'profile': return '👤';
      case 'language': return '🌐';
      case 'password': return '🔑';
      case 'logout': return '🔒';
      default: return '•';
    }
  };
  return <Text style={[style, { fontSize: size }]}>{getIconChar()}</Text>;
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  const getString = (key: string) => {
    const strings = {
      en: {
        home: 'Home',
        profile: 'Profile',
        changeLanguage: 'Change Language to Marathi',
        changePassword: 'Change Password',
        logout: 'Logout',
        nameNotAvailable: 'Name not available',
        phoneNotAvailable: 'Phone not available',
      },
      mr: {
        home: 'मुख्यपृष्ठ',
        profile: 'प्रोफाइल',
        changeLanguage: 'इंग्रजीमध्ये बदला',
        changePassword: 'पासवर्ड बदला',
        logout: 'लॉगआउट',
        nameNotAvailable: 'नाव उपलब्ध नाही',
        phoneNotAvailable: 'फोन उपलब्ध नाही',
      },
    };
    return strings[lang][key as keyof typeof strings.en];
  };

  useEffect(() => {
    const loadData = async () => {
      const langStored = await AsyncStorage.getItem('language');
      setLang(langStored === 'mr' ? 'mr' : 'en');
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
    };
    loadData();
  }, []);

  const toggleLanguage = async () => {
    const newLang = lang === 'en' ? 'mr' : 'en';
    await AsyncStorage.setItem('language', newLang);
    setLang(newLang);
  };

  const handleLogout = async () => {
    Alert.alert(
      lang === 'mr' ? 'लॉगआउट' : 'Logout',
      lang === 'mr' ? 'तुम्हाला खात्री आहे?' : 'Are you sure?',
      [
        { text: lang === 'mr' ? 'रद्द करा' : 'Cancel', style: 'cancel' },
        {
          text: lang === 'mr' ? 'लॉगआउट' : 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('userLoggedIn');
              // ✅ Navigate to Login (not Language)
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleChangePassword = () => {
    (navigation as any).navigate('ForgotPassword', {
      mode: 'change',
      phone: user?.phone || '',
    });
  };

  const goToHome = () => navigation.navigate('Home' as never);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToHome} style={styles.backButton} activeOpacity={0.7}>
            <Icon name="home" size={16} style={styles.backIcon} />
            <Text style={styles.backText}>{getString('home')}</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{getString('profile')}</Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <Icon name="profile" size={60} style={styles.profileIcon} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.nameText}>{user?.name || getString('nameNotAvailable')}</Text>
            <Text style={styles.phoneText}>{user?.phone || getString('phoneNotAvailable')}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.langBtn} onPress={toggleLanguage} activeOpacity={0.85}>
            <Icon name="language" size={20} style={styles.btnIcon} />
            <Text style={styles.langBtnText}>{getString('changeLanguage')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changePassBtn} onPress={handleChangePassword} activeOpacity={0.85}>
            <Icon name="password" size={20} style={styles.btnIcon} />
            <Text style={styles.changePassText}>{getString('changePassword')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
            <Icon name="logout" size={20} style={styles.btnIcon} />
            <Text style={styles.logoutText}>{getString('logout')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2f7', paddingTop: 50 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 15,
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  backIcon: { marginRight: 4 },
  backText: { fontSize: 16, color: '#2563eb', fontWeight: '600' },
  titleContainer: { flex: 1, alignItems: 'center', marginRight: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a', textAlign: 'center' },
  profileSection: { alignItems: 'center', marginBottom: 30, width: '100%' },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  profileIcon: { fontSize: 60 },
  userInfo: { alignItems: 'center', width: '100%' },
  nameText: { fontSize: 22, fontWeight: '700', color: '#0f172a', marginBottom: 6, textAlign: 'center' },
  phoneText: { fontSize: 16, color: '#64748b', textAlign: 'center' },
  actionsContainer: { width: '100%', marginTop: 10 },
  langBtn: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#94a3b8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  langBtnText: { color: '#334155', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  changePassBtn: {
    flexDirection: 'row',
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  changePassText: { color: '#166534', fontWeight: '700', fontSize: 16, marginLeft: 8 },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoutText: { color: '#ffffff', fontWeight: '700', fontSize: 16, marginLeft: 8 },
  btnIcon: { marginRight: 8 },
});