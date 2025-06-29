import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, Award, Clock, TrendingUp } from 'lucide-react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning! 👋</Text>
          <Text style={styles.name}>Ready to learn today?</Text>
        </View>

        {/* Today's Lesson Card */}
        <View style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <View style={styles.subjectIcon}>
              <Calculator size={24} color="#3B82F6" />
            </View>
            <View style={styles.todayInfo}>
              <Text style={styles.todaySubject}>Mathematics</Text>
              <Text style={styles.todayTopic}>Adding Fractions</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Award size={16} color="#F59E0B" />
              <Text style={styles.pointsText}>+20 Pts</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Clock size={20} color="#22C55E" />
            </View>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>mins today</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>day streak</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Award size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statNumber}>350</Text>
            <Text style={styles.statLabel}>total points</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>

        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Calculator size={20} color="#3B82F6" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Decimal Places</Text>
              <Text style={styles.activitySubtitle}>Mathematics • Yesterday</Text>
            </View>
            <Text style={styles.activityScore}>85%</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.activityEmoji, { color: '#F59E0B' }]}>📚</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Reading Comprehension</Text>
              <Text style={styles.activitySubtitle}>English • 2 days ago</Text>
            </View>
            <Text style={styles.activityScore}>92%</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#D1FAE5' }]}>
              <Text style={[styles.activityEmoji, { color: '#10B981' }]}>🌱</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Plant Life Cycle</Text>
              <Text style={styles.activitySubtitle}>Science • 3 days ago</Text>
            </View>
            <Text style={styles.activityScore}>78%</Text>
          </View>
        </View>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  todayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  todayInfo: {
    flex: 1,
  },
  todaySubject: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  todayTopic: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  pointsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 4,
  },
  continueButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  activityList: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 18,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  activityScore: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#22C55E',
  },
});