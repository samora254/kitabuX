import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, BookOpen, Globe, Microscope, Heart, Users, Sprout, Lightbulb, Zap, Wrench, ChevronLeft, ChevronRight } from 'lucide-react-native';
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

// CBC Grade 8 topics per subject
const subjectTopics = {
  english: [
    'Reading',
    'Writing',
    'Grammar',
    'Vocabulary',
    'Poetry',
    'Essays',
    'Speaking',
    'Literature',
    'Spelling',
    'Thinking'
  ],
  kiswahili: [
    'Kusoma',
    'Uandishi',
    'Sarufi',
    'Lugha',
    'Mashairi',
    'Insha',
    'Maongezi',
    'Fasihi',
    'Imla',
    'Ufikiri'
  ],
  mathematics: [
    'Fractions',
    'Algebra',
    'Geometry',
    'Data',
    'Measurement',
    'Numbers',
    'Ratios',
    'Probability',
    'Problems',
    'Mental Math'
  ],
  science: [
    'Classification',
    'Body Systems',
    'Plants',
    'Materials',
    'Forces',
    'Energy',
    'Environment',
    'Weather',
    'Investigation',
    'Technology'
  ],
  social: [
    'Government',
    'Geography',
    'Economics',
    'Culture',
    'Resources',
    'Transport',
    'Relations',
    'Conservation',
    'Rights',
    'History'
  ],
  agriculture: [
    'Crops',
    'Livestock',
    'Soil',
    'Tools',
    'Diseases',
    'Health',
    'Processing',
    'Economics',
    'Farming',
    'Technology'
  ],
  cre: [
    'Testament',
    'Teachings',
    'Values',
    'Prayer',
    'Characters',
    'Parables',
    'Living',
    'History',
    'Morals',
    'Faith'
  ],
  life: [
    'Development',
    'Health',
    'Safety',
    'Communication',
    'Decisions',
    'Conflict',
    'Leadership',
    'Time',
    'Goals',
    'Emotions'
  ],
  sports: [
    'Athletics',
    'Ball Games',
    'Swimming',
    'Gymnastics',
    'Traditional',
    'Team Sports',
    'Individual',
    'Rules',
    'Fitness',
    'Safety'
  ],
  pretech: [
    'Electronics',
    'Machines',
    'Materials',
    'Design',
    'Tools',
    'Safety',
    'Problems',
    'Innovation',
    'Technology',
    'Digital'
  ]
};

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function Interests() {
  const router = useRouter();
  const { selectedSubjects } = useLocalSearchParams();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (selectedSubjects) {
      try {
        const parsedSubjects = JSON.parse(selectedSubjects as string);
        console.log('Parsed subjects:', parsedSubjects); // Debug log
        setSubjects(parsedSubjects);
      } catch (error) {
        console.error('Error parsing selected subjects:', error);
        router.back();
      }
    } else {
      console.error('No selected subjects found');
      router.back();
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
  const currentTopics = subjectTopics[currentSubject.id as keyof typeof subjectTopics] || [];
  const currentSelectedTopics = selectedTopics[currentSubject.id] || [];

  const handleTopicToggle = (topic: string) => {
    const currentSubjectTopics = selectedTopics[currentSubject.id] || [];
    
    if (currentSubjectTopics.includes(topic)) {
      // Remove topic
      setSelectedTopics(prev => ({
        ...prev,
        [currentSubject.id]: currentSubjectTopics.filter(t => t !== topic)
      }));
    } else if (currentSubjectTopics.length < 3) {
      // Add topic (max 3 per subject)
      setSelectedTopics(prev => ({
        ...prev,
        [currentSubject.id]: [...currentSubjectTopics, topic]
      }));
    }
  };

  const handleNext = () => {
    if (currentSubjectIndex < subjects.length - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
    } else {
      // All subjects completed, go to struggles screen
      router.push({
        pathname: '/onboarding/struggles',
        params: { 
          selectedSubjects: JSON.stringify(subjects),
          selectedTopics: JSON.stringify(selectedTopics)
        }
      });
    }
  };

  const handleBack = () => {
    if (currentSubjectIndex > 0) {
      setCurrentSubjectIndex(currentSubjectIndex - 1);
    } else {
      router.back();
    }
  };

  const canProceed = currentSelectedTopics.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '62.5%' }]} />
          </View>
          <Text style={styles.progressText}>5 of 8</Text>
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
          <Text style={styles.question}>Which {currentSubject.name} topics do you enjoy?</Text>
          <Text style={styles.subtitle}>
            Select up to 3 topics • {currentSelectedTopics.length}/3 selected
          </Text>
        </View>

        {/* Topics grid */}
        <ScrollView style={styles.topicsContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.topicsGrid}>
            {currentTopics.map((topic, index) => {
              const isSelected = currentSelectedTopics.includes(topic);
              const isDisabled = !isSelected && currentSelectedTopics.length >= 3;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.topicTag,
                    { borderColor: currentSubject.color },
                    isSelected && { backgroundColor: currentSubject.color },
                    isDisabled && { opacity: 0.5 }
                  ]}
                  onPress={() => handleTopicToggle(topic)}
                  disabled={isDisabled}
                >
                  <Text style={[
                    styles.topicText,
                    isSelected && { color: '#FFFFFF' }
                  ]}>
                    {topic}
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

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={16} color="#6B7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.nextButton, !canProceed && { opacity: 0.5 }]}
            onPress={handleNext}
            disabled={!canProceed}
          >
            <Text style={styles.nextButtonText}>
              {currentSubjectIndex === subjects.length - 1 ? 'Continue' : 'Next'}
            </Text>
            <ChevronRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
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
  question: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  topicsContainer: {
    flex: 1,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  topicTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    minHeight: 40,
    width: '48%',
  },
  topicText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
    flex: 1,
  },
  checkmark: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Inter-Bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  backButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 4,
  },
});