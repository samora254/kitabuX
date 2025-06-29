import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap, Target, FileText } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const focusAreas = [
  { 
    id: 'exam', 
    title: 'Prepare for Exam', 
    subtitle: 'Get ready for upcoming tests',
    icon: GraduationCap, 
    color: '#EF4444',
    bgColor: '#FEF2F2'
  },
  { 
    id: 'mastery', 
    title: 'Master the Topic', 
    subtitle: 'Deep understanding of concepts',
    icon: Target, 
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  { 
    id: 'assignments', 
    title: 'Help with Assignments', 
    subtitle: 'Complete homework and projects',
    icon: FileText, 
    color: '#F59E0B',
    bgColor: '#FFFBEB'
  },
];

const SPRING_CONFIG = { damping: 20, stiffness: 300 };

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function FocusArea() {
  const router = useRouter();
  const { selectedSubjects, subjectGrades } = useLocalSearchParams();
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [isAutoSelecting, setIsAutoSelecting] = useState(false);

  // Animation values for each card
  const cardAnimations = focusAreas.reduce((acc, area) => {
    acc[area.id] = {
      scale: useSharedValue(1),
      backgroundColor: useSharedValue(0), // 0 = white, 1 = colored
    };
    return acc;
  }, {} as Record<string, { scale: any; backgroundColor: any }>);

  // Auto-select the third card when two are manually selected
  useEffect(() => {
    if (selectedPriorities.length === 2 && !isAutoSelecting) {
      setIsAutoSelecting(true);
      
      // Find the unselected card
      const unselectedCard = focusAreas.find(area => !selectedPriorities.includes(area.id));
      if (unselectedCard) {
        // Auto-select after a brief delay
        setTimeout(() => {
          handleAreaSelect(unselectedCard.id, true);
        }, 300);
      }
    }
  }, [selectedPriorities.length, isAutoSelecting]);

  // Get the display order of cards (selected first, then unselected)
  const getDisplayOrder = () => {
    const selected = selectedPriorities.map(id => focusAreas.find(area => area.id === id)!);
    const unselected = focusAreas.filter(area => !selectedPriorities.includes(area.id));
    return [...selected, ...unselected];
  };

  const handleAreaSelect = (areaId: string, isAutoSelection = false) => {
    if (selectedPriorities.includes(areaId)) return;

    const newPriorities = [...selectedPriorities, areaId];
    setSelectedPriorities(newPriorities);

    // Animate selection state
    cardAnimations[areaId].scale.value = withSpring(1.02, SPRING_CONFIG);
    cardAnimations[areaId].backgroundColor.value = withTiming(1, { duration: 300 });
    
    // Return to normal scale after a brief moment
    setTimeout(() => {
      cardAnimations[areaId].scale.value = withSpring(1, SPRING_CONFIG);
    }, 200);

    // If all 3 are selected, reset auto-selecting flag
    if (newPriorities.length === 3) {
      setTimeout(() => {
        runOnJS(setIsAutoSelecting)(false);
      }, isAutoSelection ? 400 : 600);
    }
  };

  const handleContinue = () => {
    // Pass all necessary data to the next screen
    const params = new URLSearchParams({
      selectedSubjects: selectedSubjects as string,
      subjectGrades: subjectGrades as string,
      selectedPriorities: JSON.stringify(selectedPriorities)
    });
    router.push(`/onboarding/interests?${params.toString()}`);
  };

  const getPriorityNumber = (areaId: string) => {
    const index = selectedPriorities.indexOf(areaId);
    return index >= 0 ? index + 1 : null;
  };

  const getCardStyle = (areaId: string) => {
    const animations = cardAnimations[areaId];
    const area = focusAreas.find(a => a.id === areaId);
    
    return useAnimatedStyle(() => {
      const isSelected = animations.backgroundColor.value > 0.5;
      
      return {
        transform: [{ scale: animations.scale.value }],
        backgroundColor: isSelected ? area?.color : '#FFFFFF',
        borderColor: isSelected ? area?.color : '#F3F4F6',
        borderWidth: isSelected ? 3 : 2,
      };
    });
  };

  const getTextStyle = (areaId: string, isTitle: boolean = true) => {
    const animations = cardAnimations[areaId];
    
    return useAnimatedStyle(() => {
      const isSelected = animations.backgroundColor.value > 0.5;
      
      return {
        color: isSelected ? '#FFFFFF' : (isTitle ? '#111827' : '#6B7280'),
      };
    });
  };

  const getIconContainerStyle = (areaId: string) => {
    const animations = cardAnimations[areaId];
    const area = focusAreas.find(a => a.id === areaId);
    
    return useAnimatedStyle(() => {
      const isSelected = animations.backgroundColor.value > 0.5;
      
      return {
        backgroundColor: isSelected 
          ? 'rgba(255, 255, 255, 0.2)' 
          : area?.bgColor || '#F3F4F6',
      };
    });
  };

  const displayOrder = getDisplayOrder();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressText}>4 of 8</Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {selectedPriorities.length === 0 
              ? "What's your top priority?"
              : selectedPriorities.length === 1
              ? "What's priority 2?"
              : selectedPriorities.length === 2 && !isAutoSelecting
              ? "What's priority 3?"
              : selectedPriorities.length === 3
              ? "Perfect! Here's your learning plan"
              : "Completing your priorities..."
            }
          </Text>
          <Text style={styles.subtitle}>
            {selectedPriorities.length < 2
              ? `Select your ${selectedPriorities.length === 0 ? 'most important' : 'next'} focus area`
              : selectedPriorities.length === 2 && isAutoSelecting
              ? "Auto-selecting your final priority..."
              : selectedPriorities.length === 3
              ? "We'll help you achieve all three goals"
              : "One more to go..."
            }
          </Text>
        </View>

        {/* Focus area options */}
        <View style={styles.optionsContainer}>
          {displayOrder.map((area, index) => {
            const IconComponent = area.icon;
            const priorityNumber = getPriorityNumber(area.id);
            const isSelected = priorityNumber !== null;
            const isDisabled = (selectedPriorities.length === 2 && !isAutoSelecting && !isSelected) || 
                             (selectedPriorities.length === 3 && !isSelected);
            
            return (
              <AnimatedTouchableOpacity
                key={area.id}
                style={[
                  styles.areaButton,
                  getCardStyle(area.id),
                  isDisabled && styles.disabledCard
                ]}
                onPress={() => handleAreaSelect(area.id)}
                disabled={isDisabled || isSelected}
              >
                <View style={styles.cardContent}>
                  <View style={styles.leftContent}>
                    <Animated.View style={[styles.iconContainer, getIconContainerStyle(area.id)]}>
                      <IconComponent size={24} color={isSelected ? '#FFFFFF' : area.color} />
                    </Animated.View>
                    <View style={styles.textContainer}>
                      <Animated.Text style={[styles.areaTitle, getTextStyle(area.id, true)]}>
                        {area.title}
                      </Animated.Text>
                      <Animated.Text style={[styles.areaSubtitle, getTextStyle(area.id, false)]}>
                        {area.subtitle}
                      </Animated.Text>
                    </View>
                  </View>
                  
                  {isSelected && (
                    <View style={styles.priorityBadge}>
                      <Text style={styles.priorityText}>#{priorityNumber}</Text>
                    </View>
                  )}
                </View>
              </AnimatedTouchableOpacity>
            );
          })}
        </View>

        {/* Progress indicator for selection */}
        {selectedPriorities.length > 0 && selectedPriorities.length < 3 && (
          <View style={styles.selectionProgress}>
            <View style={styles.progressDots}>
              {[1, 2, 3].map((num) => (
                <View 
                  key={num}
                  style={[
                    styles.progressDot,
                    num <= selectedPriorities.length && styles.progressDotActive,
                    num === 3 && selectedPriorities.length === 2 && isAutoSelecting && styles.progressDotPending
                  ]} 
                />
              ))}
            </View>
            <Text style={styles.progressLabel}>
              {selectedPriorities.length} of 3 priorities selected
            </Text>
          </View>
        )}

        {/* Continue button */}
        <TouchableOpacity 
          style={[styles.continueButton, selectedPriorities.length !== 3 && { opacity: 0.5 }]}
          onPress={handleContinue}
          disabled={selectedPriorities.length !== 3}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    minHeight: 70,
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
    minHeight: 20,
  },
  optionsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  areaButton: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  disabledCard: {
    opacity: 0.5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  areaTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  areaSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  priorityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectionProgress: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  progressDots: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#22C55E',
  },
  progressDotPending: {
    backgroundColor: '#F59E0B',
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
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
    marginTop: 16,
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});