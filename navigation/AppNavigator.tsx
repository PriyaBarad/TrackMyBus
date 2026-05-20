
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Import your screens
// import LoginScreen from '../Screens/login';
// import RegisterScreen from '../Screens/register';
// import HomeScreen from '../Screens/home'; 
// import BusResultScreen from '../Screens/busResult'; 
// import ForgotPasswordScreen from '../Screens/forgotPassword';
// import ProfileScreen from '../Screens/profile';
// import LanguageSelectionScreen from '../Screens/LanguageScreen';
// import VerticalMap from '../Screens/verticalMap';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="LanguageSelection">
//         <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="BusResult" component={BusResultScreen} options={{ title: 'Bus Results' }} />
//         <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
//         <Stack.Screen name="VerticalMap" component={VerticalMap} options={{ title: 'Route Map' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }





import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from '../Screens/login';
import RegisterScreen from '../Screens/register';
import HomeScreen from '../Screens/home'; 
import BusResultScreen from '../Screens/busResult'; 
import ForgotPasswordScreen from '../Screens/forgotPassword';
import ProfileScreen from '../Screens/profile';
import LanguageSelectionScreen from '../Screens/LanguageScreen';
import VerticalMap from '../Screens/verticalMap';

const Stack = createNativeStackNavigator();

// Renamed to AppNavigator for clarity
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="LanguageSelection">
      <Stack.Screen 
        name="LanguageSelection" 
        component={LanguageSelectionScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
        options={{ title: 'Forgot Password' }} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="BusResult" 
        component={BusResultScreen} 
        options={{ title: 'Bus Results' }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }} 
      />
      <Stack.Screen 
        name="VerticalMap" 
        component={VerticalMap} 
        options={{ title: 'Route Map' }} 
      />
    </Stack.Navigator>
  );
}