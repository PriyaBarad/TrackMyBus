import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Animated,
  Easing,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Buffer } from 'buffer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Set up Buffer globally if not already available
declare var global: any;
global.Buffer = global.Buffer || Buffer;

// Enhanced constants with more options
const COLORS = {
  primary: '#0066CC',
  primaryDark: '#0052A3',
  background: '#F8F9FA',
  white: '#FFFFFF',
  text: '#212529',
  textSecondary: '#6C757D',
  shadow: 'rgba(0, 0, 0, 0.08)',
  border: '#E9ECEF',
  success: '#28A745',
};

const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

const FONT_SIZE = {
  small: 14,
  regular: 16,
  large: 20,
  xlarge: 24,
};

const BUILD_VERSION = "1.0.0";
const BUILD_DATE = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

type LanguageOption = 'en' | 'mr';

const LANGUAGES = [
  { code: 'en', name: 'English', icon: 'language' },
  { code: 'mr', name: 'मराठी', textIcon: 'म' },
];

export default function LanguageScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const handleLanguageSelect = async (language: LanguageOption) => {
    setSelectedLanguage(language);
    setLoading(true);

    // Animation when language is selected
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    try {
      // Simulate network delay for better UX
      await Promise.all([
        AsyncStorage.setItem('language', language),
        new Promise<void>(resolve => setTimeout(() => resolve(), 800)), // Minimum loading time
      ]);

      navigation.replace('Login');
    } catch (error) {
      console.error('Failed to save language preference:', error);
      setLoading(false);
      setSelectedLanguage(null);
      animation.setValue(0);
    }
  };

  const buttonScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require('../assets/images/smt-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Track My Bus</Text>
          <Text style={styles.subtitle}>Choose language to continue{'\n'}भाषा निवडा</Text>

          <View style={styles.buttonContainer}>
            {LANGUAGES.map((lang) => (
              <Animated.View
                key={lang.code}
                style={[
                  selectedLanguage === lang.code && styles.selectedButton,
                  { transform: [{ scale: selectedLanguage === lang.code ? buttonScale : 1 }] }
                ]}
              >
                <LanguageButton
                  language={lang.name}
                  icon={lang.icon}
                  textIcon={lang.textIcon}
                  selected={selectedLanguage === lang.code}
                  loading={loading && selectedLanguage === lang.code}
                  onPress={() => handleLanguageSelect(lang.code as LanguageOption)}
                />
              </Animated.View>
            ))}
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.loadingText}>Setting up your experience...</Text>
            </View>
          )}
        </View>

        <Text style={styles.versionText}>App Version {BUILD_VERSION} (Build: {BUILD_DATE})</Text>
        {/* <Text style={styles.footerText}>You can change this later in settings</Text> */}
        <Text style={styles.poweredByText}>Powered by MIT Vishwaprayag University, Solapur</Text>
      </View>
    </SafeAreaView>
  );
}

interface LanguageButtonProps {
  language: string;
  icon?: string;
  textIcon?: string;
  selected: boolean;
  loading: boolean;
  onPress: () => void;
}

const LanguageButton = ({ language, icon, textIcon, selected, loading, onPress }: LanguageButtonProps) => (
  <TouchableOpacity
    style={[
      styles.languageButton,
      selected && styles.languageButtonSelected,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator size="small" color={COLORS.white} />
    ) : (
      <>
        {textIcon ? (
          <Text style={[
            styles.textIcon,
            selected && styles.textIconSelected,
          ]}>
            {textIcon}
          </Text>
        ) : icon ? (
          <MaterialIcons
            name={icon as any}
            size={20}
            color={selected ? COLORS.white : COLORS.primary}
            style={styles.buttonIcon}
          />
        ) : null}
        <Text style={[
          styles.languageButtonText,
          selected && styles.languageButtonTextSelected,
        ]}>
          {language}
        </Text>
      </>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.xlarge,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.xlarge,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logo: {
    width: 150,        // set width
    height: 150,       // set height
    borderRadius: 50,  // half of width/height for a perfect circle

  },
  title: {
    fontSize: FONT_SIZE.xlarge,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.large,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: SPACING.medium,
  },
  selectedButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  languageButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.medium,
    borderRadius: 8,
    width: '100%',
    marginBottom: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  languageButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  buttonIcon: {
    marginRight: SPACING.small,
  },
  textIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SPACING.small,
  },
  textIconSelected: {
    color: COLORS.white,
  },
  languageButtonText: {
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: FONT_SIZE.regular,
  },
  languageButtonTextSelected: {
    color: COLORS.white,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.small,
  },
  loadingText: {
    marginLeft: SPACING.small,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.small,
  },
  versionText: {
    marginTop: SPACING.medium,
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  footerText: {
    marginTop: SPACING.small,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.small,
    textAlign: 'center',
  },
  poweredByText: {
    marginTop: SPACING.small,
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});
