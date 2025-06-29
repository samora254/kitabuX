import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="subject-selection" />
      <Stack.Screen name="skill-level" />
      <Stack.Screen name="focus-area" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="struggles" />
      <Stack.Screen name="time-commitment" />
      <Stack.Screen name="study-plan-loading" />
      <Stack.Screen name="name-input" />
    </Stack>
  );
}