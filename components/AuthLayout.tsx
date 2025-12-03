import React from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from './BackgroundGradient';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <BackgroundGradient>
       <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </SafeAreaView>
    </BackgroundGradient>
  )
}

export default AuthLayout

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})