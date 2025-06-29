import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, BookOpen, Microscope, RefreshCw, Calendar } from 'lucide-react-native';

const recentActivities = [
  {
    id: '1',
    subject: 'Mathematics',
    topic: 'Adding Fractions',
    date: 'Today',
    score: 85,
    icon: Calculator,
    color: '#3B82F6',
  },
  {
    id: '2',
    subject: 'English',
    topic: 'Reading Comprehension',
    date: 'Yesterday',
    score: 92,
    icon: BookOpen,
    color: '#8B5CF6',
  },
  {
    id: '3',
    subject: 'Science',
    topic: 'Plant Life Cycle',
    date: '2 days ago',
    score: 78,
    icon: Microscope,
    color: '#10B981',
  },
  {
    id: '4',
    subject: 'Mathematics',
    topic: 'Decimal Places',
    date: '3 days ago',
    score: 88,
    icon: Calculator,
    color: '#3B82F6',
  },
  {
    id: '5',
    subject: 'English',
    topic: 'Grammar Rules',
    date: '4 days ago',
    score: 76,
    icon: BookOpen,
    color: '#8B5CF6',
  },
];

export default function Review() {
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22C55E';
    if (score >= 80) return '#F59E0B';
    if (score >= 70) return '#EF4444';
    return '#6B7280';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent!';
    if (score >= 80) return 'Good job!';
    if (score >= 70) return 'Keep trying!';
    return 'Needs practice';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recent Activity</Text>
          <Text style={styles.headerSubtitle}>Review your learning progress</Text>
        </View>

        {/* Filter Options */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Math</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>English</Text>
          </TouchableOpacity>
        </View>

        {/* Activity List */}
        <ScrollView style={styles.activityList} showsVerticalScrollIndicator={false}>
          {recentActivities.map((activity) => {
            const IconComponent = activity.icon;
            const scoreColor = getScoreColor(activity.score);
            
            return (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <View style={[styles.subjectIcon, { backgroundColor: activity.color + '20' }]}>
                    <IconComponent size={20} color={activity.color} />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activitySubject}>{activity.subject}</Text>
                    <Text style={styles.activityTopic}>{activity.topic}</Text>
                  </View>
                  <View style={styles.activityMeta}>
                    <View style={styles.dateContainer}>
                      <Calendar size={12} color="#6B7280" />
                      <Text style={styles.activityDate}>{activity.date}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.activityFooter}>
                  <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreText, { color: scoreColor }]}>
                      {activity.score}%
                    </Text>
                    <Text style={[styles.scoreLabel, { color: scoreColor }]}>
                      {getScoreText(activity.score)}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.redoButton}>
                    <RefreshCw size={16} color="#6B7280" />
                    <Text style={styles.redoButtonText}>Redo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilter: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  activityList: {
    flex: 1,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activitySubject: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  activityTopic: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  activityMeta: {
    alignItems: 'flex-end',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'flex-start',
  },
  scoreText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 2,
  },
  scoreLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  redoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    gap: 6,
  },
  redoButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
});