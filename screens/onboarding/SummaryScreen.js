import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SummaryScreen = ({ profileData, onComplete }) => {
  // Map fitness goal IDs to readable labels
  const fitnessGoalLabels = {
    strength: "Strength",
    muscle_growth: "Muscle Growth",
    weight_loss: "Weight Loss",
    endurance: "Endurance",
    health: "General Health",
    athleticism: "Athleticism",
  }

  // Map gender IDs to readable labels
  const genderLabels = {
    male: "Male",
    female: "Female",
    other: "Other",
    prefer_not_to_say: "Prefer not to say",
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Summary</Text>
        <Text style={styles.subtitle}>Review your information before continuing</Text>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Full Name</Text>
            <Text style={styles.summaryValue}>{profileData.full_name}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Email</Text>
            <Text style={styles.summaryValue}>{profileData.email}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Age</Text>
            <Text style={styles.summaryValue}>{profileData.age} years</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Weight</Text>
            <Text style={styles.summaryValue}>{profileData.weight} lbs</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Height</Text>
            <Text style={styles.summaryValue}>{profileData.height} cm</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Fitness Goal</Text>
            <Text style={styles.summaryValue}>
              {fitnessGoalLabels[profileData.fitness_goal] || profileData.fitness_goal}
            </Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Gender</Text>
            <Text style={styles.summaryValue}>{genderLabels[profileData.gender] || profileData.gender}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>Complete Setup</Text>
          <Ionicons name="checkmark" size={20} color="black" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  backgroundColor: "black",
},
content: {
  flex: 1,
  padding: 2,
},


\
