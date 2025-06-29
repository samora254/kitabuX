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

const gradeOptions = [
  { 
    id: 'E', 
    title: 'E - Exceeding Expectations', 
    color: '#22C55E',
    bgColor: '#F0FDF4'
  },
  { 
    id: 'M', 
    title: 'M - Meeting Expectations', 
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  { 
    id: 'A', 
    title: 'A - Approaching Expectations', 
    color: '#F59E0B',
    bgColor: '#FFFBEB'
  },
  { 
    id: 'B', 
    title: 'B - Below Expectations', 
    color: '#EF4444',
    bgColor: '#FEF2F2'
  },
  { 
    id: 'NYM', 
    title: 'NYM - Not Yet Meeting', 
    color: '#8B5CF6',
    bgColor: '#FAF5FF'
  },
];

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function SkillLevel() {
  const router = useRouter();
  const { selectedSubjects } = useLocalSearchParams();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [subjectGrades, setSubjectGrades] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedSubjects) {
      try {
        const parsedSubjects = JSON.parse(selectedSubjects as string);
        setSubjects(parsedSubjects);
      } catch (error) {
        console.error('Error parsing selected subjects:', error);
        // Fallback to previous screen if data is corrupted
        router.back();
      }
    }
  }, [selectedSubjects]);

  if (subjects.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentSubject = subjects[currentSubjectIndex];
  const IconComponent = iconMap[currentSubject.icon as keyof typeof iconMap] || BookOpen;

  const handleGradeSelect = (gradeId: string) => {
    const newGrades = { ...subjectGrades, [currentSubject.id]: gradeId };
    setSubjectGrades(newGrades);

    // Move to next subject or continue to next screen
    if (currentSubjectIndex < subjects.length - 1) {
      setTimeout(() => {
        setCurrentSubjectIndex(currentSubjectIndex + 1);
      }, 300);
    } else {
      setTimeout(() => {
        // Pass both selectedSubjects and subjectGrades to the next screen
        const params = new URLSearchParams({
          selectedSubjects: JSON.stringify(subjects),
          subjectGrades: JSON.stringify(newGrades)
        });
        router.push(`/onboarding/focus-area?${params.toString()}`);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentSubjectIndex > 0) {
      setCurrentSubjectIndex(currentSubjectIndex - 1);
    } else {
      router.back();
    }
  };

  const handleContinue = () => {
    // Pass both selectedSubjects and subjectGrades to the next screen
    const params = new URLSearchParams({
      selectedSubjects: JSON.stringify(subjects),
      subjectGrades: JSON.stringify(subjectGrades)
    });
    router.push(`/onboarding/focus-area?${params.toString()}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '37.5%' }]} />
          </View>
          <Text style={styles.progressText}>3 of 8</Text>
        </View>

        {/* Subject progress */}
        <View style={styles.subjectProgressContainer}>
          <Text style={styles.subjectProgressText}>
            Subject {currentSubjectIndex + 1} of {subjects.length}
          </Text>
          <View style={styles.subjectProgressBar}>
            <View 
              style={[
                styles.subjectProgressFill, 
                { 
                  width: `${((currentSubjectIndex + 1) / subjects.length) * 100}%`,
                  backgroundColor: currentSubject.color
                }
              ]} 
            />
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <View style={[styles.subjectIcon, { backgroundColor: currentSubject.color + '20' }]}>
            <IconComponent size={32} color={currentSubject.color} />
          </View>
          <Text style={styles.question}>How did you score in your last {currentSubject.name} exam?</Text>
        </View>

        {/* Grade options */}
        <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
          {gradeOptions.map((grade) => {
            const isSelected = subjectGrades[currentSubject.id] === grade.id;
            
            return (
              <TouchableOpacity
                key={grade.id}
                style={[
                  styles.gradeButton,
                  { backgroundColor: grade.bgColor, borderColor: grade.color },
                  isSelected && { backgroundColor: grade.color, borderWidth: 3 }
                ]}
                onPress={() => handleGradeSelect(grade.id)}
              >
                <View style={styles.gradeContent}>
                  <View style={styles.gradeHeader}>
                    <View style={[styles.gradeBadge, { backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : grade.color }]}>
                      <Text style={[styles.gradeBadgeText, { color: isSelected ? '#FFFFFF' : '#FFFFFF' }]}>
                        {grade.id}
                      </Text>
                    </View>
                    <View style={styles.gradeTextContainer}>
                      <Text style={[styles.gradeTitle, isSelected && { color: '#FFFFFF' }]}>
                        {grade.title}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Navigation buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          {Object.keys(subjectGrades).length === subjects.length && (
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
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
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  subjectProgressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subjectProgressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  subjectProgressBar: {
    width: width * 0.4,
    height: 3,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
  },
  subjectProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  questionContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  subjectIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  question: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
  },
  gradeButton: {
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  gradeContent: {
    padding: 16,
  },
  gradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  gradeBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  gradeTextContainer: {
    flex: 1,
  },
  gradeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  backButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
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