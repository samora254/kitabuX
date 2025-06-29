import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, BookOpen, Globe, Microscope, Heart, Users, Sprout, Lightbulb, Zap, Wrench } from 'lucide-react-native';
import { useState, useEffect } from 'react';

const { width } = Dimensions.get('window');

// Icon mapping for dynamic icon rendering
const iconMap = {
  'BookOpen': BookOpen,
  'Globe': Globe,
  'Calculator': Calculator,
  'Microscope': Microscope,
  'Users': Users,
  'Sprout': Sprout,
  'Heart': Heart,
  'Lightbulb': Lightbulb,
  'Zap': Zap,
  'Wrench': Wrench,
};

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function SubjectSelection() {
  const router = useRouter();
  const { selectedGrade, availableSubjects } = useLocalSearchParams();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (availableSubjects) {
      try {
        const parsedSubjects = JSON.parse(availableSubjects as string);
        setSubjects(parsedSubjects);
      } catch (error) {
        console.error('Error parsing available subjects:', error);
        router.back();
      }
    }
  }, [availableSubjects]);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else if (prev.length < 5) {
        return [...prev, subjectId];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    if (selectedSubjects.length > 0) {
      // Pass selected subjects to the next screen via URL params
      const selectedSubjectsData = selectedSubjects.map(id => {
        const subject = subjects.find(s => s.id === id);
        return {
          id: subject?.id,
          name: subject?.name,
          icon: subject?.icon,
          color: subject?.color
        };
      });
      
      router.push({
        pathname: '/onboarding/skill-level',
        params: { 
          selectedGrade: selectedGrade,
          selectedSubjects: JSON.stringify(selectedSubjectsData)
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '25%' }]} />
          </View>
          <Text style={styles.progressText}>2 of 8</Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>Which subjects do you need help with?</Text>
          <Text style={styles.subtitle}>
            Choose up to 5 subjects • {selectedSubjects.length}/5 selected
          </Text>
        </View>

        {/* Subject options in 2 columns */}
        <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.subjectsGrid}>
            {subjects.map((subject) => {
              const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || BookOpen;
              const isSelected = selectedSubjects.includes(subject.id);
              const isDisabled = !isSelected && selectedSubjects.length >= 5;
              
              return (
                <TouchableOpacity
                  key={subject.id}
                  style={[
                    styles.subjectButton,
                    { borderColor: subject.color },
                    isSelected && { backgroundColor: subject.color },
                    isDisabled && { opacity: 0.5 }
                  ]}
                  onPress={() => handleSubjectToggle(subject.id)}
                  disabled={isDisabled}
                >
                  <View style={[styles.iconContainer, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : subject.color + '20' }]}>
                    <IconComponent size={20} color={isSelected ? '#FFFFFF' : subject.color} />
                  </View>
                  <Text style={[styles.subjectText, isSelected && { color: '#FFFFFF' }]}>
                    {subject.name}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Continue button */}
        <TouchableOpacity 
          style={[styles.continueButton, selectedSubjects.length === 0 && { opacity: 0.5 }]}
          onPress={handleContinue}
          disabled={selectedSubjects.length === 0}
        >
          <Text style={styles.continueButtonText}>
            Continue {selectedSubjects.length > 0 && `(${selectedSubjects.length} selected)`}
          </Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 32,
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
    marginBottom: 24,
    alignItems: 'center',
  },
  question: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  subjectButton: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 100,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  subjectText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 18,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  continueButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});