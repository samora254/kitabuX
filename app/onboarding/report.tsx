
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Clock, Target, TrendingUp, User, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Report() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleContinue = () => {
    router.push('/onboarding/name-input');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '87.5%' }]} />
          </View>
          <Text style={styles.progressText}>7 of 9</Text>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Your Learning Report</Text>
          <Text style={styles.subtitle}>
            Based on your preferences, here's what we've prepared for you
          </Text>
        </View>

        {/* Report Cards */}
        <View style={styles.reportSection}>
          <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <BookOpen size={24} color="#3B82F6" />
              </View>
              <Text style={styles.cardTitle}>Your Subjects</Text>
            </View>
            <Text style={styles.cardContent}>
              Mathematics, English, Science - tailored to Grade 6 CBC curriculum
            </Text>
          </View>

          <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Target size={24} color="#EF4444" />
              </View>
              <Text style={styles.cardTitle}>Focus Areas</Text>
            </View>
            <Text style={styles.cardContent}>
              Exam preparation with emphasis on problem-solving skills
            </Text>
          </View>

          <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Clock size={24} color="#F59E0B" />
              </View>
              <Text style={styles.cardTitle}>Study Schedule</Text>
            </View>
            <Text style={styles.cardContent}>
              15-minute focused sessions, 3-4 times per week
            </Text>
          </View>

          <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <TrendingUp size={24} color="#22C55E" />
              </View>
              <Text style={styles.cardTitle}>Learning Path</Text>
            </View>
            <Text style={styles.cardContent}>
              Progressive difficulty with regular assessments and feedback
            </Text>
          </View>
        </View>

        {/* Success Message */}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <User size={32} color="#22C55E" />
          </View>
          <Text style={styles.successTitle}>Ready to Start Learning!</Text>
          <Text style={styles.successMessage}>
            Your personalized study plan is ready. Let's create your account to save your progress.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Create My Account</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
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
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  reportSection: {
    marginBottom: 32,
  },
  reportCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  cardContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  successContainer: {
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  successMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
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
    marginRight: 8,
  },
});
