// // import React, { useState, useRef } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ActivityIndicator,
// //   Alert,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// // } from 'react-native';
// // import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
// // import { auth, firebaseConfig } from './firebaseConfig';
// // import { PhoneAuthProvider, signInWithCredential, updatePassword, reauthenticateWithCredential } from 'firebase/auth';

// // // Custom Icon component using emoji/unicode
// // const Icon = ({ name, size, style }: { name: string; size: number; style?: any }) => {
// //   const getIconChar = () => {
// //     switch(name) {
// //       case 'back': return '←';
// //       case 'change': return '🔑';
// //       case 'reset': return '🔓';
// //       case 'locked': return '🔒';
// //       default: return '•';
// //     }
// //   };

// //   return (
// //     <Text style={[style, { fontSize: size }]}>
// //       {getIconChar()}
// //     </Text>
// //   );
// // };

// // // mode = 'forgot' → came from login screen (unauthenticated)
// // // mode = 'change' → came from profile screen (already logged in)
// // type Mode = 'forgot' | 'change';
// // type Step = 'phone' | 'otp' | 'newPassword';

// // // Simple reCAPTCHA verifier modal replacement
// // const RecaptchaVerifierModal = ({ onVerify }: { onVerify: () => Promise<string> }) => {
// //   // In a real implementation, you would use react-native-firebase or a proper reCAPTCHA modal
// //   // This is a simplified version that returns a mock verification ID
// //   const [loading, setLoading] = useState(false);

// //   const verify = async () => {
// //     setLoading(true);
// //     try {
// //       // Simulate reCAPTCHA verification
// //       const mockVerificationId = await onVerify();
// //       return mockVerificationId;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return null;
// // };

// // export default function ForgotPasswordScreen() {
// //   const navigation = useNavigation();
// //   const params = navigation.getState().routes.find(r => r.name === 'ForgotPassword')?.params as { mode?: string; phone?: string } || {};

// //   // 'change' when navigated from Profile, 'forgot' when from Login
// //   const mode: Mode = (params.mode as Mode) || 'forgot';

// //   // Pre-fill phone if coming from profile (pass it as param)
// //   const prefillPhone = params.phone || '';

// //   const [step, setStep] = useState<Step>('phone');
// //   const [phone, setPhone] = useState(prefillPhone);
// //   const [otp, setOtp] = useState(['', '', '', '', '', '']);
// //   const [newPassword, setNewPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [verificationId, setVerificationId] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const otpRefs = useRef<Array<TextInput | null>>([]);

// //   const isChangeMode = mode === 'change';

// //   // Helper to get params from navigation (since useLocalSearchParams is not available)
// //   const getParams = () => {
// //     const routes = navigation.getState().routes;
// //     const currentRoute = routes.find(r => r.name === 'ForgotPassword');
// //     return (currentRoute?.params as { mode?: string; phone?: string }) || {};
// //   };

// //   // ── Step 1: Send OTP ─────────────────────────────────────────────────
// //   const handleSendOtp = async () => {
// //     const trimmed = phone.trim();
// //     if (!trimmed || trimmed.replace(/\D/g, '').length < 10) {
// //       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
// //       return;
// //     }

// //     const fullPhone = trimmed.startsWith('+') ? trimmed : `+91${trimmed.replace(/\D/g, '')}`;

// //     try {
// //       setLoading(true);
// //       // Note: In a real implementation, you need to set up proper reCAPTCHA verification
// //       // For now, we'll simulate with setTimeout
// //       const mockVerificationId = `mock_${Date.now()}`;
// //       setVerificationId(mockVerificationId);
// //       setStep('otp');
// //       Alert.alert('OTP Sent', `A 6-digit code has been sent to ${fullPhone}`);
// //     } catch (error: any) {
// //       Alert.alert('Error', error.message || 'Failed to send OTP. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ── Step 2: Verify OTP ───────────────────────────────────────────────
// //   const handleVerifyOtp = async () => {
// //     const otpCode = otp.join('');
// //     if (otpCode.length !== 6) {
// //       Alert.alert('Incomplete OTP', 'Please enter all 6 digits.');
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       // In a real implementation, verify OTP with Firebase
// //       // For now, accept any 6-digit code as valid for demo
// //       if (otpCode.length === 6) {
// //         setStep('newPassword');
// //       } else {
// //         throw new Error('Invalid OTP');
// //       }
// //     } catch (error: any) {
// //       Alert.alert('Invalid OTP', 'The code you entered is incorrect. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ── Step 3: Set New Password ──
// //   const handleSetNewPassword = async () => {
// //     if (newPassword.length < 6) {
// //       Alert.alert('Weak Password', 'Password must be at least 6 characters.');
// //       return;
// //     }
// //     if (newPassword !== confirmPassword) {
// //       Alert.alert('Mismatch', 'Passwords do not match. Please re-enter.');
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       // Simulate password update
// //       await new Promise(resolve => setTimeout(resolve, 1500));

// //       Alert.alert(
// //         'Password Updated!',
// //         isChangeMode
// //           ? 'Your password has been changed successfully.'
// //           : 'Password reset successful. Please log in.',
// //         [
// //           {
// //             text: 'OK',
// //             onPress: () =>
// //               isChangeMode
// //                 ? (navigation as any).goBack()
// //                 : (navigation as any).navigate('Login'),
// //           },
// //         ]
// //       );
// //     } catch (error: any) {
// //       Alert.alert('Error', error.message || 'Failed to update password. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ── OTP box handlers ─────────────────────────────────────────────────
// //   const handleOtpChange = (value: string, index: number) => {
// //     const updated = [...otp];
// //     updated[index] = value;
// //     setOtp(updated);
// //     if (value && index < 5) otpRefs.current[index + 1]?.focus();
// //   };

// //   const handleOtpKeyPress = (e: any, index: number) => {
// //     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
// //       otpRefs.current[index - 1]?.focus();
// //     }
// //   };

// //   const handleResend = () => {
// //     setOtp(['', '', '', '', '', '']);
// //     setVerificationId('');
// //     setStep('phone');
// //   };

// //   const goBack = () => {
// //     (navigation as any).goBack();
// //   };

// //   // ── Labels based on mode ─────────────────────────────────────────────
// //   const screenTitle = isChangeMode ? 'Change Password' : 'Forgot Password';
// //   const subtitles: Record<Step, string> = {
// //     phone: isChangeMode
// //       ? 'Verify your identity with your registered phone number'
// //       : 'Enter your registered phone number to reset password',
// //     otp: `Enter the 6-digit code sent to +91 ${phone}`,
// //     newPassword: isChangeMode ? 'Set your new password below' : 'Create a new password for your account',
// //   };

// //   const steps: Step[] = ['phone', 'otp', 'newPassword'];
// //   const currentStepIndex = steps.indexOf(step);

// //   // ── Render ────────────────────────────────────────────────────────────
// //   return (
// //     <KeyboardAvoidingView
// //       style={styles.container}
// //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //     >
// //       <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

// //         {/* ── Header ── */}
// //         <View style={styles.header}>
// //           <TouchableOpacity onPress={goBack} style={styles.backButton}>
// //             <Icon name="back" size={20} style={styles.backIcon} />
// //             <Text style={styles.backText}>Back</Text>
// //           </TouchableOpacity>

// //           {/* Mode badge */}
// //           <View style={[styles.modeBadge, isChangeMode ? styles.modeBadgeChange : styles.modeBadgeForgot]}>
// //             <Text style={[styles.modeBadgeText, isChangeMode ? styles.modeBadgeTextChange : styles.modeBadgeTextForgot]}>
// //               {isChangeMode ? '🔑 Change Password' : '🔓 Reset Password'}
// //             </Text>
// //           </View>

// //           <Text style={styles.title}>{screenTitle}</Text>
// //           <Text style={styles.subtitle}>{subtitles[step]}</Text>
// //         </View>

// //         {/* ── Step Progress Indicator ── */}
// //         <View style={styles.stepRow}>
// //           {steps.map((s, i) => {
// //             const isDone = i < currentStepIndex;
// //             const isActive = i === currentStepIndex;
// //             return (
// //               <React.Fragment key={s}>
// //                 <View style={[
// //                   styles.stepDot,
// //                   isActive && styles.stepDotActive,
// //                   isDone && styles.stepDotDone,
// //                 ]}>
// //                   <Text style={[
// //                     styles.stepDotText,
// //                     (isActive || isDone) && styles.stepDotTextActive,
// //                   ]}>
// //                     {isDone ? '✓' : i + 1}
// //                   </Text>
// //                 </View>
// //                 {i < 2 && (
// //                   <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
// //                 )}
// //               </React.Fragment>
// //             );
// //           })}
// //         </View>

// //         {/* ── STEP 1: Phone ── */}
// //         {step === 'phone' && (
// //           <View style={styles.formCard}>
// //             <Text style={styles.label}>Phone Number</Text>
// //             <View style={styles.phoneRow}>
// //               <View style={styles.countryCode}>
// //                 <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
// //               </View>
// //               <TextInput
// //                 style={styles.phoneInput}
// //                 placeholder="10-digit mobile number"
// //                 keyboardType="phone-pad"
// //                 maxLength={10}
// //                 value={phone}
// //                 onChangeText={setPhone}
// //                 placeholderTextColor="#94a3b8"
// //                 editable={!(isChangeMode && prefillPhone !== '')}
// //               />
// //             </View>

// //             {isChangeMode && prefillPhone !== '' && (
// //               <Text style={styles.lockedNote}>
// //                 <Icon name="locked" size={12} style={{ marginRight: 4 }} /> Using your registered number
// //               </Text>
// //             )}

// //             <TouchableOpacity
// //               style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
// //               onPress={handleSendOtp}
// //               disabled={loading}
// //               activeOpacity={0.85}
// //             >
// //               {loading
// //                 ? <ActivityIndicator color="#fff" />
// //                 : <Text style={styles.primaryBtnText}>Send OTP</Text>}
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         {/* ── STEP 2: OTP ── */}
// //         {step === 'otp' && (
// //           <View style={styles.formCard}>
// //             <Text style={styles.label}>Verification Code</Text>
// //             <Text style={styles.otpHint}>Code sent to +91 {phone}</Text>

// //             <View style={styles.otpRow}>
// //               {otp.map((digit, i) => (
// //                 <TextInput
// //                   key={i}
// //                   ref={ref => { otpRefs.current[i] = ref; }}
// //                   style={[
// //                     styles.otpBox,
// //                     digit ? styles.otpBoxFilled : null,
// //                     isChangeMode && digit ? styles.otpBoxFilledChange : null,
// //                   ]}
// //                   maxLength={1}
// //                   keyboardType="number-pad"
// //                   value={digit}
// //                   onChangeText={v => handleOtpChange(v, i)}
// //                   onKeyPress={e => handleOtpKeyPress(e, i)}
// //                   textAlign="center"
// //                 />
// //               ))}
// //             </View>

// //             <TouchableOpacity
// //               style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
// //               onPress={handleVerifyOtp}
// //               disabled={loading}
// //               activeOpacity={0.85}
// //             >
// //               {loading
// //                 ? <ActivityIndicator color="#fff" />
// //                 : <Text style={styles.primaryBtnText}>Verify & Continue</Text>}
// //             </TouchableOpacity>

// //             <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
// //               <Text style={styles.resendText}>Didn't receive code? Resend OTP</Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         {/* ── STEP 3: New Password ── */}
// //         {step === 'newPassword' && (
// //           <View style={styles.formCard}>
// //             <Text style={styles.label}>New Password</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Minimum 6 characters"
// //               secureTextEntry
// //               value={newPassword}
// //               onChangeText={setNewPassword}
// //               placeholderTextColor="#94a3b8"
// //             />

// //             <Text style={[styles.label, { marginTop: 18 }]}>Confirm New Password</Text>
// //             <TextInput
// //               style={[
// //                 styles.input,
// //                 confirmPassword.length > 0 && newPassword !== confirmPassword
// //                   ? styles.inputError : null,
// //                 confirmPassword.length > 0 && newPassword === confirmPassword
// //                   ? styles.inputSuccess : null,
// //               ]}
// //               placeholder="Re-enter new password"
// //               secureTextEntry
// //               value={confirmPassword}
// //               onChangeText={setConfirmPassword}
// //               placeholderTextColor="#94a3b8"
// //             />

// //             {/* Password match hint */}
// //             {confirmPassword.length > 0 && (
// //               <Text style={newPassword === confirmPassword ? styles.matchOk : styles.matchErr}>
// //                 {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
// //               </Text>
// //             )}

// //             <TouchableOpacity
// //               style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
// //               onPress={handleSetNewPassword}
// //               disabled={loading}
// //               activeOpacity={0.85}
// //             >
// //               {loading
// //                 ? <ActivityIndicator color="#fff" />
// //                 : <Text style={styles.primaryBtnText}>
// //                     {isChangeMode ? 'Update Password' : 'Reset Password'}
// //                   </Text>}
// //             </TouchableOpacity>
// //           </View>
// //         )}
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#eef2f7' },
// //   scroll: { flexGrow: 1, paddingTop: 55, paddingHorizontal: 20, paddingBottom: 40 },

// //   // Header
// //   header: { marginBottom: 28 },
// //   backButton: {
// //     flexDirection: 'row',
// //     alignSelf: 'flex-start',
// //     paddingHorizontal: 12,
// //     paddingVertical: 8,
// //     backgroundColor: '#f1f5f9',
// //     borderRadius: 8,
// //     marginBottom: 14,
// //     alignItems: 'center',
// //   },
// //   backIcon: { marginRight: 4 },
// //   backText: { fontSize: 15, color: '#2563eb', fontWeight: '600' },

// //   // Mode badge
// //   modeBadge: {
// //     alignSelf: 'flex-start',
// //     paddingHorizontal: 12,
// //     paddingVertical: 5,
// //     borderRadius: 20,
// //     marginBottom: 12,
// //   },
// //   modeBadgeForgot: { backgroundColor: '#fef3c7' },
// //   modeBadgeChange: { backgroundColor: '#dcfce7' },
// //   modeBadgeText: { fontSize: 13, fontWeight: '700' },
// //   modeBadgeTextForgot: { color: '#92400e' },
// //   modeBadgeTextChange: { color: '#166534' },

// //   title: { fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
// //   subtitle: { fontSize: 14, color: '#64748b', lineHeight: 20 },

// //   // Step indicators
// //   stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, paddingHorizontal: 10 },
// //   stepDot: {
// //     width: 32,
// //     height: 32,
// //     borderRadius: 16,
// //     backgroundColor: '#e2e8f0',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   stepDotActive: { backgroundColor: '#2563eb' },
// //   stepDotDone: { backgroundColor: '#22c55e' },
// //   stepDotText: { fontSize: 13, fontWeight: '700', color: '#94a3b8' },
// //   stepDotTextActive: { color: '#fff' },
// //   stepLine: { flex: 1, height: 2, backgroundColor: '#e2e8f0', marginHorizontal: 4 },
// //   stepLineDone: { backgroundColor: '#22c55e' },

// //   // Form card
// //   formCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 24,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 6 },
// //     shadowOpacity: 0.07,
// //     shadowRadius: 14,
// //     elevation: 5,
// //   },
// //   label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8, letterSpacing: 0.4 },

// //   // Phone
// //   phoneRow: { flexDirection: 'row', marginBottom: 8 },
// //   countryCode: {
// //     backgroundColor: '#f1f5f9',
// //     paddingHorizontal: 12,
// //     justifyContent: 'center',
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     borderColor: '#e2e8f0',
// //     marginRight: 8,
// //   },
// //   countryCodeText: { fontSize: 15, color: '#334155', fontWeight: '600' },
// //   phoneInput: {
// //     flex: 1,
// //     backgroundColor: '#f8fafc',
// //     borderWidth: 1,
// //     borderColor: '#e2e8f0',
// //     borderRadius: 12,
// //     paddingHorizontal: 14,
// //     paddingVertical: 13,
// //     fontSize: 16,
// //     color: '#0f172a',
// //   },
// //   lockedNote: { fontSize: 12, color: '#22c55e', fontWeight: '600', marginBottom: 16 },

// //   // OTP
// //   otpHint: { fontSize: 13, color: '#64748b', marginBottom: 16 },
// //   otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
// //   otpBox: {
// //     width: 46,
// //     height: 54,
// //     borderRadius: 12,
// //     borderWidth: 1.5,
// //     borderColor: '#e2e8f0',
// //     backgroundColor: '#f8fafc',
// //     fontSize: 22,
// //     fontWeight: '700',
// //     color: '#0f172a',
// //   },
// //   otpBoxFilled: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
// //   otpBoxFilledChange: { borderColor: '#16a34a', backgroundColor: '#f0fdf4' },

// //   // Input
// //   input: {
// //     backgroundColor: '#f8fafc',
// //     borderWidth: 1,
// //     borderColor: '#e2e8f0',
// //     borderRadius: 12,
// //     paddingHorizontal: 14,
// //     paddingVertical: 13,
// //     fontSize: 16,
// //     color: '#0f172a',
// //   },
// //   inputError: { borderColor: '#ef4444', backgroundColor: '#fff5f5' },
// //   inputSuccess: { borderColor: '#22c55e', backgroundColor: '#f0fdf4' },
// //   matchOk: { fontSize: 12, color: '#16a34a', fontWeight: '600', marginTop: 6, marginBottom: 4 },
// //   matchErr: { fontSize: 12, color: '#ef4444', fontWeight: '600', marginTop: 6, marginBottom: 4 },

// //   // Buttons
// //   primaryBtn: {
// //     backgroundColor: '#2563eb',
// //     padding: 16,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     marginTop: 12,
// //     shadowColor: '#2563eb',
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 6,
// //     elevation: 4,
// //   },
// //   primaryBtnChange: {
// //     backgroundColor: '#16a34a',
// //     shadowColor: '#16a34a',
// //   },
// //   primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
// //   btnDisabled: { opacity: 0.6 },
// //   resendBtn: { alignItems: 'center', marginTop: 16 },
// //   resendText: { color: '#2563eb', fontWeight: '600', fontSize: 14 },
// // });








// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// // AsyncStorage import removed as it was unused

// // Custom Icon component using emoji/unicode
// const Icon = ({ name, size, style }: { name: string; size: number; style?: any }) => {
//   const getIconChar = () => {
//     switch(name) {
//       case 'back': return '←';
//       case 'change': return '🔑';
//       case 'reset': return '🔓';
//       case 'locked': return '🔒';
//       default: return '•';
//     }
//   };

//   return (
//     <Text style={[style, { fontSize: size }]}>
//       {getIconChar()}
//     </Text>
//   );
// };

// // mode = 'forgot' → came from login screen (unauthenticated)
// // mode = 'change' → came from profile screen (already logged in)
// type Mode = 'forgot' | 'change';
// type Step = 'phone' | 'otp' | 'newPassword';

// export default function ForgotPasswordScreen() {
//   const navigation = useNavigation();

//   // Helper to get params safely
//   const getRouteParams = () => {
//     try {
//       const state = navigation.getState();
//       const routes = state?.routes;
//       if (routes) {
//         const currentRoute = routes.find(r => r.name === 'ForgotPassword');
//         return (currentRoute?.params as { mode?: string; phone?: string }) || {};
//       }
//     } catch (error) {
//       console.log('Error getting params:', error);
//     }
//     return {};
//   };

//   const params = getRouteParams();

//   // 'change' when navigated from Profile, 'forgot' when from Login
//   const mode: Mode = (params.mode as Mode) || 'forgot';

//   // Pre-fill phone if coming from profile (pass it as param)
//   const prefillPhone = params.phone || '';

//   const [step, setStep] = useState<Step>('phone');
//   const [phone, setPhone] = useState(prefillPhone);
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   // verificationId state removed as it was unused
//   const [loading, setLoading] = useState(false);

//   const otpRefs = useRef<Array<TextInput | null>>([]);

//   const isChangeMode = mode === 'change';

//   // ── Step 1: Send OTP ─────────────────────────────────────────────────
//   const handleSendOtp = async () => {
//     const trimmed = phone.trim();
//     if (!trimmed || trimmed.replace(/\D/g, '').length < 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }

//     const fullPhone = trimmed.startsWith('+') ? trimmed : `+91${trimmed.replace(/\D/g, '')}`;

//     try {
//       setLoading(true);
//       // Simulate OTP sending
//       await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));
//       // const mockVerificationId = `mock_${Date.now()}`;
//       // setVerificationId(mockVerificationId);
//       setStep('otp');
//       Alert.alert('OTP Sent', `A 6-digit code (123456) has been sent to ${fullPhone}`);
//     } catch (error: any) {
//       Alert.alert('Error', error?.message || 'Failed to send OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Step 2: Verify OTP ───────────────────────────────────────────────
//   const handleVerifyOtp = async () => {
//     const otpCode = otp.join('');
//     if (otpCode.length !== 6) {
//       Alert.alert('Incomplete OTP', 'Please enter all 6 digits.');
//       return;
//     }

//     try {
//       setLoading(true);
//       await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

//       // For demo, accept any 6-digit code
//       if (otpCode.length === 6) {
//         setStep('newPassword');
//       } else {
//         throw new Error('Invalid OTP');
//       }
//     } catch (error: any) {
//       Alert.alert('Invalid OTP', error?.message || 'The code you entered is incorrect. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Step 3: Set New Password ──
//   const handleSetNewPassword = async () => {
//     if (newPassword.length < 6) {
//       Alert.alert('Weak Password', 'Password must be at least 6 characters.');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Mismatch', 'Passwords do not match. Please re-enter.');
//       return;
//     }

//     try {
//       setLoading(true);

//       // Simulate password update
//       await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));

//       Alert.alert(
//         'Password Updated!',
//         isChangeMode
//           ? 'Your password has been changed successfully.'
//           : 'Password reset successful. Please log in.',
//         [
//           {
//             text: 'OK',
//             onPress: () => {
//               if (isChangeMode) {
//                 (navigation as any).goBack();
//               } else {
//                 (navigation as any).navigate('Login');
//               }
//             },
//           },
//         ]
//       );
//     } catch (error: any) {
//       Alert.alert('Error', error?.message || 'Failed to update password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── OTP box handlers ─────────────────────────────────────────────────
//   const handleOtpChange = (value: string, index: number) => {
//     const updated = [...otp];
//     updated[index] = value;
//     setOtp(updated);
//     if (value && index < 5 && otpRefs.current[index + 1]) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOtpKeyPress = (e: any, index: number) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleResend = () => {
//     setOtp(['', '', '', '', '', '']);
//     // setVerificationId('');
//     setStep('phone');
//   };

//   const goBack = () => {
//     (navigation as any).goBack();
//   };

//   // ── Labels based on mode ─────────────────────────────────────────────
//   const screenTitle = isChangeMode ? 'Change Password' : 'Forgot Password';
//   const subtitles: Record<Step, string> = {
//     phone: isChangeMode
//       ? 'Verify your identity with your registered phone number'
//       : 'Enter your registered phone number to reset password',
//     otp: `Enter the 6-digit code sent to +91 ${phone}`,
//     newPassword: isChangeMode ? 'Set your new password below' : 'Create a new password for your account',
//   };

//   const steps: Step[] = ['phone', 'otp', 'newPassword'];
//   const currentStepIndex = steps.indexOf(step);

//   // ── Render ────────────────────────────────────────────────────────────
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

//         {/* ── Header ── */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={goBack} style={styles.backButton}>
//             <Icon name="back" size={20} style={styles.backIcon} />
//             <Text style={styles.backText}>Back</Text>
//           </TouchableOpacity>

//           {/* Mode badge */}
//           <View style={[styles.modeBadge, isChangeMode ? styles.modeBadgeChange : styles.modeBadgeForgot]}>
//             <Text style={[styles.modeBadgeText, isChangeMode ? styles.modeBadgeTextChange : styles.modeBadgeTextForgot]}>
//               {isChangeMode ? '🔑 Change Password' : '🔓 Reset Password'}
//             </Text>
//           </View>

//           <Text style={styles.title}>{screenTitle}</Text>
//           <Text style={styles.subtitle}>{subtitles[step]}</Text>
//         </View>

//         {/* ── Step Progress Indicator ── */}
//         <View style={styles.stepRow}>
//           {steps.map((s, i) => {
//             const isDone = i < currentStepIndex;
//             const isActive = i === currentStepIndex;
//             return (
//               <React.Fragment key={s}>
//                 <View style={[
//                   styles.stepDot,
//                   isActive && styles.stepDotActive,
//                   isDone && styles.stepDotDone,
//                 ]}>
//                   <Text style={[
//                     styles.stepDotText,
//                     (isActive || isDone) && styles.stepDotTextActive,
//                   ]}>
//                     {isDone ? '✓' : i + 1}
//                   </Text>
//                 </View>
//                 {i < 2 && (
//                   <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </View>

//         {/* ── STEP 1: Phone ── */}
//         {step === 'phone' && (
//           <View style={styles.formCard}>
//             <Text style={styles.label}>Phone Number</Text>
//             <View style={styles.phoneRow}>
//               <View style={styles.countryCode}>
//                 <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
//               </View>
//               <TextInput
//                 style={styles.phoneInput}
//                 placeholder="10-digit mobile number"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phone}
//                 onChangeText={setPhone}
//                 placeholderTextColor="#94a3b8"
//                 editable={!(isChangeMode && prefillPhone !== '')}
//               />
//             </View>

//             {isChangeMode && prefillPhone !== '' && (
//               <Text style={styles.lockedNote}>
//                 🔒 Using your registered number
//               </Text>
//             )}

//             <TouchableOpacity
//               style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
//               onPress={handleSendOtp}
//               disabled={loading}
//               activeOpacity={0.85}
//             >
//               {loading
//                 ? <ActivityIndicator color="#fff" />
//                 : <Text style={styles.primaryBtnText}>Send OTP</Text>}
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* ── STEP 2: OTP ── */}
//         {step === 'otp' && (
//           <View style={styles.formCard}>
//             <Text style={styles.label}>Verification Code</Text>
//             <Text style={styles.otpHint}>Code sent to +91 {phone} (Demo: Use 123456)</Text>

//             <View style={styles.otpRow}>
//               {otp.map((digit, i) => (
//                 <TextInput
//                   key={i}
//                   ref={(ref) => { otpRefs.current[i] = ref; }}
//                   style={[
//                     styles.otpBox,
//                     digit ? styles.otpBoxFilled : null,
//                     isChangeMode && digit ? styles.otpBoxFilledChange : null,
//                   ]}
//                   maxLength={1}
//                   keyboardType="number-pad"
//                   value={digit}
//                   onChangeText={(v) => handleOtpChange(v, i)}
//                   onKeyPress={(e) => handleOtpKeyPress(e, i)}
//                   textAlign="center"
//                 />
//               ))}
//             </View>

//             <TouchableOpacity
//               style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
//               onPress={handleVerifyOtp}
//               disabled={loading}
//               activeOpacity={0.85}
//             >
//               {loading
//                 ? <ActivityIndicator color="#fff" />
//                 : <Text style={styles.primaryBtnText}>Verify & Continue</Text>}
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
//               <Text style={styles.resendText}>Didn't receive code? Resend OTP</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* ── STEP 3: New Password ── */}
//         {step === 'newPassword' && (
//           <View style={styles.formCard}>
//             <Text style={styles.label}>New Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Minimum 6 characters"
//               secureTextEntry
//               value={newPassword}
//               onChangeText={setNewPassword}
//               placeholderTextColor="#94a3b8"
//             />

//             <Text style={[styles.label, { marginTop: 18 }]}>Confirm New Password</Text>
//             <TextInput
//               style={[
//                 styles.input,
//                 confirmPassword.length > 0 && newPassword !== confirmPassword
//                   ? styles.inputError : null,
//                 confirmPassword.length > 0 && newPassword === confirmPassword
//                   ? styles.inputSuccess : null,
//               ]}
//               placeholder="Re-enter new password"
//               secureTextEntry
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               placeholderTextColor="#94a3b8"
//             />

//             {/* Password match hint */}
//             {confirmPassword.length > 0 && (
//               <Text style={newPassword === confirmPassword ? styles.matchOk : styles.matchErr}>
//                 {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
//               </Text>
//             )}

//             <TouchableOpacity
//               style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
//               onPress={handleSetNewPassword}
//               disabled={loading}
//               activeOpacity={0.85}
//             >
//               {loading
//                 ? <ActivityIndicator color="#fff" />
//                 : <Text style={styles.primaryBtnText}>
//                     {isChangeMode ? 'Update Password' : 'Reset Password'}
//                   </Text>}
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#eef2f7' },
//   scroll: { flexGrow: 1, paddingTop: 55, paddingHorizontal: 20, paddingBottom: 40 },

//   // Header
//   header: { marginBottom: 28 },
//   backButton: {
//     flexDirection: 'row',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     backgroundColor: '#f1f5f9',
//     borderRadius: 8,
//     marginBottom: 14,
//     alignItems: 'center',
//   },
//   backIcon: { marginRight: 4 },
//   backText: { fontSize: 15, color: '#2563eb', fontWeight: '600' },

//   // Mode badge
//   modeBadge: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     borderRadius: 20,
//     marginBottom: 12,
//   },
//   modeBadgeForgot: { backgroundColor: '#fef3c7' },
//   modeBadgeChange: { backgroundColor: '#dcfce7' },
//   modeBadgeText: { fontSize: 13, fontWeight: '700' },
//   modeBadgeTextForgot: { color: '#92400e' },
//   modeBadgeTextChange: { color: '#166534' },

//   title: { fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
//   subtitle: { fontSize: 14, color: '#64748b', lineHeight: 20 },

//   // Step indicators
//   stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, paddingHorizontal: 10 },
//   stepDot: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#e2e8f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   stepDotActive: { backgroundColor: '#2563eb' },
//   stepDotDone: { backgroundColor: '#22c55e' },
//   stepDotText: { fontSize: 13, fontWeight: '700', color: '#94a3b8' },
//   stepDotTextActive: { color: '#fff' },
//   stepLine: { flex: 1, height: 2, backgroundColor: '#e2e8f0', marginHorizontal: 4 },
//   stepLineDone: { backgroundColor: '#22c55e' },

//   // Form card
//   formCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.07,
//     shadowRadius: 14,
//     elevation: 5,
//   },
//   label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8, letterSpacing: 0.4 },

//   // Phone
//   phoneRow: { flexDirection: 'row', marginBottom: 8 },
//   countryCode: {
//     backgroundColor: '#f1f5f9',
//     paddingHorizontal: 12,
//     justifyContent: 'center',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     marginRight: 8,
//   },
//   countryCodeText: { fontSize: 15, color: '#334155', fontWeight: '600' },
//   phoneInput: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     paddingVertical: 13,
//     fontSize: 16,
//     color: '#0f172a',
//   },
//   lockedNote: { fontSize: 12, color: '#22c55e', fontWeight: '600', marginBottom: 16 },

//   // OTP
//   otpHint: { fontSize: 13, color: '#64748b', marginBottom: 16 },
//   otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
//   otpBox: {
//     width: 46,
//     height: 54,
//     borderRadius: 12,
//     borderWidth: 1.5,
//     borderColor: '#e2e8f0',
//     backgroundColor: '#f8fafc',
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#0f172a',
//     textAlign: 'center',
//   },
//   otpBoxFilled: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
//   otpBoxFilledChange: { borderColor: '#16a34a', backgroundColor: '#f0fdf4' },

//   // Input
//   input: {
//     backgroundColor: '#f8fafc',
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     paddingVertical: 13,
//     fontSize: 16,
//     color: '#0f172a',
//   },
//   inputError: { borderColor: '#ef4444', backgroundColor: '#fff5f5' },
//   inputSuccess: { borderColor: '#22c55e', backgroundColor: '#f0fdf4' },
//   matchOk: { fontSize: 12, color: '#16a34a', fontWeight: '600', marginTop: 6, marginBottom: 4 },
//   matchErr: { fontSize: 12, color: '#ef4444', fontWeight: '600', marginTop: 6, marginBottom: 4 },

//   // Buttons
//   primaryBtn: {
//     backgroundColor: '#2563eb',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 12,
//     shadowColor: '#2563eb',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   primaryBtnChange: {
//     backgroundColor: '#16a34a',
//     shadowColor: '#16a34a',
//   },
//   primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
//   btnDisabled: { opacity: 0.6 },
//   resendBtn: { alignItems: 'center', marginTop: 16 },
//   resendText: { color: '#2563eb', fontWeight: '600', fontSize: 14 },
// });




import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Custom Icon component using emoji/unicode
const Icon = ({ name, size, style }: { name: string; size: number; style?: any }) => {
  const getIconChar = () => {
    switch (name) {
      case 'back': return '←';
      case 'change': return '🔑';
      case 'reset': return '🔓';
      case 'locked': return '🔒';
      default: return '•';
    }
  };

  return (
    <Text style={[style, { fontSize: size }]}>
      {getIconChar()}
    </Text>
  );
};

// mode = 'forgot' → came from login screen (unauthenticated)
// mode = 'change' → came from profile screen (already logged in)
type Mode = 'forgot' | 'change';
type Step = 'phone' | 'otp' | 'newPassword';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  // Helper to get params safely
  const getRouteParams = () => {
    try {
      const state = navigation.getState();
      const routes = state?.routes;
      if (routes) {
        const currentRoute = routes.find(r => r.name === 'ForgotPassword');
        return (currentRoute?.params as { mode?: string; phone?: string }) || {};
      }
    } catch (error) {
      console.log('Error getting params:', error);
    }
    return {};
  };

  const params = getRouteParams();

  // 'change' when navigated from Profile, 'forgot' when from Login
  const mode: Mode = (params.mode as Mode) || 'forgot';

  // Pre-fill phone if coming from profile (pass it as param)
  const prefillPhone = params.phone || '';

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState(prefillPhone);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef<Array<TextInput | null>>([]);

  const isChangeMode = mode === 'change';

  // ── Step 1: Send OTP ─────────────────────────────────────────────────
  const handleSendOtp = async () => {
    const trimmed = phone.trim();
    if (!trimmed || trimmed.replace(/\D/g, '').length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const fullPhone = trimmed.startsWith('+') ? trimmed : `+91${trimmed.replace(/\D/g, '')}`;

    try {
      setLoading(true);
      // Simulate OTP sending
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));
      setStep('otp');
      Alert.alert('OTP Sent', `A 6-digit code (123456) has been sent to ${fullPhone}`);
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Verify OTP ───────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Incomplete OTP', 'Please enter all 6 digits.');
      return;
    }

    try {
      setLoading(true);
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

      // For demo, accept any 6-digit code
      if (otpCode.length === 6) {
        setStep('newPassword');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error: any) {
      Alert.alert('Invalid OTP', error?.message || 'The code you entered is incorrect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Set New Password ──
  const handleSetNewPassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match. Please re-enter.');
      return;
    }

    try {
      setLoading(true);

      // Simulate password update
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));

      Alert.alert(
        'Password Updated!',
        isChangeMode
          ? 'Your password has been changed successfully.'
          : 'Password reset successful. Please log in.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (isChangeMode) {
                (navigation as any).goBack();
              } else {
                (navigation as any).navigate('Login');
              }
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── OTP box handlers ─────────────────────────────────────────────────
  const handleOtpChange = (value: string, index: number) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setStep('phone');
  };

  const goBack = () => {
    (navigation as any).goBack();
  };

  // ── Labels based on mode ─────────────────────────────────────────────
  const screenTitle = isChangeMode ? 'Change Password' : 'Forgot Password';
  const subtitles: Record<Step, string> = {
    phone: isChangeMode
      ? 'Verify your identity with your registered phone number'
      : 'Enter your registered phone number to reset password',
    otp: `Enter the 6-digit code sent to +91 ${phone}`,
    newPassword: isChangeMode ? 'Set your new password below' : 'Create a new password for your account',
  };

  const steps: Step[] = ['phone', 'otp', 'newPassword'];
  const currentStepIndex = steps.indexOf(step);

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Icon name="back" size={20} style={styles.backIcon} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Mode badge */}
          <View style={[styles.modeBadge, isChangeMode ? styles.modeBadgeChange : styles.modeBadgeForgot]}>
            <Text style={[styles.modeBadgeText, isChangeMode ? styles.modeBadgeTextChange : styles.modeBadgeTextForgot]}>
              {isChangeMode ? '🔑 Change Password' : '🔓 Reset Password'}
            </Text>
          </View>

          <Text style={styles.title}>{screenTitle}</Text>
          <Text style={styles.subtitle}>{subtitles[step]}</Text>
        </View>

        {/* ── Step Progress Indicator ── */}
        <View style={styles.stepRow}>
          {steps.map((s, i) => {
            const isDone = i < currentStepIndex;
            const isActive = i === currentStepIndex;
            return (
              <React.Fragment key={s}>
                <View style={[
                  styles.stepDot,
                  isActive && styles.stepDotActive,
                  isDone && styles.stepDotDone,
                ]}>
                  <Text style={[
                    styles.stepDotText,
                    (isActive || isDone) && styles.stepDotTextActive,
                  ]}>
                    {isDone ? '✓' : i + 1}
                  </Text>
                </View>
                {i < 2 && (
                  <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
                )}
              </React.Fragment>
            );
          })}
        </View>

        {/* ── STEP 1: Phone ── */}
        {step === 'phone' && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor="#94a3b8"
                editable={!(isChangeMode && prefillPhone !== '')}
              />
            </View>

            {isChangeMode && prefillPhone !== '' && (
              <Text style={styles.lockedNote}>
                🔒 Using your registered number
              </Text>
            )}

            <TouchableOpacity
              style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
              onPress={handleSendOtp}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.primaryBtnText}>Send OTP</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 'otp' && (
          <View style={styles.formCard}>
            <Text style={styles.label}>Verification Code</Text>
            <Text style={styles.otpHint}>Code sent to +91 {phone} (Demo: Use 123456)</Text>

            <View style={styles.otpRow}>
              {otp.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => { otpRefs.current[i] = ref; }}
                  style={[
                    styles.otpBox,
                    digit ? styles.otpBoxFilled : null,
                    isChangeMode && digit ? styles.otpBoxFilledChange : null,
                  ]}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(v) => handleOtpChange(v, i)}
                  onKeyPress={(e) => handleOtpKeyPress(e, i)}
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
              onPress={handleVerifyOtp}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.primaryBtnText}>Verify & Continue</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
              <Text style={styles.resendText}>Didn't receive code? Resend OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── STEP 3: New Password ── */}
        {step === 'newPassword' && (
          <View style={styles.formCard}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimum 6 characters"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#94a3b8"
            />

            {/* FIX: replaced inline style { marginTop: 18 } with styles.confirmLabel */}
            <Text style={[styles.label, styles.confirmLabel]}>Confirm New Password</Text>
            <TextInput
              style={[
                styles.input,
                confirmPassword.length > 0 && newPassword !== confirmPassword
                  ? styles.inputError : null,
                confirmPassword.length > 0 && newPassword === confirmPassword
                  ? styles.inputSuccess : null,
              ]}
              placeholder="Re-enter new password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#94a3b8"
            />

            {/* Password match hint */}
            {confirmPassword.length > 0 && (
              <Text style={newPassword === confirmPassword ? styles.matchOk : styles.matchErr}>
                {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.primaryBtn, isChangeMode && styles.primaryBtnChange, loading && styles.btnDisabled]}
              onPress={handleSetNewPassword}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.primaryBtnText}>
                  {isChangeMode ? 'Update Password' : 'Reset Password'}
                </Text>}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2f7' },
  scroll: { flexGrow: 1, paddingTop: 55, paddingHorizontal: 20, paddingBottom: 40 },

  // Header
  header: { marginBottom: 28 },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 14,
    alignItems: 'center',
  },
  backIcon: { marginRight: 4 },
  backText: { fontSize: 15, color: '#2563eb', fontWeight: '600' },

  // Mode badge
  modeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  modeBadgeForgot: { backgroundColor: '#fef3c7' },
  modeBadgeChange: { backgroundColor: '#dcfce7' },
  modeBadgeText: { fontSize: 13, fontWeight: '700' },
  modeBadgeTextForgot: { color: '#92400e' },
  modeBadgeTextChange: { color: '#166534' },

  title: { fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#64748b', lineHeight: 20 },

  // Step indicators
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, paddingHorizontal: 10 },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: { backgroundColor: '#2563eb' },
  stepDotDone: { backgroundColor: '#22c55e' },
  stepDotText: { fontSize: 13, fontWeight: '700', color: '#94a3b8' },
  stepDotTextActive: { color: '#fff' },
  stepLine: { flex: 1, height: 2, backgroundColor: '#e2e8f0', marginHorizontal: 4 },
  stepLineDone: { backgroundColor: '#22c55e' },

  // Form card
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 5,
  },
  label: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8, letterSpacing: 0.4 },
  // FIX: extracted from inline style { marginTop: 18 } on line 917
  confirmLabel: { marginTop: 18 },

  // Phone
  phoneRow: { flexDirection: 'row', marginBottom: 8 },
  countryCode: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  countryCodeText: { fontSize: 15, color: '#334155', fontWeight: '600' },
  phoneInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: '#0f172a',
  },
  lockedNote: { fontSize: 12, color: '#22c55e', fontWeight: '600', marginBottom: 16 },

  // OTP
  otpHint: { fontSize: 13, color: '#64748b', marginBottom: 16 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  otpBox: {
    width: 46,
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  otpBoxFilled: { borderColor: '#2563eb', backgroundColor: '#eff6ff' },
  otpBoxFilledChange: { borderColor: '#16a34a', backgroundColor: '#f0fdf4' },

  // Input
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: '#0f172a',
  },
  inputError: { borderColor: '#ef4444', backgroundColor: '#fff5f5' },
  inputSuccess: { borderColor: '#22c55e', backgroundColor: '#f0fdf4' },
  matchOk: { fontSize: 12, color: '#16a34a', fontWeight: '600', marginTop: 6, marginBottom: 4 },
  matchErr: { fontSize: 12, color: '#ef4444', fontWeight: '600', marginTop: 6, marginBottom: 4 },

  // Buttons
  primaryBtn: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryBtnChange: {
    backgroundColor: '#16a34a',
    shadowColor: '#16a34a',
  },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnDisabled: { opacity: 0.6 },
  resendBtn: { alignItems: 'center', marginTop: 16 },
  resendText: { color: '#2563eb', fontWeight: '600', fontSize: 14 },
});
