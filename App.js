import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const logo = require('./src/assets/stouchi.png');

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const timeout = setTimeout(() => setIsReady(true), 1200);
      return () => clearTimeout(timeout);
    });
  }, [opacity, scale]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#050608" />
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>
        <Text style={styles.loadingText}>Loading your Stouchi wallet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#050608" />
      <Image source={logo} style={styles.smallLogo} resizeMode="contain" />
      <Text style={styles.title}>Welcome to Stouchi</Text>
      <Text style={styles.subtitle}>
        A modern, beautiful starting point for your golden wallet experience.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#050608',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    width: 220,
    height: 220,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOpacity: 0.45,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 18 },
    elevation: 18,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    marginTop: 32,
    fontSize: 16,
    color: '#E5E5EA',
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#050608',
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  smallLogo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8F8FF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0C3',
    textAlign: 'center',
    lineHeight: 22,
  },
});

