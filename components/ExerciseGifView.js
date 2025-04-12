import { View, Image, StyleSheet, Dimensions, Text } from "react-native"
import GlassmorphicCard from "./GlassmorphicCard"

const { width } = Dimensions.get("window")

const ExerciseGifView = ({ exercise }) => {
  if (!exercise || !exercise.gifUrl) {
    return null
  }

  return (
    <GlassmorphicCard style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <View style={styles.gifContainer}>
        <Image source={exercise.gifUrl} style={styles.gif} resizeMode="contain" />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Sets:</Text>
          <Text style={styles.detailValue}>{exercise.sets}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Reps:</Text>
          <Text style={styles.detailValue}>{exercise.reps}</Text>
        </View>
        {exercise.rest && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rest:</Text>
            <Text style={styles.detailValue}>{exercise.rest}</Text>
          </View>
        )}
      </View>
    </GlassmorphicCard>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 15,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  gifContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  gif: {
    width: width - 80,
    height: width - 80,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    padding: 10,
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 3,
  },
  detailValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default ExerciseGifView
