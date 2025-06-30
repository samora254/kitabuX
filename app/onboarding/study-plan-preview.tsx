import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, BookOpen, Globe, Microscope, Heart, Users, Sprout, Lightbulb, Zap, Wrench, Target, Clock, TrendingUp, Save, ChevronRight } from 'lucide-react-native';
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

interface StudyPlanData {
  subjects: Subject[];
  priorities: string[];
  timeCommitment: string;
  strugglingTopics: Record<string, string[]>;
  interests: Record<string, string[]>;
}

export default function StudyPlanPreview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [studyPlan, setStudyPlan] = useState<StudyPlanData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Parse all the data from previous screens
    try {
      const subjects = JSON.parse(params.selectedSubjects as string || '[]');
      const priorities = JSON.parse(params.selectedPriorities as string || '[]');
      const strugglingTopics = JSON.parse(params.strugglingTopics as string || '{}');
      const interests = JSON.parse(params.selectedTopics as string || '{}');
      const timeCommitment = params.timeCommitment as string || '15';

      setStudyPlan({
        subjects,
        priorities,
        timeCommitment,
        strugglingTopics,
        interests
      });
    } catch (error) {
      console.error('Error parsing study plan data:', error);
      router.back();
    }
  }, [params]);

  if (!studyPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Generating your study plan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSavePlan = () => {
    setIsSaving(true);
    
    // Simulate saving process
    setTimeout(() => {
      setIsSaving(false);
      router.push('/onboarding/report');
    }, 1500);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'exam': return Target;
      case 'mastery': return TrendingUp;
      case 'assignments': return BookOpen;
      default: return Target;
    }
  };

  const getPriorityTitle = (priority: string) => {
    switch (priority) {
      case 'exam': return 'Prepare for Exam';
      case 'mastery': return 'Master the Topic';
      case 'assignments': return 'Help with Assignments';
      default: return 'Focus Area';
    }
  };

  const getTimeDescription = (time: string) => {
    switch (time) {
      case '5': return 'Quick daily reviews';
      case '15': return 'Short focused sessions';
      case '30': return 'Deep learning sessions';
      case '60': return 'Intensive study periods';
      default: return 'Personalized sessions';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '87.5%' }]} />
          </View>
          <Text style={styles.progressText}>7 of 8</Text>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Your Personalized Study Plan</Text>
          <Text style={styles.subtitle}>Here's what we've created based on your preferences</Text>
        </View>

        {/* Study Plan Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <Clock size={24} color="#22C55E" />
            <Text style={styles.overviewTitle}>Daily Commitment</Text>
          </View>
          <Text style={styles.timeText}>{studyPlan.timeCommitment} minutes per day</Text>
          <Text style={styles.timeDescription}>{getTimeDescription(studyPlan.timeCommitment)}</Text>
        </View>

        {/* Learning Priorities */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Learning Priorities</Text>
          {studyPlan.priorities.map((priority, index) => {
            const IconComponent = getPriorityIcon(priority);
            return (
              <View key={priority} style={styles.priorityItem}>
                <View style={styles.priorityNumber}>
                  <Text style={styles.priorityNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.priorityIcon}>
                  <IconComponent size={20} color="#3B82F6" />
                </View>
                <Text style={styles.priorityText}>{getPriorityTitle(priority)}</Text>
              </View>
            );
          })}
        </View>

        {/* Subjects Tree */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Subject Focus Areas</Text>
          <View style={styles.subjectsTree}>
            {studyPlan.subjects.map((subject, index) => {
              const IconComponent = iconMap[subject.icon as keyof typeof iconMap] || BookOpen;
              const subjectInterests = studyPlan.interests[subject.id] || [];
              const subjectStruggles = studyPlan.strugglingTopics[subject.id] || [];
              
              return (
                <View key={subject.id} style={styles.subjectBranch}>
                  {/* Subject Header */}
                  <View style={styles.subjectHeader}>
                    <View style={[styles.subjectIcon, { backgroundColor: subject.color + '20' }]}>
                      <IconComponent size={20} color={subject.color} />
                    </View>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                  </View>

                  {/* Connection Line */}
                  <View style={styles.connectionLine} />

                  {/* Topics */}
                  <View style={styles.topicsContainer}>
                    {/* Interests */}
                    {subjectInterests.length > 0 && (
                      <View style={styles.topicGroup}>
                        <View style={styles.topicGroupHeader}>
                          <View style={[styles.topicTypeIcon, { backgroundColor: '#DBEAFE' }]}>
                            <Heart size={12} color="#3B82F6" />
                          </View>
                          <Text style={styles.topicGroupTitle}>Interests</Text>
                        </View>
                        {subjectInterests.slice(0, 2).map((topic, topicIndex) => (
                          <View key={topicIndex} style={styles.topicItem}>
                            <View style={styles.topicDot} />
                            <Text style={styles.topicText}>{topic}</Text>
                          </View>
                        ))}
                        {subjectInterests.length > 2 && (
                          <Text style={styles.moreTopics}>+{subjectInterests.length - 2} more</Text>
                        )}
                      </View>
                    )}

                    {/* Struggles */}
                    {subjectStruggles.length > 0 && (
                      <View style={styles.topicGroup}>
                        <View style={styles.topicGroupHeader}>
                          <View style={[styles.topicTypeIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Target size={12} color="#F59E0B" />
                          </View>
                          <Text style={styles.topicGroupTitle}>Focus Areas</Text>
                        </View>
                        {subjectStruggles.slice(0, 2).map((topic, topicIndex) => (
                          <View key={topicIndex} style={styles.topicItem}>
                            <View style={[styles.topicDot, { backgroundColor: '#F59E0B' }]} />
                            <Text style={styles.topicText}>{topic}</Text>
                          </View>
                        ))}
                        {subjectStruggles.length > 2 && (
                          <Text style={styles.moreTopics}>+{subjectStruggles.length - 2} more</Text>
                        )}
                      </View>
                    )}
                  </View>

                  {/* Branch connector to next subject */}
                  {index < studyPlan.subjects.length - 1 && (
                    <View style={styles.branchConnector} />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Study Plan Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Plan Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{studyPlan.subjects.length}</Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Object.values(studyPlan.interests).flat().length}
              </Text>
              <Text style={styles.statLabel}>Interest Topics</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Object.values(studyPlan.strugglingTopics).flat().length}
              </Text>
              <Text style={styles.statLabel}>Focus Areas</Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, isSaving && { opacity: 0.7 }]}
          onPress={handleSavePlan}
          disabled={isSaving}
        >
          {isSaving ? (
            <Text style={styles.saveButtonText}>Saving Plan...</Text>
          ) : (
            <>
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save My Study Plan</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    marginBottom: 32,
  },
  progressBar: {
    width: width * 0.6,
    height: 4,
    backgroundColor: '#E5E7EB',
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  timeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#22C55E',
    marginBottom: 4,
  },
  timeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  priorityNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  priorityNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  priorityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  priorityText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  subjectsTree: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  subjectBranch: {
    marginBottom: 20,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subjectName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
  },
  connectionLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 15,
    marginBottom: 8,
  },
  topicsContainer: {
    marginLeft: 32,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#F3F4F6',
  },
  topicGroup: {
    marginBottom: 16,
  },
  topicGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicTypeIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  topicGroupTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  topicDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginRight: 8,
  },
  topicText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
  },
  moreTopics: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginLeft: 14,
  },
  branchConnector: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 15,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#22C55E',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    gap: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});