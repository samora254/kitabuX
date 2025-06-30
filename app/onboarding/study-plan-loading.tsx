
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

export default function StudyPlanLoading() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Simulate loading time and then navigate to study plan preview
    const timer = setTimeout(() => {
      router.push({
        pathname: '/onboarding/study-plan-preview',
        params: params
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#22C55E" style={styles.loader} />
        <Text style={styles.title}>Creating Your Study Plan</Text>
        <Text style={styles.subtitle}>
          We're personalizing your learning experience based on your preferences...
        </Text>
        <View style={styles.stepsContainer}>
          <Text style={styles.step}>✓ Analyzing your subjects</Text>
          <Text style={styles.step}>✓ Mapping your skill levels</Text>
          <Text style={styles.step}>⏳ Customizing your schedule</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loader: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  stepsContainer: {
    alignItems: 'flex-start',
  },
  step: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
});
