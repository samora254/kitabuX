import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const grades = [
  { id: 'grade4', name: 'Grade 4', color: '#22C55E', description: 'Age 9-10' },
  { id: 'grade5', name: 'Grade 5', color: '#3B82F6', description: 'Age 10-11' },
  { id: 'grade6', name: 'Grade 6', color: '#8B5CF6', description: 'Age 11-12' },
  { id: 'grade7', name: 'Grade 7', color: '#F59E0B', description: 'Age 12-13' },
  { id: 'grade8', name: 'Grade 8', color: '#EF4444', description: 'Age 13-14' },
  { id: 'grade9', name: 'Grade 9', color: '#10B981', description: 'Age 14-15' },
];

// Grade-specific subjects
const gradeSubjects = {
  grade4: [
    { id: 'english', name: 'English', icon: 'BookOpen', color: '#8B5CF6' },
    { id: 'kiswahili', name: 'Kiswahili', icon: 'Globe', color: '#F59E0B' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: '#3B82F6' },
    { id: 'science', name: 'Science', icon: 'Microscope', color: '#10B981' },
    { id: 'social', name: 'Social Studies', icon: 'Users', color: '#6366F1' },
    { id: 'cre', name: 'CRE', icon: 'Heart', color: '#EF4444' },
    { id: 'life', name: 'Life Skills', icon: 'Lightbulb', color: '#F97316' },
    { id: 'sports', name: 'Sports & PE', icon: 'Zap', color: '#EC4899' },
  ],
  grade5: [
    { id: 'english', name: 'English', icon: 'BookOpen', color: '#8B5CF6' },
    { id: 'kiswahili', name: 'Kiswahili', icon: 'Globe', color: '#F59E0B' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: '#3B82F6' },
    { id: 'science', name: 'Science', icon: 'Microscope', color: '#10B981' },
    { id: 'social', name: 'Social Studies', icon: 'Users', color: '#6366F1' },
    { id: 'cre', name: 'CRE', icon: 'Heart', color: '#EF4444' },
    { id: 'life', name: 'Life Skills', icon: 'Lightbulb', color: '#F97316' },
    { id: 'sports', name: 'Sports & PE', icon: 'Zap', color: '#EC4899' },
  ],
  grade6: [
    { id: 'english', name: 'English', icon: 'BookOpen', color: '#8B5CF6' },
    { id: 'kiswahili', name: 'Kiswahili', icon: 'Globe', color: '#F59E0B' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: '#3B82F6' },
    { id: 'science', name: 'Science', icon: 'Microscope', color: '#10B981' },
    { id: 'social', name: 'Social Studies', icon: 'Users', color: '#6366F1' },
    { id: 'agriculture', name: 'Agriculture', icon: 'Sprout', color: '#22C55E' },
    { id: 'cre', name: 'CRE', icon: 'Heart', color: '#EF4444' },
    { id: 'life', name: 'Life Skills', icon: 'Lightbulb', color: '#F97316' },
    { id: 'sports', name: 'Sports & PE', icon: 'Zap', color: '#EC4899' },
  ],
  grade7: [
    { id: 'english', name: 'English', icon: 'BookOpen', color: '#8B5CF6' },
    { id: 'kiswahili', name: 'Kiswahili', icon: 'Globe', color: '#F59E0B' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: '#3B82F6' },
    { id: 'science', name: 'Science', icon: 'Microscope', color: '#10B981' },
    { id: 'social', name: 'Social Studies', icon: 'Users', color: '#6366F1' },
    { id: 'agriculture', name: 'Agriculture', icon: 'Sprout', color: '#22C55E' },
    { id: 'cre', name: 'CRE', icon: 'Heart', color: '#EF4444' },
    { id: 'life', name: 'Life Skills', icon: 'Lightbulb', color: '#F97316' },
    { id: 'sports', name: 'Sports & PE', icon: 'Zap', color: '#EC4899' },
    { id: 'pretech', name: 'Pre‑Tech', icon: 'Wrench', color: '#64748B' },
  ],
  grade8: [
    { id: 'english', name: 'English', icon: 'BookOpen', color: '#8B5CF6' },
    { id: 'kiswahili', name: 'Kiswahili', icon: 'Globe', color: '#F59E0B' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: '#3B82F6' },
    { id: 'science', name: 'Science', icon: 'Microscope', color: '#10B981' },
    { id: 'social', name: 'Social Studies', icon: 'Users', color: '#6366F1' },
    { id: 'agriculture', name: 'Agriculture', icon: 'Sprout', color: '#22C55E' },
    { id: 'cre', name: 'CRE', icon: 'Heart', color: '#EF4444' },
    { id: 'life', name: 'Life Skills', icon: 'Lightbulb', color: '#F97316' },
    { id: 'sports', name: 'Sports & PE', icon: 'Zap', color: '#EC4899' },
    { id: 'pretech', name: 'Pre‑Tech', icon: 'Wrench', color: '#64748B' },
  ],
  grade9: [
    { id: 'english', name: 'English', icon: 'BookOpen', color: '#8B5CF6' },
    { id: 'kiswahili', name: 'Kiswahili', icon: 'Globe', color: '#F59E0B' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: '#3B82F6' },
    { id: 'science', name: 'Science', icon: 'Microscope', color: '#10B981' },
    { id: 'social', name: 'Social Studies', icon: 'Users', color: '#6366F1' },
    { id: 'agriculture', name: 'Agriculture', icon: 'Sprout', color: '#22C55E' },
    { id: 'cre', name: 'CRE', icon: 'Heart', color: '#EF4444' },
    { id: 'life', name: 'Life Skills', icon: 'Lightbulb', color: '#F97316' },
    { id: 'sports', name: 'Sports & PE', icon: 'Zap', color: '#EC4899' },
    { id: 'pretech', name: 'Pre‑Tech', icon: 'Wrench', color: '#64748B' },
  ],
};

export default function GradeSelection() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<string>('');

  const handleGradeSelect = (gradeId: string) => {
    setSelectedGrade(gradeId);
    
    // Get subjects for the selected grade
    const availableSubjects = gradeSubjects[gradeId as keyof typeof gradeSubjects] || [];
    
    setTimeout(() => {
      router.push({
        pathname: '/onboarding/subject-selection',
        params: { 
          selectedGrade: gradeId,
          availableSubjects: JSON.stringify(availableSubjects)
        }
      });
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '12.5%' }]} />
          </View>
          <Text style={styles.progressText}>1 of 8</Text>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerIcon}>
            <GraduationCap size={32} color="#22C55E" />
          </View>
          <Text style={styles.question}>What grade are you in?</Text>
          <Text style={styles.subtitle}>This helps us show you the right subjects</Text>
        </View>

        {/* Grade options */}
        <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.gradesGrid}>
            {grades.map((grade) => {
              const isSelected = selectedGrade === grade.id;
              
              return (
                <TouchableOpacity
                  key={grade.id}
                  style={[
                    styles.gradeButton,
                    { borderColor: grade.color },
                    isSelected && { backgroundColor: grade.color }
                  ]}
                  onPress={() => handleGradeSelect(grade.id)}
                >
                  <View style={styles.gradeContent}>
                    <Text style={[styles.gradeTitle, isSelected && { color: '#FFFFFF' }]}>
                      {grade.name}
                    </Text>
                    <Text style={[styles.gradeDescription, isSelected && { color: 'rgba(255,255,255,0.8)' }]}>
                      {grade.description}
                    </Text>
                  </View>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  gradesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gradeButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 80,
  },
  gradeContent: {
    flex: 1,
  },
  gradeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  gradeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});