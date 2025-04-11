import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import GlassmorphicCard from "../components/GlassmorphicCard"
import { trainingStyles } from "../data/trainingStylesData"

const TrainingPlansScreen = ({ navigation }) => {
  const workoutPlans = trainingStyles.filter((style) => ["ppl", "5daybodypart", "upperlower"].includes(style.id))

  const renderWorkoutPlan = ({ item }) => {
    return (
      <GlassmorphicCard style={styles.planCard}>
        <Text style={styles.planTitle}>{item.title}</Text>
        <Text style={styles.planDescription}>{item.description}</Text>
        <FlatList
          data={item.exercises}
          keyExtractor={(exercise, index) => index.toString()}
          renderItem={({ item: workout, index }) => (
            <TouchableOpacity
              style={styles.workoutItem}
              onPress={() => navigation.navigate("ActiveWorkout", { workout: workout, trainingStyle: item })}
            >
              <Text style={styles.workoutTitle}>{workout.name}</Text>
              <Ionicons name="arrow-forward" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
        />
      </GlassmorphicCard>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Training Plans</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={workoutPlans}
        renderItem={renderWorkoutPlan}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.plansList}
      />
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
    fontSize: 28,
    fontWeight: "bold",
  },
  plansList: {
    padding: 20,
  },
  planCard: {
    marginBottom: 20,
    padding: 20,
  },
  planTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  planDescription: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
  },
  workoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  workoutTitle: {
    color: "white",
    fontSize: 16,
  },
})

export default TrainingPlansScreen
