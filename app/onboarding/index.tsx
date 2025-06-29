import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
          <Text style={styles.progressText}>Welcome</Text>
        </View>

        {/* Avatar and greeting */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={60} color="#22C55E" />
          </View>
          <Text style={styles.greeting}>
            Hi, I'm <Text style={styles.nameHighlight}>Achieng'</Text>
          </Text>
          <Text style={styles.subGreeting}>Ready to study?</Text>
        </View>

        {/* Action button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/onboarding/grade-selection')}
        >
          <Text style={styles.buttonText}>Let's Begin</Text>
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
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 40,
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
  avatarContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  nameHighlight: {
    color: '#22C55E',
  },
  subGreeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
  button: {
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
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});