import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const timeOptions = [
  { id: '5', title: '5 mins', subtitle: 'Quick review', color: '#22C55E' },
  { id: '15', title: '15 mins', subtitle: 'Short lessons', color: '#3B82F6' },
  { id: '30', title: '30 mins', subtitle: 'Deep learning', color: '#8B5CF6' },
  { id: '60', title: '60 mins', subtitle: 'Intensive study', color: '#EF4444' },
];

export default function TimeCommitment() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleTimeSelect = (timeId: string) => {
    setSelectedTime(timeId);
    
    setTimeout(() => {
      // Pass all collected data to the study plan preview
      const studyPlanParams = new URLSearchParams({
        selectedSubjects: params.selectedSubjects as string || '[]',
        selectedPriorities: params.selectedPriorities as string || '[]',
        selectedTopics: params.selectedTopics as string || '{}',
        strugglingTopics: params.strugglingTopics as string || '{}',
        timeCommitment: timeId
      });
      
      router.push(`/onboarding/study-plan-preview?${studyPlanParams.toString()}`);
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '87.5%' }]} />
          </View>
          <Text style={styles.progressText}>7 of 8</Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>How much time will you study each day?</Text>
        </View>

        {/* Time options */}
        <View style={styles.optionsContainer}>
          {timeOptions.map((option) => {
            const isSelected = selectedTime === option.id;
            
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.timeButton,
                  { borderColor: option.color },
                  isSelected && { backgroundColor: option.color }
                ]}
                onPress={() => handleTimeSelect(option.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : option.color + '20' }]}>
                  <Clock size={24} color={isSelected ? '#FFFFFF' : option.color} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.timeTitle, isSelected && { color: '#FFFFFF' }]}>
                    {option.title}
                  </Text>
                  <Text style={[styles.timeSubtitle, isSelected && { color: 'rgba(255,255,255,0.8)' }]}>
                    {option.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    width: width * 0.6,
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  questionContainer: {
    marginBottom: 32,
  },
  question: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    flex: 1,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  timeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  timeSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
});