import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ExerciseGifView from "../components/ExerciseGifView"
import GlassmorphicCard from "../components/GlassmorphicCard"

const { width, height } = Dimensions.get("window")

const ExerciseDetailScreen = ({ route, navigation }) => {
  const { exercise } = route.params

  const muscleGroups = {
    "Bench Press": ["Chest", "Shoulders", "Triceps"],
    "Incline Dumbbell Press": ["Upper Chest", "Shoulders", "Triceps"],
    Squats: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    "Barbell Squat": ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    "Dumbbell Bench Press": ["Chest", "Shoulders", "Triceps"],
    "Bent-Over Barbell Row": ["Back", "Biceps", "Forearms"],
  }

  const tips = {
    "Bench Press": [
      "Keep your feet flat on the ground",
      "Maintain a slight arch in your lower back",
      "Lower the bar to your mid-chest",
      "Keep your elbows at about a 45-degree angle from your body",
    ],
    "Incline Dumbbell Press": [
      "Set the bench at a 30-45 degree angle",
      "Keep your back pressed against the bench",
      "Lower the dumbbells to chest level",
      "Don't lock out your elbows at the top",
    ],
    Squats: [
      "Keep your chest up and back straight",
      "Push your knees out in the direction of your toes",
      "Go as low as your mobility allows",
      "Drive through your heels on the way up",
    ],
    "Barbell Squat": [
      "Keep your chest up and back straight",
      "Push your knees out in the direction of your toes",
      "Go as low as your mobility allows",
      "Drive through your heels on the way up",
    ],
    "Dumbbell Bench Press": [
      "Keep your feet flat on the ground",
      "Maintain a slight arch in your lower back",
      "Lower the dumbbells to your mid-chest",
      "Keep your elbows at about a 45-degree angle from your body",
    ],
    "Bent-Over Barbell Row": [
      "Hinge at the hips with a flat back",
      "Keep your core engaged throughout the movement",
      "Pull the bar to your lower chest/upper abdomen",
      "Squeeze your shoulder blades together at the top",
    ],
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ExerciseGifView exercise={exercise} />

        <GlassmorphicCard style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Muscle Groups</Text>
          <View style={styles.muscleGroupsContainer}>
            {(muscleGroups[exercise.name] || ["Primary Muscle"]).map((muscle, index) => (
              <View key={index} style={styles.muscleTag}>
                <Text style={styles.muscleTagText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </GlassmorphicCard>

        <GlassmorphicCard style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Tips</Text>
          {(tips[exercise.name] || ["Focus on proper form"]).map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="cyan" style={styles.tipIcon} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </GlassmorphicCard>

        <GlassmorphicCard style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Training Parameters</Text>
          <View style={styles.paramsContainer}>
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Sets</Text>
              <Text style={styles.paramValue}>{exercise.sets}</Text>
            </View>
            <View style={styles.paramDivider} />
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Reps</Text>
              <Text style={styles.paramValue}>{exercise.reps}</Text>
            </View>
            <View style={styles.paramDivider} />
            <View style={styles.paramItem}>
              <Text style={styles.paramLabel}>Rest</Text>
              <Text style={styles.paramValue}>{exercise.rest || "60-90 sec"}</Text>
            </View>
          </View>
        </GlassmorphicCard>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  infoCard: {
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  muscleGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  muscleTag: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
  },
  muscleTagText: {
    color: "white",
    fontSize: 14,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    color: "white",
    fontSize: 14,
    flex: 1,
  },
  paramsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 15,
  },
  paramItem: {
    alignItems: "center",
  },
  paramLabel: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 5,
  },
  paramValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  paramDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})

export default ExerciseDetailScreen
